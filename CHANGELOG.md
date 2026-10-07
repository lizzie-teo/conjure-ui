# Changelog

All notable changes to `@lizzie-teo/conjure-ui` are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## What counts as breaking

This is a themable component library, so the public surface is wider than the exported functions.
All three of these are **major** changes:

- **Renaming or removing a Tier 1 or Tier 2 token.** A missing CSS custom property does not throw —
  it silently falls back, and a consumer's brand quietly turns grey. Renames ship with the old name
  aliased for at least one minor release, and the removal is called out here.
- **Renaming or removing an exported component or compound sub-component** (`MediaCard.Title`, …).
- **Changing a component's root element, ARIA role, or controlled-state contract**, since consumers
  spread props onto that root and assert against those roles.

Adding a component, adding an optional prop, and adding a Tier 3 token are **minor**.

## [Unreleased]

### Changed — breaking

- **Components renamed to the words people use when they ask for them.** A prompt like "add a
  search bar" or "show a timeline" now matches an export by name, so an AI builder — or a person
  reading the index — picks the right part first time. Old names are **removed, not aliased**: the
  package has not been published to npm, so there is no released version to keep compatible with.
  Update imports, JSX and type names with this table. Sub-components keep their names
  (`CollectionCard.ItemList`, `ExpandableCard.Header`, …). Types and helpers follow their component
  (`AvatarProps`, `avatarSizeClasses`, `statCardBase`, `currencyAmountBase`), and the
  `BundleCard` data types became `CollectionItem`, `CollectionAlternative`, `CollectionBadge`,
  `CollectionAction`, `CollectionActionContext`, `CollectionMultiplier` and so on.

  | Old | New |
  |---|---|
  | `EntityAvatar` | `Avatar` |
  | `TimestampLabel` | `Timestamp` |
  | `SkeletonBlock` | `Skeleton` |
  | `ToastBanner / ToastBannerGroup` | `Toast / ToastGroup` |
  | `AddressTile` | `AddressCard` |
  | `PaymentMethodTile` | `PaymentMethodCard` |
  | `ValueTile` | `StatCard` |
  | `CheckList` | `FeatureList` |
  | `ProgressStep` | `StepIndicator` |
  | `SearchField` | `SearchBar` |
  | `SearchTrigger` | `SearchButton` |
  | `Amount` | `CurrencyAmount` |
  | `DetailList` | `KeyValueList` |
  | `ActionStrip` | `ButtonGroup` |
  | `SummaryPanel` | `ExpandableCard` |
  | `SelectionGroup` | `OptionGroup` |
  | `CardStrip` | `CardCarousel` |
  | `CardStack` | `StackedCards` |
  | `ChipToCard` | `ExpandableChips` |
  | `AuthPrompt` | `SignInPrompt` |
  | `AuthStatus` | `SignInStatus` |
  | `ReceiptSummary` | `Receipt` |
  | `CompareTable` | `ComparisonTable` |
  | `BundleCard` | `CollectionCard` |
  | `SlotPicker` | `TimeSlotPicker` |
  | `OfferListItem` | `MediaListItem` |
  | `AccountRow` | `AccountCard` |
  | `SavingsTimeline` | `Timeline` |
  | `OfferCalendar` | `WeekCalendar` |
  | `YearOverview` | `YearCalendar` |
  | `BookingBar` | `CheckoutBar` |
  | `DetailHero` | `DetailHeader` |

### Changed

- **Components scale to their container, not the screen.** Type, padding, gaps and icons used
  `md:` (screen ≥ 768px); they now use container queries — `@md:` (the box they sit in ≥ 448px).
  A card inside a 400px chat panel on a laptop used to take its desktop size; it now stays compact.
  `ChatWidget`, `ModalSheet` and `ApplePaySheet` declare the container for their own content.
  **Visible change for loose components:** with no `@container` ancestor they stay at the compact
  size on every screen. Add `@container` to the area that holds them. `ChatWidget` now also sets
  `w-full` on its root, since a container left to shrink-wrap collapses to 0 — pass a width class
  to override. Sheet frames (bottom sheet ↔ centred modal) still switch on the screen width.

- **Tier 2 surfaces now derive from Tier 1.** `--card`, `--popover`, `--secondary`, `--muted`,
  `--muted-foreground`, `--accent`, `--border`, `--input`, `--input-background`,
  `--switch-background`, `--ring` and the `--sidebar-*` tokens are mixed from `--background`,
  `--foreground` and `--primary` instead of holding fixed cool greys. A theme that sets only Tier 1
  now gets panels, borders and hover states in its own hue. Defaults look the same to within a
  step of lightness; dark-mode borders are now opaque rather than 10% white. Every token name is
  unchanged, and a theme that sets a Tier 2 token outright still wins.
  **Re-derivation needs a class starting with `theme-`** (or `ThemeProvider`). A brand class with
  another name still sets Tier 1, but its surfaces stay on the default palette.
- **`ThemeProvider` handles dark mode.** Tokens were inline styles, which beat `.dark`, so a brand's
  light colours stayed on in dark mode. Colours in `tokens` now apply in light mode only; the new
  `darkTokens` prop sets dark-mode colours. Radius, font, text, leading, tracking and spacing tokens
  apply in both. Dark mode is detected from the `dark` prop or any `.dark` ancestor. It now also
  takes a `ref` and forwards rest props to its wrapper.
  **Breaking for anyone passing colours to `ThemeProvider` in dark mode:** move them to `darkTokens`.

### Added

