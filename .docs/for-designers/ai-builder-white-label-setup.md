# White-labelling a client with an AI builder

Take the library, pull a client's brand off their live site, and have an AI remap the tokens —
without editing a single component file.

The library is white-label by construction: every colour, radius and shadow is a CSS custom
property, so a rebrand is a token override. Nothing below asks you to fork or patch a component.

---

## Two ways in, depending on the tool

| | Tools | How the library gets there |
| --- | --- | --- |
| **Can install packages** | Claude Code, Codex, Replit, Lovable, Cursor, any agent working in a real repo | `npm install github:lizzie-teo/conjure-ui` — the real package, upgradeable |
| **Cannot install packages** | Claude Design, Claude Artifacts, Paper, most in-browser design canvases | Copy the tokens and the component source you need; there is no upgrade path |

Take the install path wherever it is available. The package is not on the npm registry yet, so it
installs from GitHub; you still import it as `@lizzie-teo/conjure-ui`. It is the only one where a published fix reaches the
project later.

---

## Step 01 — Install and wire it up

Paste this into the agent. Replace `[CLIENT]`, and leave the brand colours blank for now — Step 03
fills them in.

```text
Add the @lizzie-teo/conjure-ui component library to this project and brand it for [CLIENT].

1. npm install github:lizzie-teo/conjure-ui
2. Import '@lizzie-teo/conjure-ui/styles' once at the app entry point. That file
   pulls in the design tokens; without it every component renders unstyled.
3. Read the type declarations in node_modules/@lizzie-teo/conjure-ui/dist to see
   what components exist and what props they take. There are four entry points:
     @lizzie-teo/conjure-ui             everything
     @lizzie-teo/conjure-ui/primitives  atoms — StatusBadge, PriceDisplay, …
     @lizzie-teo/conjure-ui/core        compound components — MessageBubble, MediaCard, …
     @lizzie-teo/conjure-ui/layouts     skeletons with named slots — ChatWidget, ModalSheet, …
4. Create a .theme-[client] class in THIS project's own stylesheet. Never edit any
   file inside node_modules — npm install overwrites it.
5. Put className="theme-[client]" on the outermost element of the app.

Rules:
- Every colour, radius and shadow is a CSS custom property. Do not add hex values
  or Tailwind colour utilities to any component.
- Do not remove `motion` imports. Components animate through the `motion` package
  (v12, imported as `motion/react`) and break without it.
- React 19 is a peer dependency.
```

**Lovable specifically** can wrap this as an npm-backed design system: point it at the package name
and it reads the component catalogue straight from the published `.d.ts` files, keeping only a thin
wrapper layer in `src/`. That is worth doing — it means Lovable knows the real prop surface rather
than guessing from examples.

---

## Step 02 — Pull the client's brand off their site

You need real values before an AI can map anything. Two ways.

### A. DevTools computed styles (fastest)

1. Open the client's live site in Chrome or Safari, then DevTools → Elements.
2. Select `<html>` or `<body>` and read the Computed panel for any `--` custom properties. Modern
   sites define their whole palette there. Copy everything.
3. Whether or not they use custom properties, note by eye: primary brand colour, page background,
   body text, button fill and label, border colour, and corner radius.

### B. Read their stylesheet

1. DevTools → Network, filter to CSS, open the main stylesheet.
2. Search for `:root {` or `--color`. Copy that block.

Screenshots are a poor substitute — JPEG artefacts shift hues enough to matter — but if that is all
you have, sample with a colour picker rather than eyeballing hex codes.

---

## Step 03 — Map the palette onto semantic tokens

Brand palettes are named for colours (`brand-blue`, `sand-100`). The library is named for roles
(`--primary`, `--muted`). Something has to do the translation, and it is a genuinely judgement-heavy
job — which is what an AI is good at.

Paste this into Claude, or into the builder itself:

