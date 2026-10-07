#!/usr/bin/env node
/**
 * Rewrites relative import specifiers in the emitted `dist/**\/*.d.ts` to carry
 * explicit `.js` extensions.
 *
 * The source is written for `moduleResolution: "bundler"`, so it imports
 * `'../../ui/button'` with no extension and tsc emits that verbatim. Once
 * dist is ESM (see write-dist-package-type.mjs), a consumer on
 * `moduleResolution: "node16" | "nodenext"` gets TS2834/TS2835 on every one of
 * them and none of the types resolve. tsc cannot add the extensions itself —
 * it only preserves what the source wrote — so they are added here.
 *
 * Directory specifiers ('./CollectionCard') become './CollectionCard/index.js', which is
 * why each one is resolved against disk rather than blindly suffixed.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')

function* declarations(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* declarations(full)
    else if (entry.name.endsWith('.d.ts')) yield full
  }
}

// `from '…'`, `import('…')` and bare `import '…'`, relative specifiers only.
const SPECIFIER = /((?:\bfrom\s*|\bimport\s*\(?\s*|\bimport\s+)['"])(\.[^'"]*)(['"])/g

let rewritten = 0
const unresolved = []

for (const file of declarations(dist)) {
  const dir = path.dirname(file)
  const before = readFileSync(file, 'utf8')

  const after = before.replace(SPECIFIER, (match, open, spec, close) => {
    if (path.extname(spec)) return match // already .js/.json/.css — leave it
    if (existsSync(path.join(dir, `${spec}.d.ts`))) {
      rewritten++
      return `${open}${spec}.js${close}`
    }
    if (existsSync(path.join(dir, spec, 'index.d.ts'))) {
      rewritten++
      return `${open}${spec}/index.js${close}`
    }
    unresolved.push(`${path.relative(dist, file)} → ${spec}`)
    return match
  })

  if (after !== before) writeFileSync(file, after)
}

console.log(`rewrote ${rewritten} relative import specifiers in dist/**/*.d.ts`)
if (unresolved.length) {
  console.error(`could not resolve ${unresolved.length} specifier(s):`)
  for (const u of unresolved) console.error(`  ${u}`)
  process.exit(1)
}
