# Component hardening — handoff

Status as of 2026-08-02. Base commit `a1f0983`; the work is now committed on `main`.

---

## Where we are

A four-part effort. **All four parts are done and verified.**

| Part | Scope | Status |
|------|-------|--------|
| 1. Packaging | npm package correctness | ✅ Done |
| 2. Correctness bugs | React Compiler violations | ✅ Done |
| 3. Story failures | Phantom CSF exports | ✅ Done |
| 4. Component API sweep | `ref` + rest-props on every component | ✅ Done — 22/24 primitives, 36/36 core, 4/4 layouts, plus every public sub-component |

### Verification baseline — all green right now

```bash
npm run typecheck   # 0 source errors (1 stale .next/ artifact, ignorable)
npm test            # 362 passed / 362
npm run lint        # 0 errors, 0 warnings (--max-warnings 0)
npm run build       # OK
```

CI runs exactly this sequence on every push and PR, so the baseline is now enforced rather than
remembered. The 79 pre-existing lint errors described further down have all been cleared.

---

## Part 4: the sweep (complete)

**Goal:** every public component accepts a `ref` and forwards unrecognised props to its root
element, so consumers can focus/measure/scroll-to it and pass `id`, `data-*`, `aria-*`, `title`.

Before: 1/66 components took a `ref`, 3/66 spread rest props. Now every exported component and
every compound sub-component (`Component.SubComponent`) does.

### The pattern

Two variants depending on whether the root element is a plain DOM node or a `motion.*` node.

**Plain DOM root:**

```tsx
import type { ComponentPropsWithRef } from 'react'

export interface StatusBadgeProps
  extends Omit<ComponentPropsWithRef<'span'>, 'children'>,
    VariantProps<typeof statusBadgeVariants> {
  label: string
}

export function StatusBadge({ label, variant, className, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {label}
    </span>
  )
}
```

**`motion.*` root — use `lib/prop-types.ts`:**

```tsx
import type { MotionDivProps } from '../../../lib/prop-types'

export interface AuthStatusProps extends Omit<MotionDivProps, 'children'> {
  state: 'success' | 'error'
}
```

`lib/prop-types.ts` (new file, created for this work) exports `MotionElementProps<T>` plus
`MotionSpanProps` / `MotionDivProps` / `MotionButtonProps` / `MotionLiProps` / `MotionUlProps`.
It strips **only** the handlers whose signatures motion redefines
(`onDrag*`, `onAnimationStart/End/Iteration`). Everything else — `style`, `id`, `data-*`,
`aria-*`, `ref` — still passes through. Spreading raw `ComponentPropsWithRef` onto a motion
element **will not typecheck**; this type is why.

### Rules learned the hard way

1. **Drop `className?: string` and `children?: React.ReactNode`** from the interface — both come
   from `ComponentPropsWithRef`. Keep `Omit<…, 'children'>` when the component builds its own
   children from props.
2. **Spread last** (`className={cn(…)} {...props}`), matching `components/ui/button.tsx`.
   `className` is destructured out, so `cn()` still merges correctly.
   **Exception:** if the component owns an a11y contract on the root (`role`, `tabIndex`,
   keyboard handlers), spread **first** so a consumer prop can't silently break it — see
   `PaymentMethodTile` for the worked example and its comment.
3. **Custom `onChange`/`onSelect` collide with DOM handlers.** `Omit` the DOM one and add a doc
   comment noting the override. Done in `QuantityStepper`, `SelectionGroup`, `QuickReplies`.
4. **Merge `style` rather than clobber** when the component sets its own — see `SkeletonBlock`
   (`style={{ ...shimmerStyle, ...style }}`) and `ApplePayButton`.
5. **Multiple return branches need the spread on every root** — `SkeletonBlock` has four.
6. **`size` collides on `<img>`-rooted components** → `Omit<…, 'size'>` (`BankLogo`, `PaymentLogo`).
7. **Lucide-icon roots** use `Omit<LucideProps, 'size'>`, not `ComponentPropsWithRef<'svg'>`
   (`DeliveryMethodIcon`).
8. **React 19: no `forwardRef`.** `ref` is a plain prop. `Tag` was the one component still using
   `forwardRef` and has been converted.
9. **Internal root ref → `mergeRefs`.** `lib/merge-refs.ts` (new) combines a component's own ref
   with a consumer's into one callback ref, with React 19 cleanup semantics. Needed by
   `ChatInput.Field` (autosize), `ApplePaySheet` and `ModalSheet` (focus traps).
