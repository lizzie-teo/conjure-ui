@AGENTS.md

# conjure-ui

White-label AI chat component library (`@lizzie-teo/conjure-ui`) published to npm. Consumers install
this package and apply their brand by overriding CSS custom properties — via a `.theme-{client}`
class or `ThemeProvider`. **This is a library, not a standalone app.**

## Dev environment

```bash
npm run storybook    # ← primary dev environment (port 6006)
npm run dev          # Vite demo harness (demo/) — fast component preview
npm run next         # Next.js marketing/docs site (app/) — rarely needed
npm test             # renders every story + runs interaction tests (~10s)
npm run typecheck
npm run lint         # --max-warnings 0: warnings fail
npm run build        # library build → dist/
```

Always develop and test components in Storybook. `npm run dev` is Vite, **not** Next — the Next
app is a separate harness under `app/` and is not part of the published package.

## Project structure

```
components/
  primitives/         # Tier 1 — zero-dep, token-styled atoms (StatusBadge, PriceDisplay, etc.)
  core/               # Tier 2 — compound components, documented as "Components" (MediaCard, DetailList, etc.)
  layouts/            # Tier 3 — structural skeletons with named slots (ChatWidget, ModalSheet, etc.)
  ui/                 # Button only — do not add to this folder (plain React button, no external deps)
  ThemeProvider.tsx   # Runtime CSS variable injection
demo/                 # Vite harness — `npm run dev` entry point
app/                  # Next.js site (marketing + docs). Not published.
  theme.css           # Design tokens — the 3 tiers. No client themes live here.
  globals.css         # Tailwind plumbing — imports theme.css, @theme inline mappings, @layer base
lib/
  tokens.css          # Token reference docs (comments only — consumers read this)
  theme-config.ts     # Design constants (ICON_STROKE_WIDTH)
  prop-types.ts       # MotionElementProps — HTML props safe to spread onto motion.* roots
  merge-refs.ts       # Combine an internal ref with a consumer's forwarded ref
  utils.ts            # cn()
.storybook/
  preview.tsx         # Light/Dark switcher via withThemeByClassName
  themes.css          # Demo-only .theme-{client} examples — NOT shipped to consumers
.docs/
  plans/              # Architecture decision docs
  for-designers/      # Designer-facing handoff (Figma Make white-label setup)
  guidelines/
    ui-guidelines             # CSS architecture, responsive, a11y, component rules
    style-guidelines.md       # Clean look design language — colors, radius, shadows, typography
    motion-guidelines         # Animation system, framer-motion patterns
    chat-animation-guidelines.md
    figma-guidelines.md       # Figma kit — tier map, CSS→token mapping, shared atom rule, variant naming
    figma-sync-workflow.md    # How repo ↔ Figma sync works: catalog, drift check, #figbuild
  figma-catalog.json      # Source of truth: every component's sync status + Figma node ID
scripts/
  figma-drift.js          # CLI drift report: compares repo folders vs catalog
```

Note the inconsistent extensions in `.docs/guidelines/` — `ui-guidelines` and `motion-guidelines`
have no extension, `style-guidelines.md` does. Use the exact names above.

**Dependency direction:** primitives ← core ← layouts. Never sideways, never upward. A primitive
must not import from core or layouts. A core component must not import from layouts.

**Import style:** shipped component source uses **relative** imports (`../../ui/button`). The `@/`
alias is configured in `tsconfig.json`, but it is only safe in `.stories.tsx`, which is not
published — a `@/` import in shipped source would not resolve for consumers. All 21 current `@/`
imports are in stories; keep it that way.

**Animation:** the `motion` package v12, imported as `motion/react` — never `framer-motion`.
`useReducedMotion()` returns `boolean | null`, so coerce with `?? false` when passing to a
`boolean` prop.

## Theming

Tokens live in `app/theme.css` in three tiers:

| Tier | What | Override? |
|------|------|-----------|
| 1. Brand | Typeface, primary pair, background tint, radius, ring (~6 tokens) | Yes — this is what rebrands the library |
| 2. Semantic | Surfaces derived from the brand palette | Only when the brand demands it |
| 3. System | Shadows, Apple Pay, charts, layout internals | No |

