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
  [ui.lizzieteo.com](https://ui.lizzieteo.com).
- TypeScript declarations for every entry point, which is what lets AI builders read the component
  surface without the source.
- Every exported component and compound sub-component accepts a `ref` and spreads unrecognised
  props onto its root.

### Changed

- Tokens reorganised into three tiers (Brand / Semantic / System) in `app/theme.css`, following the
  shadcn/ui naming convention.
- `app/theme.css` ships with no `.theme-{client}` classes. The example client themes live in
  `.storybook/themes.css`, which is not published.

### Removed

- The Next.js marketing site under `app/`. The package now ships only the two stylesheets.
- The Figma Make white-label guide. Brand setup is documented for AI builders in the README and
  `.docs/for-designers/ai-builder-white-label-setup.md`.

### Notes for consumers

- **The library loads no webfont.** `--font-sans` falls back to the system stack; load your brand
  face yourself and override that one token.
- **Payment network logos are not bundled.** Source official assets from each network's brand portal
  into `public/payment-logos/` — see `components/primitives/payment-logos/README.md`.

[Unreleased]: https://github.com/lizzie-teo/conjure-ui/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/lizzie-teo/conjure-ui/releases/tag/v0.2.0
</content>
