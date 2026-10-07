#!/usr/bin/env node
/**
 * Touch-target audit.
 *
 * Scans every shipped component for interactive controls that fall below the
 * minimum hit area on either pointer type. See `.docs/guidelines/ui-guidelines`
 * → "Two axes, not one: viewport vs. input device".
 *
 *   COARSE (finger)  44px  — Apple HIG · WCAG 2.5.5 AAA
 *   FINE   (cursor)  24px  — WCAG 2.2 SC 2.5.8 AA
 *
 * A control passes if it is big enough on its own, OR carries `tap-target`
 * (pseudo-element hit area), OR raises itself with a `pointer-coarse:` variant.
 *
 * Uses the TypeScript parser rather than regex — JSX attributes routinely
 * contain `>` inside inline arrow handlers, which no regex survives.
 *
 * Usage:  node scripts/tap-audit.js
 * Exits 1 when anything fails, so it can gate a commit.
 */

const { readFileSync } = require('node:fs')
const { execSync } = require('node:child_process')
const ts = require('typescript')

const COARSE_MIN = 44
const FINE_MIN = 24

/**
 * shadcn Button CVA sizes, mirrored from components/ui/button.tsx.
 * NOTE: every one of these is under 44px — `size` alone is never sufficient
 * for touch. A call site must always state its own hit area.
 */
const CVA_SIZE = {
  default: 'h-8',
  xs: 'h-6',
  sm: 'h-7',
  lg: 'h-9',
  icon: 'size-8',
  'icon-xs': 'size-6',
  'icon-sm': 'size-7',
  'icon-lg': 'size-9',
}

const files = execSync('find components -name "*.tsx" ! -name "*.stories.tsx"', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean)
  // The Button definition itself is not a call site — its CVA is the source
  // the table above mirrors.
  .filter(f => !f.endsWith('components/ui/button.tsx'))

const toPx = n => {
  const f = parseFloat(n)
  return Number.isNaN(f) ? null : f * 4
}

/** Largest size-like value in a class list, or null when none is expressed. */
function sizeOf(classes) {
  let best = null
  for (const c of classes) {
    const m = c.match(/^(?:size|h|min-h)-([\d.]+)$/)
    if (!m) continue
    const px = toPx(m[1])
    if (px !== null && (best === null || px > best.value)) best = { value: px, cls: c }
  }
  return best
}

const split = s => s.split(/\s+/).filter(Boolean)
const scope = (cs, p) => cs.filter(c => c.startsWith(p)).map(c => c.slice(p.length))
const bare = cs => cs.filter(c => !/^@?[\w-]+:/.test(c))

/** Every string literal anywhere inside a node — covers cn(), ternaries, &&. */
function stringsIn(node) {
  const out = []
  const walk = n => {
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) out.push(n.text)
    else if (ts.isTemplateExpression(n)) {
      out.push(n.head.text)
      n.templateSpans.forEach(s => out.push(s.literal.text))
    }
    ts.forEachChild(n, walk)
  }
  walk(node)
  return out
}

function attrOf(element, name) {
  const attr = element.attributes.properties.find(
    p => ts.isJsxAttribute(p) && p.name.getText() === name
  )
  if (!attr || !attr.initializer) return null
  return ts.isJsxExpression(attr.initializer) ? attr.initializer.expression : attr.initializer
}

const findings = []

for (const file of files) {
  const src = readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX)

  const visit = node => {
    const el = ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node) ? node : null
    if (el) {
      const tag = el.tagName.getText()
      if (tag === 'Button' || tag === 'button') {
        const line = sf.getLineAndCharacterOfPosition(el.getStart()).line + 1

        const cnNode = attrOf(el, 'className')
        const classes = cnNode ? split(stringsIn(cnNode).join(' ')) : []

        // Decorative chrome rendered as a button: removed from the a11y tree
        // and unfocusable, so it is not a target. (It is arguably a `Button`
        // that should not be one — a separate concern from hit area.)
        const names = el.attributes.properties
          .filter(ts.isJsxAttribute)
          .map(p => p.name.getText())
        const decorative = names.includes('aria-hidden') && names.includes('tabIndex')

        if (!decorative && !classes.includes('tap-target')) {
          const sizeNode = attrOf(el, 'size')
          const sizeProp = sizeNode ? stringsIn(sizeNode)[0] : tag === 'Button' ? 'default' : null

          let base = sizeOf(bare(classes))
          // `@md:` is the container breakpoint components scale on; `md:` survives
          // only on viewport-anchored frames. A finger can drive either width.
          const mdScope = scope(classes, '@md:').length ? '@md:' : 'md:'
          const md = sizeOf(scope(classes, mdScope))
          const coarse = sizeOf(scope(classes, 'pointer-coarse:'))

          // `p-0` is not padding — it is the absence of it.
          const hasPadding = classes.some(c => /^(p|py|px|p[tblr])-(?!0$)[\d.]/.test(c))
          // `h-auto` is an explicit opt-in to content sizing — it overrides the
          // CVA height, so the padding is the author's stated intent.
          const contentSized = classes.includes('h-auto') && hasPadding

          // Fall back to the CVA size only when the call site expressed none.
          let fromCva = false
          if (!base && !md && !contentSized && sizeProp && CVA_SIZE[sizeProp]) {
            base = sizeOf([CVA_SIZE[sizeProp]])
            fromCva = true
          }
          if (contentSized) { ts.forEachChild(node, visit); return }
          const coarseOk = coarse && coarse.value >= COARSE_MIN
          const mobile = base?.value ?? null
          const tablet = md?.value ?? mobile

          if (!coarseOk && mobile !== null && mobile < COARSE_MIN) {
            findings.push({
              file,
              line,
              issue: fromCva
                ? `size="${sizeProp}" → ${base.cls} = ${mobile}px, no explicit hit area (min ${COARSE_MIN})`
                : `${base.cls} = ${mobile}px on a finger (min ${COARSE_MIN})`,
            })
          } else if (!coarseOk && tablet !== null && tablet < COARSE_MIN) {
            findings.push({
              file,
              line,
              issue: `${mdScope}${md.cls} = ${tablet}px — a touch tablet is ${mdScope}-wide (min ${COARSE_MIN})`,
            })
          } else if (tablet !== null && tablet < FINE_MIN) {
            findings.push({ file, line, issue: `${tablet}px is under the cursor minimum (${FINE_MIN})` })
          } else if (mobile === null && !hasPadding) {
            findings.push({ file, line, issue: 'no size and no padding — hit area unknowable' })
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
}

const byFile = findings.reduce((acc, f) => ((acc[f.file] ??= []).push(f), acc), {})

for (const [file, list] of Object.entries(byFile)) {
  console.log(`\n  ${file}`)
  for (const f of list) console.log(`    :${f.line}  ${f.issue}`)
}

const total = findings.length
console.log(
  total === 0
    ? `\n  ✓ tap targets clean — ${files.length} components, coarse ≥${COARSE_MIN}px, fine ≥${FINE_MIN}px\n`
    : `\n  ✗ ${total} control${total === 1 ? '' : 's'} below the minimum in ${Object.keys(byFile).length} file(s)\n`
)

process.exit(total === 0 ? 0 : 1)
