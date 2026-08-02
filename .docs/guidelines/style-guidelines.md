# Style Guidelines — Clean Look

Visual design system for all components. Inspired by the luxury AI eCom references in `.docs/learning/references/new/`.

---

## Design Philosophy

**Clean. Airy. Minimal.**

- Generous whitespace — let content breathe
- Soft, cool-tinted surfaces — never stark white-on-white or warm/heavy
- Surfaces feel layered: page → card → chip, each clearly elevated
- Very low visual noise: subtle borders, whisper-soft shadows, restrained color

This is the baseline. All industry themes (travel, retail, healthcare, etc.) override primary color and radius only — the underlying clean language stays.

---

## Color Palette

### Surface Layers

| Token | Light value | Role |
|-------|-------------|------|
| `--background` | Cool off-white `oklch(0.97 0.007 248)` | Page / chat window background |
| `--card` | Pure white `oklch(1 0 0)` | Cards, message bubbles, panels — lifts off background |
| `--muted` | Light cool-gray `oklch(0.94 0.008 248)` | Assistant bubbles, input fill, empty states |
| `--secondary` | Very light cool `oklch(0.96 0.006 248)` | Secondary buttons, chip backgrounds |

### Text

| Token | Light value | Usage |
|-------|-------------|-------|
| `--foreground` | Deep cool charcoal `oklch(0.14 0.010 258)` | Primary text |
| `--card-foreground` | Same as foreground | Text inside cards |
| `--muted-foreground` | Soft mid-gray `oklch(0.50 0.010 258)` | Captions, timestamps, placeholder, assistant text |

### Interaction

| Token | Light value | Usage |
|-------|-------------|-------|
| `--primary` | Deep navy `oklch(0.27 0.09 243)` | Buttons, user chat bubbles, CTAs |
| `--primary-foreground` | Off-white `oklch(0.98 0 0)` | Text on primary |
| `--border` | Subtle cool line `oklch(0.90 0.007 248)` | Card borders, dividers, input outlines |
| `--input` | Same as border | Input field border |
| `--ring` | Blue focus `oklch(0.45 0.12 243)` | Keyboard focus ring |

### Rules
- Never hardcode hex or rgb values — always use CSS tokens
- Background uses a cool blue-gray tint (hue ~248), not warm — this is what gives the clean, fresh look
- `--card` is pure white so it visibly floats above the background even at low contrast
- `--muted` is used for assistant chat bubbles — slightly recessed vs user bubbles

---

## Typography

Font: whatever `--font-sans` resolves to. **The library loads no webfont** — `app/theme.css`
defaults the token to the system stack, and consumers override it with their brand face. One
family only; never introduce a second.

For our own surfaces (the Next site, Storybook demo themes) and as the documented recommendation
to consumers, that font is **Inter**: variable, neutral enough that a client's brand still reads
as theirs, and drawn for UI text at 12–16px rather than for headlines. Use
`font-variant-numeric: tabular-nums` wherever numbers stack — prices, comparison tables, order
totals.

Do not add a font `@import` to `app/globals.css`. That file ships in the package, so an import
there forces a third-party request on every consumer.

### Scale

| Element | Classes | Notes |
|---------|---------|-------|
| Display / Hero | `text-3xl md:text-4xl font-semibold` | Onboarding prompts ("What are you looking for?") |
| H1 | `text-2xl md:text-3xl font-semibold` | Page titles |
| H2 | `text-xl md:text-2xl font-semibold` | Section headings |
| H3 | `text-base md:text-lg font-semibold` | Card titles, group labels |
| Body | `text-sm md:text-base font-normal` | Descriptions, message text |
| Caption | `text-xs md:text-sm text-muted-foreground` | Timestamps, metadata, subtitles |
| Label / Tag | `text-xs font-medium uppercase tracking-wide` | Chips, status labels, category tags |
| Amount / Hero number | `text-3xl md:text-4xl font-semibold tabular-nums tracking-tight` | Payment totals, large price displays |

### Rules
- Use `font-semibold` (not bold) for headings — bold is too heavy for a clean look
- `text-muted-foreground` for any secondary text (captions, subtitles, timestamps)
- Category chips use **uppercase + tracking-wide** — creates the minimal luxury feel from the references
- Large prompt text (empty state / welcome) uses `font-light` or `font-normal` at large size, never bold

---

## Spacing & Border Radius

### Base Radius: `0.75rem` (12px)

All components derive their radius from `--radius`. Never set radius manually — use Tailwind's `rounded-*` utilities which map to the derived tokens.

| Tailwind class | Value (at 0.75rem base) | Use for |
|----------------|-------------------------|---------|
| `rounded-sm` | ~7px | Tiny chips when pill is too much |
| `rounded-md` | ~10px | Inputs, small buttons |
| `rounded-lg` | 12px | Standard buttons, badges |
| `rounded-xl` | ~17px | Cards, panels, drawers |
| `rounded-2xl` | ~22px | Large cards, image containers, modals |
| `rounded-3xl` | ~26px | Floating chat window |
| `rounded-full` | 9999px | Chips / pills, avatars, icon buttons |

