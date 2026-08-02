#!/usr/bin/env node
/**
 * Consumer smoke test — "can someone actually install and import this?"
 *
 * `npm pack`s the library exactly as npm would publish it, installs the tarball
 * into a throwaway project OUTSIDE this repo, and consumes it the way a real
 * consumer would: ESM imports of every entry point, an SSR render, a typecheck
 * under both module-resolution modes, and a Tailwind build against the shipped
 * CSS.
 *
 * Outside the repo is the whole point. A fixture inside the working tree lets
 * Node walk up to the repo's own node_modules, where every dependency — declared
 * or not — resolves, so the test passes for a package that is broken on npm.
 *
 * Usage:  node scripts/consumer-smoke.mjs [--keep]
 *   --keep  leave the temp consumer project on disk and print its path
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(path.join(repo, 'package.json'), 'utf8'))
const keep = process.argv.includes('--keep')

const results = []
const record = (name, ok, detail) => {
  results.push({ name, ok, detail })
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${name}${detail ? `\n        ${detail.replace(/\n/g, '\n        ')}` : ''}`)
}

/** Run a command, capturing both streams; never throws. */
function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts })
  return { code: r.status ?? 1, out: `${r.stdout ?? ''}${r.stderr ?? ''}`.trim() }
}

/** Last ~15 lines — enough to see the real error without burying the report. */
const tail = (s, n = 15) => s.split('\n').slice(-n).join('\n')

const work = mkdtempSync(path.join(tmpdir(), 'conjure-consumer-'))
const consumer = path.join(work, 'app')
mkdirSync(consumer)