```text
I have a white-label React component library using shadcn/ui's semantic CSS variable
naming. Map this client's brand onto its tokens.

TIER 1 — always set these, in a light AND a dark version:
  --background          page/app background — tint it toward the brand hue
  --foreground          primary text on background
  --primary             main brand colour — buttons, links, active states
  --primary-foreground  text on primary
Set once (same in both modes):
  --radius              corner radius, e.g. 0.5rem
  --font-sans           body typeface stack
  --font-heading        titles typeface stack — only if it differs from --font-sans

TIER 2 — the library DERIVES these from Tier 1. Only set one if the brand has a
specific value for it that the derivation would miss:
  --card, --popover                card and popover surfaces
  --secondary                      secondary actions, subtle highlights
  --muted, --muted-foreground      placeholders, disabled states, secondary text
  --accent                         hover states, selected items
  --border, --input                dividers, input outlines
  --input-background               input field fill
  --switch-background              switch track
  --ring                           focus ring colour
  --sidebar, --sidebar-*           sidebar surfaces
Every *-foreground token is the text colour on its matching surface.

STATUS — fixed by the library. Change only if the brand defines its own:
  --destructive   errors and delete actions
  --warning       low stock, caution
  --success       confirmed, in stock
  (each has a -foreground)

TYPE — optional, only if the brand has its own type scale:
  --font-weight-medium, --font-weight-semibold   default 500 / 600
  --text-sm, --text-base, --text-lg, --text-xl, --text-2xl (with --text-*--line-height)

Client brand:
[PASTE STEP 02 HERE]

Output two CSS blocks, using oklch() throughout:
  .theme-[clientname] { … }                         light mode, plus radius and fonts
  .dark .theme-[clientname], .dark.theme-[clientname] { … }   dark-mode colours only
The class name must start with "theme-" — the library re-derives Tier 2 on that
class and nowhere else.

Then check every foreground/background pair meets WCAG AA (4.5:1 for body text,
3:1 for large text and UI borders) in BOTH modes, and tell me which pairs you had
to adjust. --muted-foreground on --background is the pair most likely to fail.
```

That last paragraph matters. An AI will happily hand you a brand-accurate palette that fails
contrast, and the failure shows up as an accessibility bug months later rather than as something
obviously wrong on screen.

---

## Step 04 — Apply it

```text
Add this theme class to the project's own stylesheet — not to anything in node_modules —
after the existing styles, then set className="theme-[clientname]" on the outermost
element of the app:

[PASTE CSS BLOCK HERE]

Do not modify any :root block that came from the library. The class overriding the
tokens is the entire mechanism; no component should need editing.
```

Only six tokens do the heavy lifting — `--font-sans`, `--background`, `--foreground`,
`--primary`, `--primary-foreground`, `--radius`. Set those and the rest follows: cards, muted
panels, borders, hover states and the focus ring are all mixed from them, so a warm cream
background gives warm cream panels.

**Dark mode needs its own colours.** A `.theme-[client]` block on its own keeps its light colours
when the app switches to dark. Add the second block from Step 03 — four colours are enough, the
rest derives in dark mode too.

**The class name must start with `theme-`.** That is where the library re-derives the surfaces.
A class called `.acme-brand` changes `--primary` but leaves the panels on the default grey.

**Setting tokens at runtime instead?** Use `ThemeProvider`. Its `tokens` colours apply in light
mode and `darkTokens` in dark; radius and font tokens apply in both:

```tsx
<ThemeProvider
  tokens={{ '--primary': 'oklch(0.45 0.12 45)', '--radius': '0.5rem' }}
  darkTokens={{ '--primary': 'oklch(0.75 0.12 60)' }}
>
  {/* the app */}
</ThemeProvider>
```

**Fonts.** The library deliberately loads no webfont, so `--font-sans` falls back to the system
stack until you point it at the client's face. Load that font in your own app the way you normally
would, then override the token. If the brand uses a second face for titles, set `--font-heading`
as well; it covers card titles, sheet headers and empty-state headings.