10. **Roots that swap element type across branches.** `DoubleClickToPay` renders a `<button>`
    while idle and a `<div>` while scanning. Props are declared against the `<div>`, `ref` is
    typed as the common `HTMLElement`, and each branch spreads through one documented cast.
    A single `Ref<A | B>` will not typecheck against either branch's ref slot.
11. **More DOM collisions found in this pass**, all `Omit`-ed with a doc comment on the
    replacement: `onSelect` (`CompareTable`, `DateSelectStep.Cell`, `TimeSlotStep.Chip`),
    `onChange` (`RewardsStep.SubstitutionSelector`, `BranchSelectStep.CarBootForm`),
    `defaultValue` (`DeliveryMethodStep`), `title` (`ComparisonCard`, `RecipeCard`,
    `RecipeCard.Header`, `ModalSheet`), `value` (`SelectionGroup.Option`),
    and **`slot`** (`TimeSlotStep.Chip`) — `slot` is a global HTML attribute and is easy to miss.
12. **Component-typed roots take `ComponentProps<typeof X>`, not intrinsic props.** Where a
    sub-component's root is another library component rather than a DOM node
    (`ActionStrip.Primary/.Secondary` → `Button`, `OrderReview.Totals` → `DetailList`,
    `DeliveryTracker.Steps` → `OrderStatusCard`, `BranchSelectStep.BranchList` →
    `SelectionGroup`), forward to that component's own props. `ActionStrip.Primary/.Secondary`
    consequently widen `onClick` from `() => void` to a full `MouseEventHandler` — a superset,
    so existing call sites are unaffected.
13. **Defaulted a11y attributes stay overridable.** Where a root sets an `aria-label` that a
    consumer might reasonably want to change, destructure it with a default
    (`'aria-label': ariaLabel = '…'`) rather than hard-coding it after the spread — see
    `ChatInput.Field/.Send`, `MessageBubble.FeedbackRow`, `DeliveryFlow.StepRail`.

### Verify after each batch

```bash
npm run typecheck
```

Run `npm test` at the end of a batch — it renders all stories in a real browser and is the
real regression net.

### Sub-components caught in a second pass

The first 11 core components were swept before the rule "sub-components are public API too" was
settled, so their `Component.SubComponent` props were left untouched. They have since been done:
`ActionStrip.Primary/.Secondary`, `CardStrip.Item`, `DetailList.Row`,
`MediaCard.Media/.Body/.Title/.Subtitle/.Badge/.Meta`,
`MessageBubble.Content/.Timestamp/.FeedbackRow`, `SelectionGroup.Option`,
`SummaryPanel.Header/.Body`. Also dropped a redundant `className?: string` left on
`AddressTileProps`.

### Deliberately skipped

Internal, non-exported helpers — not reachable as `Component.SubComponent` and not in any
`index.ts`, so not public API:

- `components/primitives/Apple-objects/*` (`ConfirmIcon`, `CreditCardIcons`)
- Decorative SVG helpers inside components: `ApplePaySheet`'s `AccountIcon` / `AddressIcon` /
  `AppleMark` / `InfoRow` / `SideButtonConfirm`, `ApplePayButton`'s `AppleMark`,
  `AvailabilityDot`'s status icons, `PaymentConfirmSheet`'s `SecureHeader` /
  `ApplePayWaitingPrompt` / `AcceptedNetworksStrip`, `CompareTable`'s `AttributeValue`,
  `MakeupRecipeCard`'s `SwatchStrip` / `CollageHero` / `CarouselHero` (these three *do* forward
  props, because the public `MakeupRecipeCard.Hero` delegates to them)

---

## Parts 1–3: what changed (context, not to redo)

### Part 1 — packaging

- `react`/`react-dom` moved from `dependencies` → `peerDependencies` (`^19.0.0`). They were
  runtime deps, which risks a duplicate React and "invalid hook call" in every consumer.
- `next` → `devDependencies`. Verified no component or `lib/` file imports it; only the `app/`
  harness does.
- `@anthropic-ai/sdk` → `devDependencies`. Only `app/api/chat/route.ts` uses it; consumers were
  downloading it for nothing.
- Added `"sideEffects": ["*.css"]` — was absent, so bundlers couldn't tree-shake.
- Added `./core` and `./layouts` to `exports`; reordered so `types` precedes `import` in every
  condition (TS resolves conditions in order).
