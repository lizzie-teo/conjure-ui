@AGENTS.md

# conjure-ui

White-label AI chat component library (`@lizzie-teo/conjure-ui`) published to npm. Consumers install
this package and apply their brand by overriding CSS custom properties — via a `.theme-{client}`
class or `ThemeProvider`. **This is a library, not a standalone app.**

## Dev environment

```bash
npm run storybook    # ← primary dev environment (port 6006)
npm run dev          # Vite demo harness (demo/) — fast component preview
npm test             # renders every story + runs interaction tests (~10s)
npm run test:consumer # packs and installs the package elsewhere, imports it (~90s)
npm run typecheck
npm run lint         # --max-warnings 0: warnings fail
npm run build        # library build → dist/
```

Always develop and test components in Storybook. `npm run dev` is Vite, **not** Next.

`app/` no longer holds a site. The Next marketing pages were retired in favour of the case study at
`lizzieteo.com/work/conjure-ui`, which links to the published Storybook. What remains under `app/`
is the two CSS files that ship in the package, plus `api/chat/route.ts` — an Anthropic-backed chat
endpoint kept for local experimentation and the only reason `npm run next` / `build:next` still
exist. Nothing in `demo/` or Storybook calls it.

## Project structure

```
components/
  primitives/         # Tier 1 — zero-dep, token-styled atoms (StatusBadge, PriceDisplay, etc.)
  core/               # Tier 2 — compound components, documented as "Components" (MediaCard, DetailList, etc.)
  layouts/            # Tier 3 — structural skeletons with named slots (ChatWidget, ModalSheet, etc.)
  ui/                 # Button only — do not add to this folder (plain React button, no external deps)
  ThemeProvider.tsx   # Runtime CSS variable injection
demo/                 # Vite harness — `npm run dev` entry point
app/                  # Only the shipped CSS + a local-only API route. No site.
  theme.css           # Design tokens — the 3 tiers. No client themes live here.
  globals.css         # Tailwind plumbing — imports theme.css, @theme inline mappings, @layer base
  api/chat/route.ts   # Anthropic chat endpoint — local experimentation only, not published
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
  for-designers/      # Designer-facing handoff
    ai-builder-white-label-setup.md   # Branding a client via Claude Code / Codex / Replit / Lovable
    figma-sync-prompts.md             # #figcheck / #figbuild shortcuts
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
tokens={…}>` for runtime overrides, or by editing the `:root` and `.dark` values in `theme.css`
directly.

That third way is **fork-only**. `theme.css` ships inside the package, so for anyone who installed
from npm it lives in `node_modules` and every upgrade overwrites it. Docs must never tell an
installing consumer to edit it — the guidance is a theme class in their own stylesheet, or
`ThemeProvider`. `.docs/for-designers/ai-builder-white-label-setup.md` is the guide that says so.

**`app/theme.css` ships no `.theme-{client}` classes.** The example client themes (`theme-travel`,
`theme-retail`, …) live in `.storybook/themes.css`, are loaded only by Storybook, and are
explicitly not part of the package. To add a demo theme, edit `.storybook/themes.css` — nothing
else needs to change, since `preview.tsx` only toggles Light/Dark.

**The library loads no webfont.** `--font-sans` defaults to the system stack, and consumers load
their brand face and override that one token — Inter is what the docs recommend they start from.
Never add a font `@import` to `app/globals.css` or `app/theme.css`: both ship in the package, so an
import there forces a third-party request (and a GDPR problem) on every consumer. Dev surfaces load
Inter themselves — `.storybook/preview-head.html`, `demo/index.html` — neither of which is
published.

**`app/globals.css` carries a load-bearing `@source "../dist/**/*.js"`.** Tailwind never scans
`node_modules` on its own, so without it a consumer who imports `@lizzie-teo/conjure-ui/styles`
gets the tokens and none of the utilities — every component renders unstyled. It is a glob rather
than a bare `../dist` so a missing dist during local dev is a no-op instead of a build error.
`npm run test:consumer` fails if it ever goes missing.

Token names follow the shadcn/ui convention, so a theme authored against that vocabulary drops in
without renaming. Otherwise leave `app/globals.css` alone — it is shared infrastructure.

## Build & publish

`npm run build` = Vite library build (`vite.lib.config.ts`) → `dist/`, then `tsc -p
tsconfig.build.json` for declarations, then two post-processing steps that make the output
consumable off npm — both verified by `npm run test:consumer`:

- `scripts/fix-dts-extensions.mjs` appends `.js` to every relative specifier in the emitted
  `.d.ts` (directory specifiers become `/index.js`). The source is written for
  `moduleResolution: "bundler"`, tsc emits those extensionless paths verbatim, and a consumer on
  `node16`/`nodenext` then gets TS2834/TS2835 on all of them.
