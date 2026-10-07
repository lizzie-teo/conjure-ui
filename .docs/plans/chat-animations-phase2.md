# Chat Animations — Phase 2 Implementation Plan

Implements the innovative animation patterns defined in `.docs/guidelines/chat-animation-guidelines.md`. All components follow the atomic tier rules from `CLAUDE.md` and the motion system from `.docs/motion-guidelines`.

> **Status (2026-06-06):** MessageBubble animation variants (magnetic snap + word-by-word) are being handled in a separate branch. ChatInput send icon transition is already built. All other items below are pending.

---

## What Is Already Built

| Component | What exists | Gap |
|-----------|-------------|-----|
| `TypingIndicator` | 3-dot bounce, `AnimatePresence`, reduced-motion | Wrong pattern — spec requires 5-bar waveform |
| `ChatInput.Send` | Mic→arrow `AnimatePresence mode="wait"` swap | Complete |
| `ChatInput` focus | `focus-within:ring-2` | Spec requires radial glow `::before`, not a ring |
| `MessageBubble` | Generic `y+scale` entrance | Magnetic snap (user) + word-by-word (AI) — in progress separately |
| `QuickReplies` | Stagger entrance, `overflow-x-auto` | No snap, no peek, no chip-to-card expansion |
| `Avatar` | Static, no animation | Missing breathe animation |
| Everything else | — | Not started |

---

## Dependency Map

```
Primitives (Tier 1)
  WaveformIndicator
  MorphingBlob
  Skeleton

Core (Tier 2)
  ThinkingIndicator       ← uses WaveformIndicator + MorphingBlob + label cycle
  MessageBubble (update)  ← add word-by-word + magnetic snap variants
  CopyButton (update)     ← add transform + ripple
  ChatInput (update)      ← add focus glow + send icon transition

Layouts (Tier 3)
  CardCarousel               ← horizontal scroll strip
  StackedCards               ← fan/expand pattern
  ExpandableChips              ← chip expansion morphing
```

---

## Phase 1 — Primitives (build first, no deps)

### 1.1 `WaveformIndicator`
**Tier**: primitives  
**File**: `components/primitives/WaveformIndicator/WaveformIndicator.tsx`

Props:
```tsx
interface WaveformIndicatorProps {
  barCount?: number        // default 5
  className?: string
}
```

- 5 bars, sine-wave stagger, loop via framer-motion
- `role="status"` `aria-label="AI is thinking"`
- `useReducedMotion()` → static bars at 60% height, no animation
- Stories: default, reduced-motion, custom barCount

---

### 1.2 `MorphingBlob`
**Tier**: primitives  
**File**: `components/primitives/MorphingBlob/MorphingBlob.tsx`

Props:
```tsx
interface MorphingBlobProps {
  size?: 'sm' | 'md'       // sm=32px, md=48px
  className?: string
}
```

- Continuous `borderRadius` morph loop (3s, easeInOut)
- `useReducedMotion()` → plain circle, no morph
- Aria-hidden — purely decorative, always paired with text indicator
- Stories: sm, md, reduced-motion

---

### 1.3 `Skeleton`
**Tier**: primitives  
**File**: `components/primitives/Skeleton/Skeleton.tsx`

Props:
```tsx
interface SkeletonProps {
  shape: 'line' | 'heading' | 'code' | 'bullet-list'
  lines?: number           // for 'line' and 'bullet-list'
  className?: string
}
```

- Shimmer sweep via CSS background-position animation
- Composable — `ThinkingIndicator` assembles these into a full skeleton
- `useReducedMotion()` → static muted block, no shimmer
- Stories: each shape variant

---

## Phase 2 — Core updates & ThinkingIndicator

### 2.1 `ThinkingIndicator` (new component)
**Tier**: core  
**File**: `components/core/ThinkingIndicator/ThinkingIndicator.tsx`