Consumers apply a brand three ways: a `.theme-{client}` class of their own, a `<ThemeProvider
tokens={…}>` for runtime overrides, or (the Figma Make path) by pasting their generated `:root`
and `.dark` blocks straight into `theme.css`.

**`app/theme.css` ships no `.theme-{client}` classes.** The example client themes (`theme-travel`,
`theme-retail`, …) live in `.storybook/themes.css`, are loaded only by Storybook, and are
explicitly not part of the package. To add a demo theme, edit `.storybook/themes.css` — nothing
else needs to change, since `preview.tsx` only toggles Light/Dark.

Token names follow the shadcn/ui convention so they line up with Figma Make's generated
`globals.css`. Leave `app/globals.css` alone — it is shared infrastructure.

## Build & publish

`npm run build` = Vite library build (`vite.lib.config.ts`) → `dist/`, then `tsc -p
tsconfig.build.json` for declarations. `prepublishOnly` runs it before publish. `package.json`
`files` is `["dist", "app/globals.css", "app/theme.css"]`.

Two build-config choices exist for non-obvious reasons — do not "clean them up":

- `tsconfig.build.json` must include `svg.d.ts`, or ~60 asset imports fail to typecheck and no
  declarations emit at all.
- `incremental: false` is deliberate. Vite's `emptyOutDir` wipes `dist`, then an incremental `tsc`
  consults its buildinfo, sees no changes and emits nothing — shipping a types-free package.

## Testing

`npm test` runs every story through a real Chromium (Vitest browser mode + Playwright). Most are
smoke tests — the story renders, nothing throws. 12 of them are interaction tests written with
`play()`, covering the behaviour worth pinning: stepper bounds, radio/checkbox `aria-checked`,
collapsible `aria-expanded`, Enter vs Shift+Enter in the composer, and the modal's focus trap.

Prefer asserting through **roles and ARIA state** rather than class names — that is what the
component actually promises consumers.

**Two gotchas:**

- Storybook's CSF parser treats *every* named export in a `.stories.tsx` as a story. Helper
  functions and fixtures must go in `excludeStories` or be module-local, or they render as
  broken stories.
- Anything animating out via `AnimatePresence` stays mounted for the length of its exit
  animation. Assertions that something disappeared must be wrapped in `waitFor`.

CI (`.github/workflows/ci.yml`) runs typecheck → lint → tests → clean rebuild → a check that every
published entry point and `.d.ts` exists, on every push and PR. The separate Chromatic workflow
handles visual regressions.

## Third-party assets

Payment logos are **not bundled**. Consumers source official brand assets from each network's
brand portal and place them in `public/payment-logos/`. See
`components/primitives/payment-logos/README.md` for required file paths and download links.

## Non-negotiable rules

1. **No hardcoded styles** — no `#hex`, `rgb()`, `bg-blue-500`, or literal spacing values. Every
   design value goes through a CSS custom property.
   *Sole exception:* third-party brand marks, where the literal colour **is** the specification
   and tokenising it would misrepresent the brand — Google's `#4285F4`, the Apple card gradients,
   Apple Pay greys. Confined to SVG fills in `Apple-objects/` and `PaymentMethodTile`. Never
   extend this to layout, spacing, or your own palette.
2. **shadcn `Button` for anything button-like** — never raw `<button className="…">`. Import from
   `@/components/ui/button`.
   *Sole exception:* `role="switch"` toggles. A switch is not a button — it needs a track/thumb
   and `aria-checked`, which `Button`'s variants fight. Two exist (`RewardsStep`,
   `BranchSelectStep`) and they are near-identical; if a third appears, extract a `Switch`
   primitive rather than widening this exception.
3. **Responsive at every breakpoint** — `md:` variants are mandatory on all sizes and spacing.
   `h-12 md:h-10` on every interactive element. `p-4 md:p-6 lg:p-8` on every container.