- `scripts/write-dist-package-type.mjs` writes `dist/package.json` = `{"type":"module"}`. The root
  package.json cannot carry `"type": "module"` — Vite loads `vite.lib.config.ts` as CJS and that
  config uses `__dirname` — so without the nested file Node reads the ESM output as CommonJS and
  only Node 22's syntax detection saves the import.

`prepublishOnly` runs the whole chain before publish. `package.json`
`files` is `["dist", "app/globals.css", "app/theme.css", "CHANGELOG.md"]` — the changelog ships so a
consumer's agent can read what changed straight from `node_modules`.

Two build-config choices exist for non-obvious reasons — do not "clean them up":

- `tsconfig.build.json` must include `svg.d.ts`, or ~60 asset imports fail to typecheck and no
  declarations emit at all.
- `incremental: false` is deliberate. Vite's `emptyOutDir` wipes `dist`, then an incremental `tsc`
  consults its buildinfo, sees no changes and emits nothing — shipping a types-free package.

## Releasing

**Tags publish; branches do not.** `.github/workflows/release.yml` fires on `v*` tags only, so a
merge to `main` can never ship a version by accident.

```bash
# 1. write the release notes first — the workflow reads them back out
#    edit CHANGELOG.md: move [Unreleased] items under a new ## [X.Y.Z] heading
# 2. bump + tag in one step (npm writes package.json and creates the tag)
npm version minor -m "Release v%s"
git push --follow-tags
```

The workflow re-runs typecheck → lint → tests → clean build → entry-point check before publishing,
refuses to run if the tag disagrees with `package.json`, publishes with npm provenance, then opens a
GitHub Release whose body is the matching `CHANGELOG.md` section. That release is what notifies
consumers who watch the repo; Dependabot picks up the npm version separately.

Two consequences worth knowing:

- **Provenance means publishing must go through the workflow.** `publishConfig.provenance` is `true`,
  which needs the `id-token: write` that only CI has. A local `npm publish` will fail — that is the
  intent, not a bug. `NPM_TOKEN` must exist as a repository secret.
- **Pre-1.0, breaking changes go in the minor.** `0.2.x` → `0.3.0`. The breaking surface here is
  wider than the exported functions: a renamed Tier 1 or Tier 2 token is breaking even though
  nothing throws, because the consumer's brand silently falls back instead of erroring. Alias a
  renamed token for at least one minor. `CHANGELOG.md` opens with the full definition.

## Published Storybook