Replaces / supersedes the existing `TypingIndicator`. Assembles:
- `WaveformIndicator` (primary mode)
- Label cycle ("Thinking…" → "Reading…" → "Writing…") via `AnimatePresence mode="wait"`
- `Skeleton` preview (shown after 600ms delay with no first token)
- `MorphingBlob` (optional, `variant="heavy"` for long-running ops)

Props:
```tsx
interface ThinkingIndicatorProps {
  variant?: 'default' | 'heavy'    // heavy shows blob instead of waveform
  showSkeleton?: 'paragraph' | 'list' | 'code' | false
  className?: string
}
```

Wrap in `AnimatePresence` at usage site — the component handles internal transitions only.

Stories:
- Default (waveform + label cycle)
- Heavy (blob)
- With skeleton preview (each shape)
- Reduced motion

---

### 2.2 `MessageBubble` — animation variants update
**File**: `components/core/MessageBubble/MessageBubble.tsx`

Add two entrance variants to the existing component (no prop API change — driven by `role`):

**User bubbles** → magnetic snap (spring x + scaleX). Current: standard fade-up.  
**AI bubbles** → word-by-word materialization when `streaming={true}`. Standard bubble entrance when `streaming={false}` (already-complete messages).

```tsx
// New prop
interface MessageBubbleProps {
  // ... existing props
  streaming?: boolean   // enables word-by-word on AI messages
}
```

Implementation detail: split `children` string into word tokens inside the component. Non-string children (React nodes, code blocks) bypass word splitting and use the standard bubble entrance.

---

### 2.3 `CopyButton` — transform + ripple update
**File**: `components/core/MessageBubble/MessageBubble.tsx` (sub-component)

- Icon swap (copy → check) via `AnimatePresence mode="wait"`, scale + fade
- Ripple: `motion.span` positioned absolute, scales from 1 → 2, opacity 1 → 0 on confirm
- Auto-revert: 2000ms `setTimeout`
- Stories: idle, copying, confirmed, reduced-motion

---

### 2.4 `ChatInput` — focus glow + send icon transition update
**File**: `components/core/ChatInput/ChatInput.tsx`

- Focus glow: CSS `::before` pseudo-element with `opacity` transition (not framer-motion)
- Send icon transition: `AnimatePresence mode="wait"`, mic → arrow with rotate entrance
  - Empty input → mic/attach icon
  - Has content → arrow icon (rotates in from 45° → 0°)

No new props — driven by input value state already tracked internally.

---

## Phase 3 — Carousel & Rich Content Layouts

### 3.1 `CardCarousel`
**Tier**: core  
**File**: `components/core/CardCarousel/CardCarousel.tsx`

```tsx
interface CardCarouselProps {
  children: React.ReactNode   // expects CardCarousel.Item children
  className?: string
}
// Sub-component
CardCarousel.Item // shrink-0, snap-start, standard width
```

- Horizontal overflow scroll, `snap-x snap-mandatory`
- No prev/next buttons — peek affordance only
- `aria-label="Scroll for more options"` on scroll container
- Last item has right padding so the peek of the next card is always visible
- Stories: 3 cards, 5 cards, single card (no scroll)

---

### 3.2 `StackedCards`
**Tier**: core  
**File**: `components/core/StackedCards/StackedCards.tsx`

```tsx
interface StackedCardsProps {
  children: React.ReactNode   // 3–5 StackedCards.Item children
  className?: string
}
StackedCards.Item
```

- Collapsed: stacked with 6px Y-offset + 1.5° rotation per card
- Expanded: stagger 88px apart, flat — spring transition on both states
- Toggle: click anywhere on the stack
- Max 5 items — warn in dev if exceeded
- Keyboard: `Enter`/`Space` toggles, `Escape` collapses
- `aria-expanded` on the trigger
- Stories: 3 cards collapsed, 3 cards expanded, 5 cards, keyboard nav

---

### 3.3 `ExpandableChips`
**Tier**: core  
**File**: `components/core/ExpandableChips/ExpandableChips.tsx`

```tsx
interface ExpandableChipsProps {
  chips: { id: string; label: string; card: React.ReactNode }[]
  className?: string
}
```