try {
  // ── Pack ──────────────────────────────────────────────────────────────────
  // `npm pack` runs `prepare`, so this builds dist from scratch. What lands in
  // the tarball is exactly what `npm publish` would upload.
  console.log('\nPacking library…')
  const packed = execFileSync('npm', ['pack', '--pack-destination', work, '--silent'], {
    cwd: repo,
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .pop()
  const tarball = path.join(work, path.basename(packed))
  console.log(`  ${path.basename(tarball)}\n`)

  // ── Scaffold the consumer ─────────────────────────────────────────────────
  writeFileSync(
    path.join(consumer, 'package.json'),
    JSON.stringify(
      {
        name: 'conjure-consumer-smoke',
        private: true,
        version: '0.0.0',
        type: 'module',
        dependencies: {
          [pkg.name]: `file:${tarball}`,
          react: '^19',
          'react-dom': '^19',
          '@types/react': '^19',
          '@types/react-dom': '^19',
          typescript: '^5',
          tailwindcss: '^4',
          '@tailwindcss/cli': '^4',
        },
      },
      null,
      2,
    ),
  )

  console.log('Installing tarball into a clean project…')
  const install = run('npm', ['install', '--no-audit', '--no-fund', '--loglevel=error'], { cwd: consumer })
  if (install.code !== 0) {
    record('install', false, tail(install.out))
    throw new Error('install failed — nothing else can run')
  }
  record('install', true, `${pkg.name} + react 19 + tailwind 4`)

  // ── 1. ESM import + SSR render ────────────────────────────────────────────
  // Catches unresolvable exports paths, undeclared dependencies, and anything
  // that throws at module scope.
  writeFileSync(
    path.join(consumer, 'import-check.mjs'),
    `import { createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import * as root from '${pkg.name}'
import * as primitives from '${pkg.name}/primitives'
import * as core from '${pkg.name}/core'
import * as layouts from '${pkg.name}/layouts'

const expect = (mod, name, key) => {
  if (!(key in mod)) throw new Error(\`\${name} is missing export "\${key}"\`)
}
expect(root, '.', 'ThemeProvider')
expect(root, '.', 'StatusBadge')
expect(primitives, './primitives', 'StatusBadge')
expect(core, './core', 'MessageBubble')
expect(layouts, './layouts', 'ChatWidget')

const html = renderToString(h(primitives.StatusBadge, { label: 'In stock', variant: 'success' }))
if (!html.includes('In stock')) throw new Error('StatusBadge rendered nothing useful: ' + html)

const bubble = renderToString(h(core.MessageBubble, { role: 'user' }, 'hello'))
if (!bubble.includes('hello')) throw new Error('MessageBubble rendered nothing useful: ' + bubble)

console.log([
  \`.=\${Object.keys(root).length}\`,
  \`primitives=\${Object.keys(primitives).length}\`,
  \`core=\${Object.keys(core).length}\`,
  \`layouts=\${Object.keys(layouts).length}\`,
].join(' '))
`,
  )
  const esm = run('node', ['import-check.mjs'], { cwd: consumer })
  record('esm import + SSR render', esm.code === 0, esm.code === 0 ? `exports ${esm.out}` : tail(esm.out))

  // ── 2. CommonJS ───────────────────────────────────────────────────────────
  // The package is ESM-only by design (no "require" condition). This asserts the
  // failure is the clean, documented one rather than a confusing resolver error.
  const cjs = run('node', ['-e', `require('${pkg.name}')`], { cwd: consumer })
  const cleanEsmError = /ERR_REQUIRE_ESM|ERR_PACKAGE_PATH_NOT_EXPORTED|Cannot find module/.test(cjs.out)
  record(
    'commonjs require fails cleanly (ESM-only by design)',
    cjs.code !== 0 && cleanEsmError,
    cjs.code === 0 ? 'require() unexpectedly succeeded' : tail(cjs.out, 3),
  )

  // ── 3. Types ──────────────────────────────────────────────────────────────
  // Consumers land on one of two resolution modes. `bundler` is what Vite/Next
  // apps use; `nodenext` is what a plain Node/TS app or a stricter setup uses.
  // A .d.ts written for one does not automatically work under the other.
  writeFileSync(
    path.join(consumer, 'consumer.tsx'),
    `import { ThemeProvider, StatusBadge } from '${pkg.name}'
import { PriceDisplay } from '${pkg.name}/primitives'
import { MessageBubble, type MessageBubbleProps } from '${pkg.name}/core'
import { ChatWidget } from '${pkg.name}/layouts'

const role: MessageBubbleProps['role'] = 'user'

export function App() {
  return (
    <ThemeProvider tokens={{}}>
      <StatusBadge label="In stock" variant="success" />
      <PriceDisplay amount={12.99} currency="GBP" />
      <MessageBubble role={role}>hello</MessageBubble>
      <ChatWidget />
    </ThemeProvider>
  )
}
`,
  )
  for (const mode of ['bundler', 'nodenext']) {
    const file = path.join(consumer, `tsconfig.${mode}.json`)
    writeFileSync(
      file,
      JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            lib: ['dom', 'esnext'],
            jsx: 'react-jsx',
            strict: true,
            noEmit: true,
            // skipLibCheck stays off: the point is to typecheck what we shipped.
            skipLibCheck: false,
            module: mode === 'nodenext' ? 'nodenext' : 'esnext',
            moduleResolution: mode,
          },
          files: ['consumer.tsx'],
        },
        null,
        2,
      ),
    )
    const tsc = run(path.join(consumer, 'node_modules', '.bin', 'tsc'), ['-p', file], { cwd: consumer })
    record(`types resolve under moduleResolution: ${mode}`, tsc.code === 0, tsc.code === 0 ? '' : tail(tsc.out, 12))
  }

  // ── 4. Shipped CSS ────────────────────────────────────────────────────────
  // Both CSS entry points must resolve, and globals.css must find theme.css
  // beside it inside node_modules.
  const styles = path.join(consumer, 'node_modules', pkg.name, 'app', 'globals.css')
  const theme = path.join(consumer, 'node_modules', pkg.name, 'app', 'theme.css')
  record(
    'css entry points present in the tarball',
    existsSync(styles) && existsSync(theme),
    `${existsSync(styles) ? '' : 'missing app/globals.css '}${existsSync(theme) ? '' : 'missing app/theme.css'}`.trim(),
  )

  // A consumer's real stylesheet: import the library's CSS, write one component
  // usage of their own, and build. Two things must come out the far side — the
  // design tokens, and the utility classes the library's own markup depends on.
  writeFileSync(path.join(consumer, 'app.css'), `@import "${pkg.name}/styles";\n`)
  writeFileSync(path.join(consumer, 'index.html'), `<div class="bg-background text-foreground"></div>\n`)
  const tw = run(path.join(consumer, 'node_modules', '.bin', 'tailwindcss'), ['-i', 'app.css', '-o', 'out.css'], {
    cwd: consumer,
  })
  const css = tw.code === 0 ? readFileSync(path.join(consumer, 'out.css'), 'utf8') : ''
  record('tailwind builds against the shipped stylesheet', tw.code === 0, tw.code === 0 ? '' : tail(tw.out, 10))
  record(
    'design tokens reach the consumer build',
    css.includes('--background') && css.includes('--radius'),
    css ? '' : 'no CSS produced',
  )
  // StatusBadge renders class="bg-success/10 …". If Tailwind never scanned the
  // library's dist, that utility is absent and every component ships unstyled.
  record(
    'library utility classes are generated (Tailwind scans dist)',
    css.includes('bg-success'),
    css.includes('bg-success')
      ? ''
      : 'Utilities used inside the library are missing from the built CSS — components render unstyled\n' +
          `unless the consumer adds:  @source "../node_modules/${pkg.name}/dist";`,
  )

  // ── 5. Packaging linters ──────────────────────────────────────────────────
  // Pinned devDependencies rather than `npx …@latest`: a gate has to give the
  // same answer in six months, and a new release of either tool should not be
  // able to turn CI red on a day nothing changed.
  const bin = (name) => path.join(repo, 'node_modules', '.bin', name)
  for (const [name, cmd, args] of [
    ['publint', bin('publint'), ['run', tarball]],
    [
      'are-the-types-wrong',
      bin('attw'),
      // Two deliberate narrowings. The CSS entry points are excluded because attw
      // resolves JS and type declarations, so "./styles" and "./theme" always read
      // as resolution failures — their presence is asserted directly above. And
      // `--profile esm-only` matches what this package actually claims to be: no
      // `require` condition, React 19, Tailwind 4. Legacy TS `node10` resolution
      // and CJS consumers are out of scope, not accidents.
      // prettier-ignore
      [tarball, '--format', 'table-flipped',
       '--profile', 'esm-only', '--exclude-entrypoints', 'styles', 'theme'],
    ],
  ]) {
    if (!existsSync(cmd)) {
      record(name, false, `${path.relative(repo, cmd)} not found — run npm install`)
      continue
    }
    const r = run(cmd, args, { cwd: work, timeout: 180_000 })
    record(name, r.code === 0, tail(r.out, 20))
  }
} finally {
  if (keep) console.log(`\nConsumer project kept at ${consumer}`)
  else rmSync(work, { recursive: true, force: true })
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) {
  console.log(`Failing: ${failed.map((f) => f.name).join(', ')}`)
  process.exit(1)
}