Storybook is the public face of the library, deployed to **GitHub Pages at
[lizzie-teo.github.io/conjure-ui](https://lizzie-teo.github.io/conjure-ui/)** by
`.github/workflows/pages.yml` on every push to `main`. That is the URL to link — not a Chromatic
build URL, which is a CI artifact.

**The custom domain is deferred, not abandoned.** `ui.lizzieteo.com` needs a DNS record at a
registrar the domain is being moved off, so there is currently no `public/` folder and no CNAME in
the published output. Publishing a CNAME *before* its DNS record exists is the failure case: Pages
would claim the domain and 301 the working `github.io` URL to one that does not resolve, taking the
site down rather than moving it.

Restoring it is one file — `public/CNAME` containing the domain, nothing else. **Vite's default
`publicDir` copies `public/` on its own**, so no `staticDirs` entry is needed; the one that used to
sit there was redundant, which is why removing it did not stop the file shipping.

Link the `github.io` URL freely in the meantime — GitHub 301s it to the custom domain once one is
set, so nothing written now goes stale. That matters most for `README.md`, which is also the npm
landing page and is frozen at publish time for every released version.

Storybook needs no base-path config because `build-storybook` emits relative asset paths
(`./assets/…`), so the output works at a domain root and at a project subpath alike. Do not add a
`base` in `viteFinal` on the assumption that a subpath needs one.

## Testing

`npm test` runs every story through a real Chromium (Vitest browser mode + Playwright). Most are
smoke tests — the story renders, nothing throws. 19 of them are interaction tests written with
`play()`, covering the behaviour worth pinning: stepper bounds, radio/checkbox `aria-checked`,
collapsible `aria-expanded` (by mouse *and* keyboard), Enter vs Shift+Enter in the composer, the
modal's focus trap, `BundleCard`'s swap-and-select, and `SlotPicker` clearing the slot when the
date changes.

Prefer asserting through **roles and ARIA state** rather than class names — that is what the
component actually promises consumers.

**Two gotchas:**

- Storybook's CSF parser treats *every* named export in a `.stories.tsx` as a story. Helper
  functions and fixtures must go in `excludeStories` or be module-local, or they render as
  broken stories.
- Anything animating out via `AnimatePresence` stays mounted for the length of its exit
  animation. Assertions that something disappeared must be wrapped in `waitFor`.

### The consumer smoke test

`npm run test:consumer` (`scripts/consumer-smoke.mjs`) answers a question the story suite cannot:
*can a stranger install this and import it?* It `npm pack`s the library, installs the tarball into
a temp project **outside this repo**, and consumes it — ESM imports of all four entry points, an
SSR render, `tsc` under both `bundler` and `nodenext`, a real Tailwind v4 build against the shipped
CSS, plus `publint` and `are-the-types-wrong` — pinned devDependencies, not `npx …@latest`, so a
release of either tool cannot turn CI red on a day nothing changed.

Outside the repo is the entire point. A fixture inside the working tree resolves against this
repo's own `node_modules`, so it passes for a package that is broken on npm.

Two narrowings in the `attw` invocation are deliberate: the `styles`/`theme` CSS entry points are
excluded (attw resolves JS and types, so CSS always reads as a resolution failure — the script
asserts their presence directly), and `--profile esm-only` scopes it to what the package claims to
be. Legacy TS `node10` resolution and CJS `require` are unsupported by design, not by accident.

CI (`.github/workflows/ci.yml`) runs typecheck → lint → tests → clean rebuild → a check that every
published entry point and `.d.ts` exists → the consumer smoke test, on every push and PR. Two
workflows run alongside it:
Chromatic for visual regressions, and `pages.yml` to publish Storybook (see above). Neither gates
the other — a Chromatic diff does not block the deploy.

**Chromatic is the only thing here that can see a visual regression.** `npm test` proves every story
renders without throwing; it cannot see that a renamed token restyled all 47 components. That is the
breaking change this library is most exposed to (see *Releasing*), and a green story suite says
nothing about it. Chromatic screenshots all 287 stories per build and diffs them against the last
approved baseline — baseline set 2 Aug 2026, build 1.

`onlyChanged: true` (TurboSnap) is set to keep that off the free snapshot allowance, but **Chromatic
withholds TurboSnap until an account has 10 CI builds**, so early builds cost the full 287 regardless
and the warning in the log is a gate, not a fault. Shared config — `theme.css`, `globals.css`,
`.storybook/*` — forces a full run even after it unlocks, which is correct: that is exactly the edit
that changes everything at once.

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
   *Narrow exception:* `role="switch"` toggles. A switch is not a button — it needs a track/thumb
   and `aria-checked`, which `Button`'s variants fight. None currently exist (the two that did
   went with the delivery flow); the first one needed should be extracted as a `Switch`
   primitive rather than hand-rolled again.
   A control is also never nested inside another control — no `Button` inside a `role="button"`
   root. Where a card doubles as one control (`CardStack`, `SummaryPanel.Header`), the root drops
   its button role once expanded, or the inner affordance is a plain `aria-hidden` marker.
3. **Responsive at every breakpoint** — `md:` variants are mandatory on all sizes and spacing.
   `p-4 md:p-6 lg:p-8` on every container. **Hit area is a separate axis** — size it
   with `pointer-coarse:`, never `md:`; the canonical CTA is
   `h-12 md:h-10 pointer-coarse:min-h-11`. Verify with `node scripts/tap-audit.js`.
4. **No new dependencies without asking** — published library; every added dep becomes a
   consumer's dep too. Runtime deps are currently just `class-variance-authority`, `clsx`,
   `lucide-react`, `motion`, `tailwind-merge`. React is a peer dependency.
5. **New components follow atomic tiers** — Primitives in `components/primitives/`, Components in
   `components/core/`, Layouts in `components/layouts/`. Each gets its own subfolder with
   `ComponentName.tsx` + `ComponentName.stories.tsx`.
6. **Compound component API** — Components and Layouts expose sub-components as static properties
   (`MediaCard.Title`, `BundleCard.ItemList`, etc.). Sub-components live in the same file as the parent.
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

- **Interaction coverage is deliberately partial** — 19 `play()` tests across 9 files, aimed at the
  components with real behaviour. The rest are smoke tests. Add a `play()` when you add behaviour,
  not for static presentation.
- **`argTypes` are inferred, not declared.** Storybook's react-docgen reads the TypeScript props,
  so Controls work without hand-written `argTypes`. `preview.tsx` filters out the inherited DOM
  attributes; if a genuinely useful prop goes missing from Controls, check that exclude regex
  before adding `argTypes` by hand.
- **`dist/` is no longer committed.** `prepare` builds it on install, including for
  `npm install github:lizzie-teo/conjure-ui`. Do not re-add it to git — when it was tracked, the
  committed output had silently fallen 78 files behind a real build.
