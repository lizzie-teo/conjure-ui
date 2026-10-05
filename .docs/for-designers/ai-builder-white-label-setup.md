# White-labelling a client with an AI builder

Take the library, pull a client's brand off their live site, and have an AI remap the tokens —
without editing a single component file.

The library is white-label by construction: every colour, radius and shadow is a CSS custom
property, so a rebrand is a token override. Nothing below asks you to fork or patch a component.

---

## Two ways in, depending on the tool

| | Tools | How the library gets there |
| --- | --- | --- |
| **Installs from npm** | Claude Code, Codex, Replit, Lovable, Cursor, any agent working in a real repo | `npm install @lizzie-teo/conjure-ui` — the real package, upgradeable |
| **Cannot install from npm** | Claude Artifacts, Paper, most in-browser design canvases | Copy the tokens and the component source you need; there is no upgrade path |

Take the npm path wherever it is available. It is the only one where a published fix reaches the
project later.

---

## Step 01 — Install and wire it up

Paste this into the agent. Replace `[CLIENT]`, and leave the brand colours blank for now — Step 03
fills them in.

```text
Add the @lizzie-teo/conjure-ui component library to this project and brand it for [CLIENT].

1. npm install @lizzie-teo/conjure-ui
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
naming. Map this client's brand colours onto the correct semantic token names.

The library's tokens are:
  --background         page/app background
  --foreground         primary text on background
  --card               card surface
  --card-foreground    text on card
  --primary            main brand colour — buttons, links, active states
  --primary-foreground text on primary
  --secondary          secondary actions, subtle highlights
  --secondary-foreground
  --muted              disabled states, placeholders, subtle backgrounds
  --muted-foreground   secondary/subdued text
  --accent             hover states, selected items
  --accent-foreground
  --destructive        errors, warnings, delete actions
  --destructive-foreground
  --border             dividers, input borders
  --input              input field background
  --ring               focus ring colour
  --radius             corner radius, e.g. 0.5rem

Client colours:
[PASTE STEP 02 HERE]

Output one CSS class block, `.theme-[clientname]` in lowercase kebab-case, listing
every token above. Use oklch() throughout for perceptual consistency.

Where a token cannot be inferred, derive something that respects the palette rather
than falling back to grey — e.g. --muted as the primary hue at very low chroma,
--ring as --primary. Then check every foreground/background pair you produce meets
WCAG AA (4.5:1 for body text, 3:1 for large text and UI borders) and tell me which
pairs you had to adjust to get there.
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

Only six of those tokens do the heavy lifting — `--font-sans`, `--background`, `--foreground`,
`--primary`, `--primary-foreground`, `--radius`. If you are moving fast, override those and let the
rest derive.

**Fonts.** The library deliberately loads no webfont, so `--font-sans` falls back to the system
stack until you point it at the client's face. Load that font in your own app the way you normally
would, then override the one token.

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

**Colours changed but something is still grey.**
A token was renamed or missed. Inspect the element, find which custom property is resolving to its
fallback, and add it to the theme class.

**Animations are missing.**
`motion` must be installed and its imports intact. Agents sometimes strip them while "cleaning up"
unused imports.

**Upgrading wiped the theme.**
The theme class was written into `node_modules/@lizzie-teo/conjure-ui/app/theme.css`. Move it into
the project's own stylesheet — see Step 04.

---

## Token quick reference

| Token | What it controls |
| --- | --- |
| `--primary` | Buttons, active state, links |
| `--background` | App background |
| `--card` | Message bubbles, cards, panels |
| `--muted` | Placeholder text, disabled states |
| `--border` | Input borders, dividers |
| `--radius` | Corner rounding on all components |
| `--destructive` | Error states, delete confirmations |
| `--ring` | Keyboard focus outline |
| `--font-sans` | Every piece of type in the library |

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
