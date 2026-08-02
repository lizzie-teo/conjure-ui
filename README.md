# @lizzie-teo/conjure-ui

White-label AI chat components for React — 45 components across three tiers, built so a client
rebrand is a token edit rather than a fork.

**[Browse every component →](https://lizzie-teo.github.io/conjure-ui/)** · [Case study](https://lizzieteo.com/work/conjure-ui) · [npm](https://www.npmjs.com/package/@lizzie-teo/conjure-ui)

## Install

```bash
npm install @lizzie-teo/conjure-ui
```

React 19 is a peer dependency. The only runtime dependencies are
`class-variance-authority`, `clsx`, `lucide-react`, `motion`, and `tailwind-merge`.

## Use

Import the stylesheet once, then the components you need:

```tsx
import '@lizzie-teo/conjure-ui/styles'
import { MessageBubble } from '@lizzie-teo/conjure-ui/core'
import { StatusBadge } from '@lizzie-teo/conjure-ui/primitives'
import { ChatWidget } from '@lizzie-teo/conjure-ui/layouts'
```

Everything is also available from the root entry point (`@lizzie-teo/conjure-ui`); the tier
entry points exist so you can pull in one layer without the others.

## Theming

No component holds a colour. Every design value is a CSS custom property, so applying a brand
means overriding tokens — never editing component source.

Tokens come in three tiers, documented in `app/theme.css`:

| Tier | What it holds | Override? |
| --- | --- | --- |
| 1. Brand | Typeface, primary pair, background pair, radius | **Yes** — this is what rebrands the library |
| 2. Semantic | Surfaces derived from the brand palette | Only when the brand demands it |
| 3. System | Shadows, Apple Pay, charts, layout internals | No |

A full rebrand touches **six Tier 1 tokens**: `--font-sans`, `--background`, `--foreground`,
`--primary`, `--primary-foreground`, `--radius`.

```css
.theme-acme {
  --font-sans: 'Acme Grotesk', ui-sans-serif, system-ui, sans-serif;
  --background: oklch(0.98 0.01 250);
  --foreground: oklch(0.15 0.02 260);
  --primary: oklch(0.55 0.19 255);
  --primary-foreground: oklch(0.99 0 0);
  --radius: 0.5rem;
}
```

Apply the class anywhere above your components, or use `<ThemeProvider tokens={…}>` to set the same
variables at runtime.

Token names follow the shadcn/ui convention, which is deliberate: a theme authored against that
vocabulary drops in with no renaming, and the names are already familiar to anyone who has themed a
shadcn project. It is also the vocabulary AI builders already generate.

> **Define your theme class in your own stylesheet, not in `node_modules`.** `app/theme.css` ships
> inside the package — anything you add to it there is wiped by the next `npm install`. The
> upgrade-safe surfaces are a `.theme-{client}` class in your own CSS, or `<ThemeProvider>`.

## Building with an AI builder

The package is meant to be handed to a coding agent — Claude Code, Codex, Replit, Lovable — and
branded in one pass. It ships TypeScript declarations for every entry point, which is what lets
those tools read the component surface without ever seeing the source.

Paste this in, with your client's brand colours:

```text
Add the @lizzie-teo/conjure-ui component library to this project and brand it for [CLIENT].

1. npm install @lizzie-teo/conjure-ui
2. Import '@lizzie-teo/conjure-ui/styles' once at the app entry point.
3. Read the type declarations in node_modules/@lizzie-teo/conjure-ui/dist to see
   what components exist. Import from /primitives, /core, or /layouts.
4. Create a .theme-[client] class in THIS project's own stylesheet — never edit
   any file inside node_modules. Override only these six tokens:
     --font-sans, --background, --foreground, --primary, --primary-foreground, --radius
   Use oklch() values, derived from the client's brand colours below.
5. Put className="theme-[client]" on the outermost element of the app.

Rules: every colour, radius and shadow in this library is a CSS custom property.
Do not add hex values or Tailwind colour utilities to any component. Do not remove
`motion` imports — components animate through them and break without them.

Client brand colours:
[paste them here]
```

[`.docs/for-designers/ai-builder-white-label-setup.md`](./.docs/for-designers/ai-builder-white-label-setup.md)
covers the rest: pulling a client's palette off their live site, mapping it onto the full semantic
token set, and the notes specific to each tool — including the surfaces that cannot install from npm
at all, like Claude Artifacts and Paper.

## Staying up to date

Every release is tagged, published to npm, and written up in [`CHANGELOG.md`](./CHANGELOG.md) —
which also ships inside the package, so an agent can read what changed from `node_modules` without
leaving the project.

```bash
npm outdated @lizzie-teo/conjure-ui   # is there a newer version?
npm install @lizzie-teo/conjure-ui@latest
```

To be told rather than to check:

- **[Watch the repo](https://github.com/lizzie-teo/conjure-ui/subscription) → Custom → Releases.**
  Every published version creates a GitHub Release, so this emails you the changelog entry.
- **Enable Dependabot or Renovate.** The bump then arrives as a pull request in your own repository,
  which is how most teams actually find out.

  ```yaml
  # .github/dependabot.yml
  version: 2
  updates:
    - package-ecosystem: npm
      directory: /
      schedule:
        interval: weekly
  ```

Pre-1.0, the **minor** version carries breaking changes — `0.2.x` → `0.3.0` may rename tokens or
components. `CHANGELOG.md` opens with what counts as breaking here; the short version is that a
renamed CSS token is breaking even though nothing throws, because your brand silently falls back
instead of erroring.

## Development

```bash
npm run storybook    # primary dev environment (port 6006)
npm run dev          # Vite demo harness — fast component preview
npm test             # renders every story + runs interaction tests
npm run typecheck
npm run lint
npm run build        # library build → dist/
```

Storybook is the contract: every component has a `.stories.tsx`, and `npm test` renders all of them
in a real Chromium. See `CLAUDE.md` for architecture, tier rules, and the Figma sync workflow.

## Payment logos

Payment network logos are **not bundled** — source official brand assets from each network's brand
portal and place them in `public/payment-logos/`. See
`components/primitives/payment-logos/README.md` for the required paths and download links.

## License

MIT © 2026 Lizzie Teo