- **`--font-heading`** — a separate face for card titles, sheet headers and empty-state headings
  (`MediaCard.Title`, `BundleCard`, `ModalSheet`, `EmptyState`, `SummaryPanel`). Defaults to
  `--font-sans`, so nothing changes until it is set.
- **`--font-weight-semibold`** declared beside `-normal` and `-medium`, and the type and spacing
  variables Tailwind provides (`--text-*`, `--leading-*`, `--tracking-*`, `--spacing`) documented
  as overridable in `app/theme.css` and `lib/tokens.css`.

- **`ValueTile`** — a label over a large amount ("Value $200", "You pay $150"), in `default` or
  `highlight`, with an optional `badge` pill on the top edge ("Best value") and `orMore` for an
  estimated floor ("$300+"). Two side by side make a value-vs-price or monthly-vs-yearly pair.
  `tone="inverse"` for tiles on a `bg-primary` surface.
- **`StepList`** — numbered steps, each a title with an optional description, for "how it works"
  and "how to redeem" sections.
- **`CheckList`** — check-marked rows for "what's included" lists, with `tone="inverse"` for a
  `bg-primary` surface.
- **`PromoCard`** — a hero promotion on the brand colour: a photo fading into `--primary`, a title,
  a check list, an optional pair of `ValueTile`s and a call to action. Compound —
  `PromoCard.Media`, `.Body`, `.Title`, `.Features`, `.Pricing`, `.Action`.
- **`SegmentedControl`** — two to four options in a pill track, one selected, with a sliding
  highlight. A `radiogroup`: arrow keys move the selection. `iconOnly` keeps labels as
  `aria-label`s.
- **`Tabs`** — an underlined tab row with `Tabs.Panel` for the content. Arrow keys, Home and End
  move between tabs; a row too long for its container scrolls sideways. Each tab may carry a
  `chevron` at its start or end.
- **`ProgressBar`** — a label, a readable value ("$120 of $200") and a track whose fill slides to
  the new value. Exposes `role="progressbar"` with `aria-valuetext`.

- **`.theme-wireframe`** — a low-fidelity mode that ships with the package, for prototyping a flow
  before it has a brand. Put `className="theme-wireframe"` on a wrapper and the palette drops to
  greyscale, corners square, every shadow flattens and imagery fades back to grey; delete the class
  to see the same markup fully styled, or swap it for your own `.theme-{client}`. Add `dark`
  alongside it for the dark variant. No prop, import or component change.

  This is the **only** theme that overrides Tier 3 tokens — a wireframe with shadows is not a
  wireframe. It is not precedent: client themes still belong in Tier 1. Payment-network and Apple
  Pay brand marks stay in colour, since there the literal colour is the specification.

## [0.2.0] — 2026-08-02

First release published to npm. Everything before this was installed straight from the git
repository, so there is no upgrade path from those installs — pin the npm version instead.

### Added

- Three tier entry points — `@lizzie-teo/conjure-ui/primitives`, `/core`, `/layouts` — alongside
  the root export, so a consumer can pull one layer without the others.
- `./styles` and `./theme` export paths for `app/globals.css` and `app/theme.css`.
- `ThemeProvider` for setting brand tokens at runtime, as an alternative to a `.theme-{client}`
  class.
- 45 components across the three tiers, each with a `.stories.tsx` published to
  [lizzie-teo.github.io/conjure-ui](https://lizzie-teo.github.io/conjure-ui/).
- TypeScript declarations for every entry point, which is what lets AI builders read the component
  surface without the source.
- Every exported component and compound sub-component accepts a `ref` and spreads unrecognised
  props onto its root.

### Changed

- Tokens reorganised into three tiers (Brand / Semantic / System) in `app/theme.css`, following the
  shadcn/ui naming convention.
- `app/theme.css` ships with no `.theme-{client}` classes. The example client themes live in
  `.storybook/themes.css`, which is not published.

### Fixed

Three packaging faults, all found by the consumer smoke test the first time it ran. They never
reached npm — nothing was published before this release — but anyone who installed from the git
repository hit them.

- **Components rendered unstyled.** Tailwind does not scan `node_modules`, so importing
  `@lizzie-teo/conjure-ui/styles` delivered the design tokens and none of the utility classes the
  library's own markup uses. `app/globals.css` now carries `@source "../dist/**/*.js"`.
- **`dist` was not declared as ESM.** The build emits ESM, but with no `type` field Node read
  `dist/*.js` as CommonJS — imports worked only through Node 22's syntax detection and threw on
  Node 20. The build now writes `dist/package.json` as `{"type":"module"}`.
- **Type declarations did not resolve under `node16`/`nodenext`.** The source is written for
  `moduleResolution: "bundler"` and tsc emits extensionless relative paths verbatim, so every
  `.d.ts` failed with TS2834/TS2835. The build now rewrites those specifiers with explicit
  extensions.

### Removed

- The Next.js marketing site under `app/`. The package now ships only the two stylesheets.
- The Figma Make white-label guide. Brand setup is documented for AI builders in the README and
  `.docs/for-designers/ai-builder-white-label-setup.md`.

### Notes for consumers

- **The package is ESM-only.** `require()` fails by design, and TypeScript's legacy `node10`
  resolution is unsupported. Use `bundler`, `node16`, or `nodenext`.
- **The library loads no webfont.** `--font-sans` falls back to the system stack; load your brand
  face yourself and override that one token.
- **Payment network logos are not bundled.** Source official assets from each network's brand portal
  into `public/payment-logos/` — see `components/primitives/payment-logos/README.md`.

[Unreleased]: https://github.com/lizzie-teo/conjure-ui/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/lizzie-teo/conjure-ui/releases/tag/v0.2.0
</content>
