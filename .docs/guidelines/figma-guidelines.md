# Figma Kit Guidelines

Rules for building and maintaining the component library in the `ai-chat-shad-cn` Figma file.
Invoke with `#figkit` — read this file in full before writing any `use_figma` code.

---

## 1. Component tier map

Mirrors the code's atomic structure exactly.

| Code tier | Folder | Figma location | Figma node type |
|-----------|--------|----------------|-----------------|
| Tier 1 — atoms | `components/primitives/` | `Primitives` page (shared) | ComponentSet |
| Tier 2 — molecules | `components/core/` | One page per component | ComponentSet |
| Tier 3 — organisms | `components/layouts/` | One page per layout | ComponentSet |

**Dependency direction is identical to code:** atoms → molecules → organisms. A Figma molecule must use instances of existing atom components — never recreate the atom inline.

---

## 2. Shared atom rule (critical)

> If an interactive or styled element appears in two or more core components, it must be a **nested instance** from an existing Figma component — not recreated.

Shared atoms already in this file:

| Element | Figma source page | Instance swap prop name |
|---------|-------------------|------------------------|
| Button (any variant) | `Button` | `Action` |
| Input field | `Input` | `Input` |
| Badge / status chip | `Badge` | — |
| Any icon | `Icons` | `Icon` (INSTANCE_SWAP) |
| Tag chip | `Primitives` → Tag | — |
| Biometric ring | `Primitives` → BiometricIndicator | — |
| Step dot | `Primitives` → StepIndicator | — |

When a core component needs a send button, a dismiss button, or any icon — find it on the source page and `component.createInstance()`. Never `figma.createComponent()` a button from scratch inside a molecule.

---

## 3. CSS variable → Figma variable mapping

Every fill, stroke, text colour, padding, gap, and radius must be **bound to a Figma variable** — no hardcoded hex or pixel values.

### Colour — Background

| CSS / Tailwind class | Figma variable | Scope |
|----------------------|----------------|-------|
| `bg-background` | `Background/default` | FRAME_FILL |
| `bg-card` | `Background/card` | FRAME_FILL |
| `bg-popover` | `Background/popover` | FRAME_FILL |
| `bg-primary` | `Background/Primary/default` | FRAME_FILL |
| `bg-primary/20` | `Background/Primary/light` | FRAME_FILL |
| `hover:bg-primary` | `Background/Primary/default-hover` | FRAME_FILL |
| `bg-secondary` | `Background/Secondary/default` | FRAME_FILL |
| `bg-muted` | `Background/muted` | FRAME_FILL |
| `bg-accent` | `Background/accent` | FRAME_FILL |
| `bg-destructive` | `Background/Destructive/default` | FRAME_FILL |
| `bg-input` | `Background/input` | FRAME_FILL |
| `bg-success` | `Background/Success/default` | FRAME_FILL |
| `bg-warning` | `Background/Warning/default` | FRAME_FILL |

### Colour — Foreground / text

| CSS / Tailwind class | Figma variable | Scope |
|----------------------|----------------|-------|
| `text-foreground` | `Foreground/default` | TEXT_FILL |
| `text-primary-foreground` | `Foreground/Primary/default` | TEXT_FILL |
| `text-primary` (brand colour as text) | `Foreground/accent` | TEXT_FILL |
| `text-secondary-foreground` | `Foreground/Secondary/default` | TEXT_FILL |
| `text-muted-foreground` | `Foreground/muted` | TEXT_FILL |
| `text-destructive` | `Foreground/Destructive/default` | TEXT_FILL |
| `text-success` | `Foreground/Success/default` | TEXT_FILL |
| `text-warning` | `Foreground/Warning/default` | TEXT_FILL |

### Colour — Icon (use for vector/SVG strokes and fills, not text)

| Context | Figma variable | Scope |
|---------|----------------|-------|
| Default icon | `Icon/default` | SHAPE_FILL |
| Muted / inactive icon | `Icon/muted` | SHAPE_FILL |
| Primary action icon | `Icon/Primary/default` | SHAPE_FILL |
| Secondary icon | `Icon/Secondary/default` | SHAPE_FILL |
| Destructive icon | `Icon/Destructive/default` | SHAPE_FILL |
| Success icon | `Icon/Success/default` | SHAPE_FILL |
| Warning icon | `Icon/Warning/default` | SHAPE_FILL |
| Disabled icon | `Icon/Disabled/default` | SHAPE_FILL |

