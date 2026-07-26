@AGENTS.md

# conjure-ui

White-label AI chat component library (`@lizzie-teo/conjure-ui`) published to npm. Consumers install this package and apply their brand via `ThemeProvider` or a `.theme-{client}` CSS class. **This is a library, not a standalone app.**

## Dev environment

```bash
npm run storybook    # ← primary dev environment (port 6006)
npm run dev          # Next.js preview harness only
```

Always develop and test components in Storybook, not the Next.js app.

## Project structure

```
components/
  primitives/         # Tier 1 — zero-dep, token-styled atoms (StatusBadge, PriceDisplay, etc.)
  core/               # Tier 2 — compound components, documented as "Components" (MediaCard, DetailList, etc.)
  layouts/            # Tier 3 — structural skeletons with named slots (ListingLayout, ChatWindow, etc.)
  ui/                 # Button only — do not add to this folder (plain React button, no external deps)
  ThemeProvider.tsx   # Runtime CSS variable injection
playbook/             # Docs only — maps layouts to industry scenarios (no code)
lib/
  tokens.css          # Token reference docs (comments only — consumers read this)
  theme-config.ts     # Design constants (ICON_STROKE_WIDTH)
app/
  theme.css           # Design tokens only — :root, .dark, .theme-{client} overrides
  globals.css         # Tailwind plumbing — imports theme.css, @theme inline mappings, @layer base
.storybook/
  preview.tsx         # Storybook themes list — keep in sync with globals.css
.docs/
  plans/              # Architecture decision docs
  guidelines/
    ui-guidelines           # CSS architecture, responsive, a11y, component rules
    style-guidelines        # Clean look design language — colors, radius, shadows, typography
    motion-guidelines       # Animation system, framer-motion patterns
    figma-guidelines.md     # Figma kit — tier map, CSS→token mapping, shared atom rule, variant naming
    figma-sync-workflow.md  # How repo ↔ Figma sync works: catalog, drift check, #figbuild
  figma-catalog.json      # Source of truth: every component's sync status + Figma node ID
scripts/
  figma-drift.js          # CLI drift report: compares repo folders vs catalog
```

**Dependency direction:** primitives ← core ← layouts. Never sideways, never upward. A primitive must not import from core or layouts. A core component must not import from layouts.

## CSS: 3-layer cascade

| Layer | Location | Use for |
|-------|----------|---------|
| 1. Base | `theme.css :root` | Clean look defaults (cool off-white, 12px radius, soft shadows) — do not edit for client work |
| 2. Theme class | `theme.css .theme-{client}` | Static brand overrides (primary, radius, etc.) |
| 3. Runtime | `<ThemeProvider tokens={…}>` | Dynamic JS-driven overrides |

**Adding a new client theme**: edit `theme.css` (add `.theme-x`) AND `.storybook/preview.tsx` (add to themes object). Both must stay in sync.

## Third-party assets

Payment logos are **not bundled**. Consumers source official brand assets from each network's
brand portal and place them in `public/payment-logos/`. See `components/primitives/payment-logos/README.md`
for required file paths and download links.

## Non-negotiable rules

1. **No hardcoded styles** — no `#hex`, `rgb()`, `bg-blue-500`, or literal spacing values. Every value goes through a CSS custom property.
2. **shadcn `Button` only** — never raw `<button className="…">`. Import from `@/components/ui/button`.
3. **Responsive at every breakpoint** — `md:` variants are mandatory on all sizes and spacing. `h-12 md:h-10` on every interactive element. `p-4 md:p-6 lg:p-8` on every container.
4. **No new dependencies without asking** — published library; every added dep becomes a consumer's dep too.
5. **New components follow atomic tiers** — Primitives in `components/primitives/`, Components in `components/core/`, Layouts in `components/layouts/`. Each gets its own subfolder with `ComponentName.tsx` + `ComponentName.stories.tsx`.
6. **Compound component API** — Components and Layouts expose sub-components as static properties (`MediaCard.Title`, `ListingLayout.Header`, etc.). Sub-components live in the same file as the parent.
7. **Every component needs a `.stories.tsx`** — Storybook is the contract for consumers.

## #ui

When `#ui` appears in a prompt, read `.docs/guidelines/ui-guidelines` AND `.docs/guidelines/style-guidelines` in full and apply every rule from both before writing any code.

## #motion

When `#motion` appears in a prompt, read `.docs/guidelines/motion-guidelines` in full and apply every rule from it before writing any animation or transition code.

Use `#ui #motion` together when building or updating any component that animates.

### #fig
When I type `#fig`, use Figma MCP commands in this order:
- **Get variables (ALWAYS REQUIRED - must be done FIRST)**
- Get code
- Get image

## #figkit

When `#figkit` appears in a prompt, read `.docs/guidelines/figma-guidelines.md` in full and apply every rule from it before writing any `use_figma` code. This covers: component tier map, CSS→Figma variable mapping, shared atom rule (reuse existing instances, never recreate), component property conventions, variant axis naming, and page/grid layout standards.

## #figbuild

When `#figbuild` appears in a prompt:
1. Read `.docs/figma-catalog.json` — identify all entries with `"status": "pending"`
2. Read `.docs/guidelines/figma-guidelines.md` in full (same as `#figkit`)
3. If a specific component name is given (e.g. `#figbuild MessageBubble`), build only that one. If `--all` is given or no name specified, present the full pending list and confirm which to build.
4. Build each component in Figma following all `#figkit` rules: token bindings, shared atom instances, component properties, variant naming, one page per core component.
5. After each successful build, update `.docs/figma-catalog.json`: set `status → "synced"`, add `figmaNodeId`, `variants`, and `props`.

## #figcheck

When `#figcheck` appears in a prompt, run `node scripts/figma-drift.js` and report the output. Summarise what is pending, what is unlisted (in repo but not in catalog), and what is synced. If anything is pending, suggest running `#figbuild`.