- Added `prepublishOnly: npm run build`.
- `ApplePaySheet` + `DoubleClickToPay` added to `core/index.ts` — they had stories but were
  unreachable to consumers. Root `index.ts` switched to `export *` for layouts, picking up
  `ModalSheet`, `DeliveryFlow`, `DeliveryTracker`, `THREAD_REF_MOCK`.

**Three latent build bugs found while verifying:**

- `tsc` was failing *entirely* — `tsconfig.build.json` overrides `include`, dropping
  `next-env.d.ts`/`svg.d.ts`, so ~60 asset imports errored. That's why
  `dist/components/primitives/index.d.ts` (the shipped `./primitives` types target) didn't exist.
  Fixed by adding `svg.d.ts` to the build `include` and extending it to png/jpg/jpeg/webp/avif.
- `incremental: true` suppressed declaration emit — Vite's `emptyOutDir` wipes `dist`, then `tsc`
  consults its buildinfo, sees no changes and emits nothing. A clean build could ship a
  **types-free package**. Set `incremental: false` in `tsconfig.build.json`.
- A masked type error in `RecipeCard.tsx` (`exit={shouldReduce ? false : …}` — `initial` accepts
  `false`, `exit` doesn't).

### Part 2 — React Compiler correctness bugs

- **`ChatWidget.tsx`** — overlay SVG read `scrollContainerRef.current?.scrollHeight` during
  render. Also a real staleness bug. `height` added to `LineCoords`, captured in the effect that
  already measures positions.
- **`ModalSheet.tsx`** — effect called `setIsDesktop()` synchronously, forcing a second render on
  every mount. Replaced with a `useIsDesktop()` hook on `useSyncExternalStore` (server snapshot
  `false` to match mobile-first base styles).
- **`DeliveryFlow.tsx`** — `Date.now()` in render gave a different edit deadline every re-render
  and mismatched under SSR. Moved into a `useState` lazy initializer.

### Part 3 — Storybook

Storybook's CSF parser treats **every named export** in a `.stories.tsx` as a story. Helper
functions and fixtures were being rendered as stories with no args: `BankLogo`'s `LogoGrid` and
`ChipToCard`'s `flightCard` crashed. Affected **9 files / 20 phantom exports** — the other 18 were
silently polluting the sidebar. All fixed with `excludeStories`, following the convention
`ComparisonCard` already used. Test count 365 → 345 is exactly those 20 phantoms.

`ChipToCard` also had 7 typecheck errors: `chips` is required but meta had no `args`, so
`StoryObj<typeof meta>` demanded `args` on every story. Added meta-level defaults; `Default` now
consumes them, so its Controls panel works.

**When adding any new story file:** non-story exports must go in `excludeStories`, or be
module-local.

### Also changed

- `eslint.config.mjs` — ignore `dist/**` and `storybook-static/**`. They were producing ~450
  phantom errors in minified bundles (534 → 79 total).
- `tsconfig.json` — exclude `dist`, `storybook-static`.
- `ToastBanner` — one of the three raw `<button>` rule violations replaced with shadcn `Button`.

---

## Known pre-existing — all now cleared

- ~~63 lint errors: stories import `@storybook/react`~~ — migrated to `@storybook/nextjs-vite`.
- ~~13 lint errors: `react/no-unescaped-entities`~~ — 14 in the end, fixed with typographic quotes.
- **2 raw `<button>`** in `RewardsStep` and `BranchSelectStep` — reviewed and kept. Both are
  `role="switch"` toggles, which shadcn `Button` is a poor base for. CLAUDE.md rule 2 now carries
  an explicit, bounded exception for switches, with a tripwire: a third one means extracting a
  `Switch` primitive rather than widening the exception.
- **1 typecheck error** in `.next/types/validator.ts` — stale artifact referencing
  `app/figma-make/page.js`; the page moved to `app/(site)/figma-make/`. `.next/` is gitignored and
  regenerates.

## What's left

Part 4 is closed. The two items below were flagged earlier and are still open.

## Open questions for the user

- **`dist/` is committed to git.** It had drifted badly from source (missing most `.d.ts`, stale
  JS). It's correct now, but this needs either a rebuild-before-commit discipline or a
  `.gitignore` entry. Possibly intentional for Figma Make consuming straight from GitHub —
  worth confirming.
- **Tier 3 was never started**: the Vitest/Storybook runner works and smoke-renders all stories,
  but there are 0 assertions beyond render (1 `play()` across 63 stories), no `argTypes` on any
  story, and no CI gate.
