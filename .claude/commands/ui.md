Read `.docs/guidelines/ui-guidelines` AND `.docs/guidelines/style-guidelines.md` in full, then apply every rule from both to the current task.

Before writing any component code, verify:

**Styling**
- All colors via CSS tokens only — no `#hex`, `rgb()`, `bg-blue-*`, hardcoded values
- No Figma values pasted directly into code
- Only exception: third-party brand marks (Google blue, Apple card gradients), where the literal colour is the spec. Never for layout, spacing, or our own palette.

**Imports**
- Shipped component source uses **relative** imports (`../../ui/button`) — `@/` aliases do not resolve for consumers
- `.stories.tsx` may use `@/` freely; stories are not published

**Components**
- `Button` from shadcn/ui — never raw `<button className="…">`. Only exception: `role="switch"` toggles.
- Compose from existing primitives before building custom elements
- Search repo for existing components before creating new ones

**Public API (every exported component and sub-component)**
- Accepts a `ref` and spreads rest props onto its root — see rule 8 in CLAUDE.md
- `motion.*` roots use `MotionElementProps` from `lib/prop-types.ts`, never raw `ComponentPropsWithRef`
- Component holds its own root ref → merge with `mergeRefs` from `lib/merge-refs.ts`
- React 19: `ref` is a plain prop, never `forwardRef`

**Responsive (mandatory on every component)**
- Interactive elements: `h-12 md:h-10`
- Containers: `p-4 md:p-6 lg:p-8`
- Page padding: `px-4 md:px-8 lg:px-12`
- Typography: `text-2xl md:text-3xl lg:text-4xl` for headings
- Full-screen mobile layouts: use `h-[100dvh]`, not `h-screen`
- Progressive scaling only — no big breakpoint jumps

**Icons**
- ≤48px: standard stroke — `<Info size={24} />`
- >48px: thin stroke — `<Heart size={64} strokeWidth={ICON_STROKE_WIDTH} />` (import from `lib/theme-config`, relative path in shipped source)

**Accessibility**
- Icon-only buttons: `aria-label="…"`
- Images: `alt="…"` (or `alt=""` if decorative)
- Dynamic content: `role="status" aria-live="polite"` or `role="alert" aria-live="assertive"`
- Modals: trap focus, return focus to trigger on close

**Animation**
- If the task involves any animation, transition, hover effect, or motion — also invoke `#motion` before writing code.