- Chips render as `QuickReplies`-style pills
- Selected chip expands via `layoutId` morph into card
- Unselected chips exit with opacity + scale-down via `AnimatePresence`
- Both chip and card must share the same `layoutId` prefix
- Stories: 3 options, 4 options, pre-selected state

---

## Phase 4 — Ambient (build last)

### 4.1 Avatar Breathe
Update to `Avatar` or the AI avatar inside `MessageBubble`.

- `isGenerating` prop added to whatever component renders the AI avatar
- Scale loop `1.0 → 1.025` while generating, stops immediately on first token
- `useReducedMotion()` → no loop
- This is a prop addition to an existing primitive, not a new component

---

### 4.2 Conversation Age Fade
Applied in the message list container (Layouts tier — `ChatWindow` or similar).

- Compute `distanceFromBottom` for each message
- Inject `--message-age-opacity` CSS custom property per message
- `opacity: Math.max(0.6, 1 - distanceFromBottom * 0.04)`
- Only on AI messages — user messages always full opacity
- Hover restores full opacity
- Never applied to the active/last message

---

### 4.3 Thumbs Up Burst
Sub-component of `MessageBubble` feedback row.

- 6–8 particles (✨ or brand-primary dots) animate outward on spring physics
- `aria-hidden="true"` on the particle container
- `useReducedMotion()` → skip particles, just swap icon
- Does not play on thumbs-down (muted shake instead)

---

### 4.4 Error Shake
Standalone wrapper (or add to `MessageBubble`) for failed message / network error states.

```tsx
// x: [0, -6, 6, -4, 4, 0], duration 0.35s, easeInOut
// Triggered via hasError prop — never use red flash alone
```

- Does not need its own component — can be a `useErrorShake` motion variant exported from `lib/`
- Applied to whatever element has failed (message bubble, input bar)
- `useReducedMotion()` → skip shake, use opacity pulse instead

---

### 4.5 Thread Reference Glow *(build last — high complexity)*
When the AI references an earlier message, that message briefly glows and a connecting SVG line is drawn.

- `bg-primary/10` flash on the referenced message, 1.2s duration
- SVG layer absolutely positioned over the thread, `pathLength` animation draws the line
- Requires message IDs and a scroll-position lookup to compute line coordinates
- `useReducedMotion()` → skip SVG line, keep the glow flash only

---

## Build Order Summary

| Priority | Component | Type | Effort | Status |
|----------|-----------|------|--------|--------|
| 1 | `WaveformIndicator` | new primitive | low | pending |
| 2 | `MorphingBlob` | new primitive | low | pending |
| 3 | `Skeleton` | new primitive | medium | pending |
| 4 | `ThinkingIndicator` | new core | medium | pending |
| 5 | `MessageBubble` animation variants | update core | medium | in progress (separate branch) |
| 6 | `CopyButton` transform + ripple | update core sub | low | pending |
| 7 | `ChatInput` focus glow | update core | low | pending |
| 8 | `CardCarousel` | new core | medium | pending |
| 9 | `StackedCards` | new core | high | pending |
| 10 | `ExpandableChips` | new core | high | pending |
| 11 | Avatar breathe | update primitive | low | pending |
| 12 | Conversation age fade | update layout | medium | pending |
| 13 | Thumbs up burst | update core sub | medium | pending |
| 14 | Error shake | lib hook | low | pending |
| 15 | Thread Reference Glow | new core | high | pending |

---

## Definition of Done (per component)

- [ ] Framer-motion only — no CSS keyframes for movement
- [ ] `useReducedMotion()` branch implemented and tested
- [ ] `AnimatePresence` wraps every conditional render
- [ ] Stable `key` on every `AnimatePresence` child
- [ ] `exit` variant defined — nothing disappears without animation
- [ ] a11y attributes in place (`aria-label`, `role`, `aria-expanded` etc.)
- [ ] Storybook stories: all variants + reduced-motion story
- [ ] Tested at mobile (375px), tablet (768px), desktop (1280px)
- [ ] No hardcoded colors, spacing, or stroke widths