**Type scale.** Text sizes, weights and spacing are Tailwind's CSS variables (`--text-sm`,
`--font-weight-semibold`, `--spacing`), so a theme class can override them too. Most brands do not
need to. Change `--spacing` with care: every padding and gap in the library is a multiple of it.

---

## Tools that cannot install from npm

Claude Artifacts, Paper, and most in-browser canvases run under a strict content security policy —
no external requests, so no npm package and no CDN. What still transfers:

- **The tokens.** They are plain CSS custom properties. The `.theme-{client}` block from Step 03
  works anywhere, and the whole design language travels with it.
- **The component source**, pasted in. Every component is dependency-light — `clsx`,
  `tailwind-merge`, `class-variance-authority`, `lucide-react`, `motion`. Where `motion` is not
  available, the components still render; you lose the animation, not the layout.
- **[lizzie-teo.github.io/conjure-ui](https://lizzie-teo.github.io/conjure-ui/)** as the visual
  reference — every component, every variant, in light and dark.

Understand what you give up: a copy is a fork. Nothing published later reaches it.

---

## Troubleshooting

**Everything renders unstyled / all white.**
`@lizzie-teo/conjure-ui/styles` was not imported, or was imported after a stylesheet that resets it.
It must be imported once, at the app entry point.

**The theme class has no effect.**
Class names are case-sensitive and must match exactly — `theme-acme` on the element, `.theme-acme`
in CSS. Check the class is on an element that actually wraps the components; a sibling will not do.

**Colours changed but the panels are still cool grey.**
The theme class name does not start with `theme-`, so the surfaces were not re-derived. Rename it.
If the name is right, inspect the element and check which custom property still holds the default.

**Dark mode shows the light brand colours.**
The dark block is missing. Add `.dark .theme-[client], .dark.theme-[client] { … }` (Step 03), or
pass `darkTokens` to `ThemeProvider`.

**Components look small on a wide page.**
They scale to the box they sit in, not the screen. Add `@container` to the element that wraps
them (`<main className="@container">`). Inside `ChatWidget` and `ModalSheet` this is already done.
The container needs a real width — on a shrink-to-fit element (a flex item with no width, `w-fit`)
it collapses to 0.

**Animations are missing.**
`motion` must be installed and its imports intact. Agents sometimes strip them while "cleaning up"
unused imports.

**Upgrading wiped the theme.**
The theme class was written into `node_modules/@lizzie-teo/conjure-ui/app/theme.css`. Move it into
the project's own stylesheet — see Step 04.

---

## Token quick reference

| Token | What it controls | Set it? |
| --- | --- | --- |
| `--background` | App background; every surface is mixed from it | Yes, light and dark |
| `--foreground` | Body text | Yes, light and dark |
| `--primary` | Buttons, active state, links | Yes, light and dark |
| `--primary-foreground` | Text on primary | Yes, light and dark |
| `--radius` | Corner rounding on all components | Yes |
| `--font-sans` | Every piece of type | Yes, once you load the face |
| `--font-heading` | Card titles, sheet headers | Only if titles use a second face |
| `--card`, `--muted`, `--accent`, `--border`, `--ring` | Panels, hover, dividers, focus | No — derived |
| `--destructive`, `--warning`, `--success` | Error, caution, confirmed | Only if the brand defines them |

---

## Before you have a brand

If the flow still needs to be agreed before anyone picks a colour, the library ships a
low-fidelity mode. Put `theme-wireframe` on a wrapper:

```tsx
<div className="theme-wireframe">
  {/* the flow */}
</div>
```

Everything drops to grey boxes — no colour, square corners, no shadows, imagery faded back. Build
and review the structure there, then delete the class, or replace it with the `.theme-{client}`
from Step 04, and the same screens come back fully branded. Nothing else changes.

This is the one theme that ships in the package, so it is safe to rely on — unlike anything you
add to `theme.css` yourself, which the next `npm install` overwrites.

---

## Licence

MIT © 2026 Lizzie Teo. Free to use, copy, modify and distribute in client work. Keep the MIT notice
in any distributed build.