### Colour — Border / stroke

| CSS / Tailwind class | Figma variable | Scope |
|----------------------|----------------|-------|
| `border` / `border-border` | `Border/default` | STROKE_COLOR |
| `border-primary` | `Border/Primary/default` | STROKE_COLOR |
| `border-destructive` | `Border/Destructive/default` | STROKE_COLOR |
| `border-success` | `Border/Success/default` | STROKE_COLOR |
| `border-warning` | `Border/Warning/default` | STROKE_COLOR |

### Spacing

Tailwind → Figma variable (use `Spacing/*` for gaps between elements, `Padding/*` for internal padding):

| Tailwind (approx px) | Spacing variable | Padding variable |
|----------------------|-----------------|-----------------|
| 2px (`gap-0.5`, `p-0.5`) | `Spacing/spacing-xxs` | — |
| 4px (`gap-1`, `p-1`) | `Spacing/spacing-xs` | — |
| 8px (`gap-2`, `p-2`) | `Spacing/spacing-sm` | `Padding/padding-xxs` |
| 12px (`gap-3`, `p-3`) | `Spacing/spacing-md` | `Padding/padding-xs` |
| 16px (`gap-4`, `p-4`) | `Spacing/spacing-lg` | `Padding/padding-sm` |
| 20px (`gap-5`, `p-5`) | — | `Padding/padding-md` |
| 24px (`gap-6`, `p-6`) | `Spacing/spacing-xl` | `Padding/padding-lg` |
| 32px (`gap-8`, `p-8`) | `Spacing/spacing-xxl` | `Padding/padding-xl` |
| 40px (`gap-10`, `p-10`) | `Spacing/spacing-3xl` | `Padding/padding-xxl` |

### Radius

| Tailwind class | Figma variable |
|----------------|----------------|
| `rounded-none` | `Radius/radius-none` |
| `rounded-sm` | `Radius/radius-xs` |
| `rounded` / `rounded-md` | `Radius/radius-sm` |
| `rounded-lg` | `Radius/radius-md` |
| `rounded-xl` | `Radius/radius-lg` |
| `rounded-2xl` | `Radius/radius-xl` |
| `rounded-3xl` | `Radius/radius-xxl` |
| `rounded-full` | `Radius/radius-full` |

---

## 4. Component property conventions

Match the existing file's naming exactly — inspecting one existing component before adding properties to a new one.

| Prop type | When to use | Naming convention |
|-----------|-------------|-------------------|
| `TEXT` | Any user-editable string (label, placeholder, timestamp) | Sentence case: `Label`, `Placeholder`, `Timestamp` |
| `BOOLEAN` | Show/hide a child node | `Has X` format: `Has Avatar`, `Has Timestamp`, `Has Remove` |
| `INSTANCE_SWAP` | Swappable icon or nested component | Noun only: `Icon`, `Avatar`, `Action` |
| `VARIANT` axis | Mutually exclusive visual states | `State=`, `Status=`, `Variant=`, `Role=` |

Always save the key returned by `addComponentProperty` and wire it immediately — do not batch wiring as a separate step.

---

## 5. Variant axis naming

Use the same naming already in this file:

- Interaction state → `State=Default / Hover / Focused / Pressed / Disabled`
- Message role → `Role=User / Assistant`
- Semantic intent → `Variant=Default / Secondary / Outline / Destructive`
- Step status → `Status=Pending / Active / Complete`
- Component state machine → `State=Idle / Pending / Success / Error`

---

## 6. Page and grid conventions

- **One page per core component.** Exception: tightly related sub-components (e.g. `ChatInput` + `ChatInput/Attachment`) may share a page with a clear section separator.
- **Primitives page** holds all Tier 1 atoms — do not scatter them across individual pages.
- **Grid layout inside each ComponentSet:** State on columns (horizontal scan = interaction verification), other axes on rows.
- **Section labels** (14px Semi Bold, `#666`) above each ComponentSet on the page.
- **ComponentSet background:** `{ r: 0.97, g: 0.97, b: 0.99 }` with `cornerRadius: 12`.

---

## 7. Build order within a molecule

1. Inspect the file — confirm all needed atom instances exist before writing any code
2. Load all variable IDs in one `Promise.all` call
3. Create variants bottom-up (atoms first, then assemble into the molecule frame)
4. `combineAsVariants` → grid layout → `addComponentProperty` → wire references
5. Validate with `page.screenshot()` before moving to the next component