4. **No new dependencies without asking** — published library; every added dep becomes a
   consumer's dep too. Runtime deps are currently just `class-variance-authority`, `clsx`,
   `lucide-react`, `motion`, `tailwind-merge`. React is a peer dependency.
5. **New components follow atomic tiers** — Primitives in `components/primitives/`, Components in
   `components/core/`, Layouts in `components/layouts/`. Each gets its own subfolder with
   `ComponentName.tsx` + `ComponentName.stories.tsx`.
6. **Compound component API** — Components and Layouts expose sub-components as static properties
   (`MediaCard.Title`, `RecipeCard.Header`, etc.). Sub-components live in the same file as the parent.
7. **Every component needs a `.stories.tsx`** — Storybook is the contract for consumers.
   *Exception:* `primitives/Apple-objects/` and the logo/asset folders, which are platform assets
   rather than styled components (the figma-drift script classifies them the same way).
8. **Public components take a `ref` and forward rest props** — every exported component and every
   compound sub-component spreads unrecognised props onto its root, so consumers can pass `id`,
   `data-*`, `aria-*` and measure/focus the node. Use `lib/prop-types.ts` for `motion.*` roots and
   `lib/merge-refs.ts` when the component holds its own root ref. React 19: `ref` is a plain prop,
   never `forwardRef`. Spread **last** normally; spread **first** when the root owns an a11y or
   controlled-state contract a consumer prop must not silently break.

## #ui

When `#ui` appears in a prompt, read `.docs/guidelines/ui-guidelines` AND
`.docs/guidelines/style-guidelines.md` in full and apply every rule from both before writing any code.

## #motion

When `#motion` appears in a prompt, read `.docs/guidelines/motion-guidelines` in full and apply
every rule from it before writing any animation or transition code.

Use `#ui #motion` together when building or updating any component that animates.

### #fig
When I type `#fig`, use Figma MCP commands in this order:
- **Get variables (ALWAYS REQUIRED - must be done FIRST)**
- Get code
- Get image

## #figkit

When `#figkit` appears in a prompt, read `.docs/guidelines/figma-guidelines.md` in full and apply
every rule from it before writing any `use_figma` code. This covers: component tier map,
CSS→Figma variable mapping, shared atom rule (reuse existing instances, never recreate), component
property conventions, variant axis naming, and page/grid layout standards.

## #figbuild

When `#figbuild` appears in a prompt:
1. Read `.docs/figma-catalog.json` — identify all entries with `"status": "pending"`
2. Read `.docs/guidelines/figma-guidelines.md` in full (same as `#figkit`)
3. If a specific component name is given (e.g. `#figbuild MessageBubble`), build only that one. If
   `--all` is given or no name specified, present the full pending list and confirm which to build.
4. Build each component in Figma following all `#figkit` rules: token bindings, shared atom
   instances, component properties, variant naming, one page per core component.
5. After each successful build, update `.docs/figma-catalog.json`: set `status → "synced"`, add
   `figmaNodeId`, `variants`, and `props`.

## #figcheck

When `#figcheck` appears in a prompt, run `node scripts/figma-drift.js` and report the output.
Summarise what is pending, what is unlisted (in repo but not in catalog), and what is synced. If
anything is pending, suggest running `#figbuild`.

## Known gaps

- **Interaction coverage is deliberately partial** — 12 `play()` tests across 7 files, aimed at the
  components with real behaviour. The rest are smoke tests. Add a `play()` when you add behaviour,
  not for static presentation.
- **`argTypes` are inferred, not declared.** Storybook's react-docgen reads the TypeScript props,
  so Controls work without hand-written `argTypes`. `preview.tsx` filters out the inherited DOM
  attributes; if a genuinely useful prop goes missing from Controls, check that exclude regex
  before adding `argTypes` by hand.
- **`dist/` is no longer committed.** `prepare` builds it on install, including for
  `npm install github:lizzie-teo/conjure-ui`. Do not re-add it to git — when it was tracked, the
  committed output had silently fallen 78 files behind a real build.