**Rule**: Cards use `rounded-xl`. Chips/tags use `rounded-full`. Inputs use `rounded-md`. Never mix in the same row.

### Spacing (Progressive — no big jumps)

| Context | Mobile → md → lg |
|---------|-----------------|
| Page horizontal | `px-4 md:px-8 lg:px-12` |
| Card padding | `p-4 md:p-5` |
| Chip padding | `px-3 py-1` |
| Gap between chips | `gap-2` |
| Section gaps | `gap-4 md:gap-6` |

---

## Elevation & Shadows

Three levels. Always use the CSS custom property, never Tailwind's hardcoded `shadow-*` utilities for elevated UI.

| Token | Value | Use for |
|-------|-------|---------|
| `--shadow-sm` | `0 1px 4px oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.02)` | Input focus, small floating elements |
| `--shadow-card` | `0 2px 12px oklch(0 0 0 / 0.06), 0 1px 4px oklch(0 0 0 / 0.03)` | Cards, message bubbles, panels |
| `--shadow-bubble` | `0 1px 8px oklch(0 0 0 / 0.05), 0 0.5px 2px oklch(0 0 0 / 0.02)` | Chat message bubbles |
| `--shadow-elevated` | `0 4px 24px oklch(0 0 0 / 0.08), 0 2px 8px oklch(0 0 0 / 0.04)` | Modals, dropdowns, popovers |

### Rules
- Shadows are **cool-tinted and diffuse** — large spread radius, very low opacity
- Never use `shadow-lg` or `shadow-xl` from Tailwind — they're too dark and warm
- On hover, transition from `shadow-card` to `shadow-elevated` for lift feedback
- In dark mode, increase opacity slightly (see dark tokens) — shadows must still read on dark surfaces

---

## Component Visual Patterns

### Cards
```tsx
// Standard card: white surface, xl radius, card shadow
<div className="bg-card border border-border rounded-xl shadow-[var(--shadow-card)] p-4 md:p-5">
```
- Background: `bg-card` (white)
- Border: `border border-border` — the thin cool line keeps cards crisp
- Radius: `rounded-xl` (~17px)
- Shadow: `shadow-[var(--shadow-card)]`
- On hover: lift `y: -3` + `shadow-[var(--shadow-elevated)]` transition

### Category Chips / Tags
Inspired directly by the reference — minimal outlined pills with uppercase labels:
```tsx
// Outlined chip (for category selectors)
<span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground">
  LUXURY
</span>

// Filled chip (selected state)
<span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-medium uppercase tracking-wide">
  LUXURY
</span>
```

### Chat Bubbles
- **User**: `bg-primary text-primary-foreground rounded-2xl` — fully rounded, brand color
- **Assistant**: `bg-muted text-foreground rounded-2xl` — muted, slightly recessed
- Max width: `max-w-[75%] md:max-w-sm`
- Shadow: `shadow-[var(--shadow-bubble)]`

### Empty State / Welcome Prompt
Large, centered, light-weight text — matches the "Tell me what you're looking for?" reference:
```tsx
<div className="flex flex-col items-center gap-4 text-center px-6">
  <p className="text-2xl md:text-3xl font-light text-foreground leading-snug">
    What are you <span className="text-primary font-normal italic">looking for</span> today?
  </p>
</div>
```

### Input Bar
Clean, minimal — floats above content:
```tsx
<div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] px-4 py-3 flex items-center gap-3">
```

---

## Borders

- Default: `border border-border` — one pixel, cool gray line
- No border on muted surfaces (assistant bubbles, chips with bg) — background contrast is enough
- Dividers between rows: `border-b border-border` or a `gap` with no explicit border
- **Never** use `border-2` or colored borders unless it's a focus ring or error state

---

## Dark Mode

Dark mode keeps the clean language — just inverts surface hierarchy:

| Token | Dark value | Role |
|-------|------------|------|
| `--background` | Near-black cool `oklch(0.13 0.010 258)` | Page background |
| `--card` | Slightly lighter `oklch(0.18 0.010 258)` | Cards surface |
| `--muted` | Mid-dark `oklch(0.23 0.010 258)` | Assistant bubbles |
| `--border` | Subtle white `oklch(1 0 0 / 10%)` | Borders |

Shadows increase opacity in dark mode — they need to work against dark surfaces.

---

## What "Clean" Means in Practice

| Clean ✅ | Not clean ❌ |
|----------|-------------|
| Lots of whitespace between elements | Cramped stacking |
| Cards with soft shadow + thin border | No shadow, no border (flat) |
| Category labels in uppercase tracking-wide | Mixed-case dense labels |
| Muted foreground for secondary info | Everything full-foreground |
| One accent color per view | Multiple competing accent colors |
| `rounded-full` chips, `rounded-xl` cards | Same radius everywhere |
| Cool off-white background | Warm yellow-tinted backgrounds |
| Light/normal weight for large text | Bold large text |

---

**Version 1.0** | Clean look baseline — references: `.docs/learning/references/new/`
