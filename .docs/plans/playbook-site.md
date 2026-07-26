# Playbook Site — Build Plan

## What we're building

A polished Next.js documentation site (inside the existing `app/` directory) that acts as the public-facing framework reference for `@lizzie-teo/conjure-ui`. Audience: product designers and design managers. Think shadcn/ui or Radix UI docs — visual, clean, premium. Not a developer tool.

Deployed to Vercel. Storybook (on Chromatic) stays separate as the interactive component browser for internal/dev use.

---

## Decisions already made

- **Framework:** Existing Next.js app (`npm run next`, `app/` dir) — no new tooling
- **Audience:** Product designers + design managers, not developers
- **Storybook:** Already deployed to Chromatic at `https://6a251cdcacca87566659252b-mxrwfqmaxy.chromatic.com/` — linked from the site but not embedded
- **Themes:** Storybook stripped to Light and Dark only (done)
- **Token alignment:** `theme.css` updated to match Figma Make's token structure (done)
- **Industry colors for badge chips:** Site-local CSS only — NOT in `theme.css` or `globals.css` (library stays brand-agnostic)

---

## Site structure

```
/                    Home — hero, industries, featured components, CTA
/components          Component gallery — filterable by industry
/playbook            Playbook overview — 4 vertical cards
/playbook/travel     Travel vertical guide
/playbook/banking    Banking vertical guide
/playbook/merchants  Merchants vertical guide
/playbook/insurance  Insurance vertical guide
/figma-make          Getting started for designers — how to import and brand
```

---

## Files to create

### Data layer
- `app/_data/components.ts` — full component inventory with tier + industry tags
- `app/_data/playbook.ts` — per-vertical scenario content

### Shared site components
- `app/_components/Nav.tsx` — top nav: logo, links, Storybook link
- `app/_components/Footer.tsx` — simple footer
- `app/_components/IndustryBadge.tsx` — colored chip (travel, banking, etc.) — colors defined in site.css, not theme.css
- `app/_components/ComponentCard.tsx` — card showing name, tier, description, industry badges
- `app/_components/PlaybookCard.tsx` — card for each vertical on the playbook overview page
- `app/site.css` — site-only styles (industry badge colors, hero gradients) — imported only by app layout, not by the library

### Pages
- `app/layout.tsx` — update with Nav, Footer, import site.css
- `app/page.tsx` — home page
- `app/components/page.tsx` — client component, filter state for industry tabs
- `app/playbook/page.tsx` — playbook overview
- `app/playbook/travel/page.tsx`
- `app/playbook/banking/page.tsx`
- `app/playbook/merchants/page.tsx`
- `app/playbook/insurance/page.tsx`
- `app/figma-make/page.tsx`

---

## Component inventory (for `_data/components.ts`)

### Primitives (Tier 1)
| Component | Industries |
|---|---|
| StatusBadge | all |
| PriceDisplay | travel, merchants, insurance |
| EntityAvatar | all |
| TimestampLabel | all |
| Tag | all |
| ProgressStep | all |
| AddressTile | travel, merchants |
| BankLogo | banking |
| BiometricIndicator | banking |
| MorphingBlob | all |
| PaymentMethodTile | banking, merchants |
| QuantityStepper | merchants |
| SkeletonBlock | all |
| WaveformIndicator | all |
| ApplePayButton | banking, merchants |

### Core (Tier 2)
| Component | Industries |
|---|---|
| MessageBubble | all |
| TypingIndicator | all |
| ChatInput | all |
| QuickReplies | all |
| MediaCard | travel, merchants |
| DetailList | travel, banking, insurance |
| ActionStrip | all |
| SummaryPanel | banking, merchants, insurance |
| SelectionGroup | travel, insurance, merchants |
| CartItem | merchants |
| CartSummary | merchants |
| AuthPrompt | banking |
| AuthStatus | banking |
| CardStack | banking, merchants |
| CardStrip | merchants |
| ComparisonCard | travel, insurance |
| OrderReview | merchants |
| ApplePaySheet | banking, merchants |
| PaymentConfirmSheet | banking, merchants |
| PaymentSuccess | banking, merchants |
| ChipToCard | banking |
| DoubleClickToPay | banking, merchants |

### Layouts (Tier 3)
| Component | Industries |
|---|---|
| ChatWidget | all |
| ModalSheet | all |

---

## Playbook content (per vertical)

### Travel
**Scenarios:** Flight search → seat selection → booking confirmation
**Core components:** MediaCard (flight cards), ComparisonCard (fare compare), SelectionGroup (seats/extras), DetailList (itinerary), PriceDisplay, ProgressStep, ConfirmationLayout
**Primitives:** StatusBadge (flight status), EntityAvatar (airline), AddressTile (airports), TimestampLabel

### Banking
**Scenarios:** Biometric login → account query → payment → confirmation
**Core components:** AuthPrompt, AuthStatus, CardStack, ChipToCard, DoubleClickToPay, ApplePaySheet, PaymentConfirmSheet, PaymentSuccess
**Primitives:** BankLogo, BiometricIndicator, PaymentMethodTile

### Merchants
**Scenarios:** Product browse → cart → checkout → order confirmation
**Core components:** MediaCard (products), CartItem, CartSummary, OrderReview, SelectionGroup, CardStrip, ApplePaySheet, PaymentSuccess
**Primitives:** PriceDisplay, QuantityStepper, PaymentMethodTile

### Insurance
**Scenarios:** Quote comparison → policy selection → coverage summary → confirmation
**Core components:** ComparisonCard, SelectionGroup, SummaryPanel, DetailList
**Primitives:** StatusBadge, PriceDisplay, ProgressStep

---

## Design rules for the site

- Use only CSS custom properties from `theme.css` (no `bg-blue-500`, no hardcoded hex)
- Industry badge colors go in `app/site.css` only
- Responsive: `md:` variants on all sizes and spacing
- Button component from `@/components/ui/button` — no raw `<button>`
- No comments unless the WHY is non-obvious
- Clean, premium aesthetic — Airbnb/Qantas quality, not developer-documentation style

---

## Figma Make guide content

1. **Prerequisites** — have a Figma account, access to Figma Make
2. **Import the repo** — paste the GitHub URL into Figma Make
3. **What loads** — the demo app entry point is what renders on the canvas
4. **Browse components** — how to find and use components in Figma Make's panel
5. **Apply your brand** — copy your Figma Make `:root` and `.dark` blocks → paste into `theme.css`, replacing the values. Leave `globals.css` untouched.
6. **Radius and typography** — both live in `theme.css :root` (`--radius`, `--font-sans`, `--font-size`)

---

## Deployment

Vercel — deploy the Next.js app (`npm run next` / `npm run build:next`).
The Storybook build goes to Chromatic separately (already configured).
