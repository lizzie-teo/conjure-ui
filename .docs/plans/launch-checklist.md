# Launch checklist

What is left to make Conjure UI publicly reachable — the package on npm, the Storybook on GitHub
Pages, and the case study on the portfolio. State verified 2026-08-02.

**The repo itself is finished.** The site is retired, Figma Make is gone, the package is fixed and
verified against a real consumer install, and the Pages and release workflows are written, committed
and pushed. Everything below is either a credential, a settings toggle, or work in a different repo
— which is why none of it can be done from here.

| # | What | Blocked on | Blocks |
| --- | --- | --- | --- |
| 1 | Publish 0.2.0 to npm | `NPM_TOKEN` secret | README install instructions being true |
| 2 | Enable GitHub Pages | one API call or a Settings toggle | the Storybook being reachable at all |
| 3 | Chromatic token | `CHROMATIC_PROJECT_TOKEN` secret | nothing — it gates no other workflow |
| 4 | Custom domain | the Squarespace → Namecheap transfer | nothing; `github.io` works meanwhile |
| 5 | Case study | nothing — it is just unwritten | the portfolio link in the README |

1 and 2 are independent of each other and of everything else. Do them in either order.

---

## 1. Publish 0.2.0 to npm

`npm view @lizzie-teo/conjure-ui` currently 404s. The package has never been published, so the
install instructions and the npm link in `README.md` describe something that does not exist yet.

`.github/workflows/release.yml` does the whole job on a version tag; it only needs the token.

```bash
gh secret set NPM_TOKEN                              # npm automation token, publish rights
npm version 0.2.0 --allow-same-version -m "Release v%s"
git push --follow-tags                               # pushing the tag is what ships
```

**Use `0.2.0`, not `npm version patch`.** `package.json` is already at 0.2.0 and `CHANGELOG.md`
documents that version. A `patch` bump would produce 0.2.1, which has no changelog heading — the
release would still publish, but its GitHub Release body would read "No CHANGELOG entry for 0.2.1".
Version, tag and changelog heading have to agree. `--allow-same-version` is what lets `npm version`
tag the version already in the file rather than bumping past it.

Let `npm version` create the tag rather than tagging by hand — the workflow refuses to run if the
tag disagrees with `package.json`.

What the tag sets off, in order: version check → `npm ci` → typecheck → lint → story suite in
Chromium → clean rebuild → entry-point check → **consumer smoke test** → publish → GitHub Release.
The smoke test is the last gate and the only one that judges the artifact rather than the repo; it
packs the tarball, installs it in a throwaway project outside the checkout, and imports it as a
stranger would.

`publishConfig` is `{"access":"public","provenance":true}`. Public because a scoped package
otherwise defaults to restricted and 402s on first publish; provenance because it links the tarball
back to the commit that built it. **Provenance also means a local `npm publish` will fail** — it
needs the `id-token: write` permission only CI has. That is deliberate. If you ever need to publish
from your laptop, drop that one line first.

**Verify:**

```bash
npm view @lizzie-teo/conjure-ui version              # returns 0.2.0
gh release view v0.2.0                               # body is the CHANGELOG section
```

---

## 2. Enable GitHub Pages

`.github/workflows/pages.yml` runs on every push to `main` and has been failing at `configure-pages`
since it was added:

```
Get Pages site failed. Please verify that the repository has Pages enabled
and configured to build using GitHub Actions
```

**Fix, from the CLI:**

```bash
gh api -X POST repos/lizzie-teo/conjure-ui/pages -f build_type=workflow
gh workflow run pages.yml          # or just push anything
```

Or repo → Settings → Pages → Source: **GitHub Actions**.

**`enablement: true` is not a way around this — tried on 2 Aug, reverted.**
`actions/configure-pages@v5` does take that input, but creating a Pages site needs admin rights that
`GITHUB_TOKEN` does not have and that workflow `permissions:` cannot grant. It fails with
`Resource not accessible by integration`, which is a worse error than the plain "verify that the
repository has Pages enabled" it replaces, because it hides what to actually do. Self-enabling would
mean storing a PAT for a step that runs once in the repo's life. `pages.yml` carries a comment
saying so.

**Verify:** `gh api repos/lizzie-teo/conjure-ui/pages` returns JSON instead of a 404, the Deploy
Storybook run goes green, and <https://lizzie-teo.github.io/conjure-ui/> loads with a deep link
(`?path=/story/...`) surviving a hard refresh.

---

## 3. Chromatic project token

Unrelated to any of this work — Chromatic has been failing since 26 July with `✖ Missing project
token`. `gh secret list` shows no secrets on the repo at all.

```bash
gh secret set CHROMATIC_PROJECT_TOKEN   # from the Chromatic project's Manage screen
```

Lowest stakes on the list. Chromatic gates nothing: CI, Pages and Release all run independently of
it, and a visual diff does not block a deploy.

---

## 4. The custom domain — parked

**Status: parked on 2 Aug.** `lizzieteo.com` was bought through Squarespace and is being transferred
to Namecheap. No DNS record is going into Squarespace in the meantime, so `ui.lizzieteo.com` waits
for the transfer to complete.

Nothing else waits on it. Pages serves at `lizzie-teo.github.io/conjure-ui/`, and Storybook works
there unchanged — `build-storybook` emits relative asset paths (`./assets/…`), so a project subpath
needs no `base` config. The earlier note claiming the domain root was *why* no base path was needed
had the causation backwards.

What was changed to park it:

- **`public/CNAME` is deleted, and with it the `public/` folder. This is the load-bearing part.**
  Publishing that file before the DNS record exists makes Pages claim `ui.lizzieteo.com` and 301 the
  working `github.io` URL to a domain that does not resolve — the site goes down rather than moving.
  Removing the `../public` entry from `staticDirs` was **not** enough on its own: Vite's default
  `publicDir` copies `public/` regardless, so the file kept shipping. That staticDirs entry was
  redundant all along and is gone too.
- `README.md`, `CHANGELOG.md`, `package.json` `homepage`, `CLAUDE.md` and the designer guide all
  point at the `github.io` URL.

**Those links do not need changing back.** GitHub 301s the `github.io` URL to the custom domain once
one is set, so everything written now keeps working. That matters for `README.md` especially, which
is the npm landing page and is frozen at publish time for every released version — 0.2.0's README
can never be edited after the fact.

### When the transfer has completed

1. At Namecheap, add: `CNAME` · host `ui` · value `lizzie-teo.github.io`.
2. Recreate `public/CNAME` containing exactly `ui.lizzieteo.com`, and push. No config change —
   Vite's `publicDir` picks it up.
3. Repo → Settings → Pages → Custom domain → `ui.lizzieteo.com`. Tick **Enforce HTTPS** once the
   certificate provisions (usually minutes, occasionally an hour).

```bash
dig +short ui.lizzieteo.com
curl -sI https://ui.lizzieteo.com | head -3
curl -sI https://lizzie-teo.github.io/conjure-ui/ | head -3   # should now 301
```

Then open a deep link (`?path=/story/...`) and hard-refresh it.

Optional afterwards: switch the docs back to `ui.lizzieteo.com` for the nicer URL. Purely cosmetic —
the redirect means nothing breaks either way, and the published 0.2.0 README will keep pointing at
`github.io` regardless.

---

## 5. The case study, in the portfolio repo

Do this in a session rooted at `~/Development/portfolio`, so that repo's `CLAUDE.md`,
`.docs/style-rules.md`, `.docs/token-playbook.md`, and its `fd` / `design-crit` / `writer` agents
apply. Nothing has been written there.

Two files:

- `src/app/work/projects.ts` — one `kind: "case-study"` entry, placed **after** the four client
  studies so the grid reads as client work first, then the systems underneath it, then writing.
- `src/app/work/conjure-ui/page.tsx` — patterned on `macquarie-radar/page.tsx`
  (`caseStudyMetadata(slug)` + `CaseStudyShell` + `CaseStudyRail` + `Chapter` / `Tile` /
  `MotionReveal`).

### Verified about that repo, so it doesn't need rediscovering

- **No cover image is needed.** `WorkGallery` renders `LoFiProjectCard`, which is typographic and
  never reads `media`. The `WorkCoverId` / `ProjectCover` path belongs to the older `ProjectCard`.
- **Omitting `industry` is explicitly supported.** The filter list is built with
  `(e.industry ? [e.industry] : [])`, and `IndustryGlyph` falls through to `FallbackGlyph` when it
  is undefined, so the card gets a generic mark rather than a hole. Omit it — the field means "the
  sector a client operated in", and this has four verticals and no client. Use
  `tags: ["Design systems", "Design engineering"]`. `LoFiProjectCard`'s own header notes that
  `outcome`, `role`, and `year` each omit themselves cleanly too.
- **`kind: "case-study"` needs no union or guard change.** `check-case-studies.mjs` only requires a
  page folder that routes through `CaseStudyShell` and `caseStudyMetadata`.
- **The grid has room** — its comment says it is sized for six projects, three across at `xl`.
- **Project colour** comes from a `[data-project-theme="conjure-ui"]` block in `theme.css`, stamped
  by `CaseStudyShell`. Without one, `--leaf-highlight` falls back to `--leaf-foreground`, so
  `text-leaf-highlight` emphasis reads bold rather than tinted. Adding a block is a design decision,
  not a blocker.
- **That repo had uncommitted work in flight** as of 2 Aug — `FeatureItem.tsx` untracked with
  `WorkGallery` already importing it, plus edits to `projects.ts`, `IndustryGlyph.tsx`,
  `ProjectCard.tsx`, `page.tsx`, and `style-rules.md`. Read the working tree before editing.

### Two numbers to write it with, both verified here

- **45 components** — 17 primitives + 25 core + 3 layouts, counted as folders holding a matching
  `ComponentName.tsx`. The retired marketing site's "37" was stale; don't reuse it.
- **6 Tier 1 tokens** — `--font-sans`, `--background`, `--foreground`, `--primary`,
  `--primary-foreground`, `--radius`. This matches `theme.css`'s own "these ~6 tokens define a
  brand", so an outcome of `{ value: "6 tokens", label: "What a full client rebrand touches" }` is
  sourced rather than asserted.

### On the narrative

Keep it **decision-led, not discovery-led**. There is no client, no research round, no usability
study — so don't manufacture one. The centre of the case study is the rebrand surface: no component
holds a colour, so a full client rebrand touches six tokens and zero component files. Show the rule
*and the thing that enforces it* — the "no hardcoded styles" rule with its one narrow carve-out for
third-party brand marks, `scripts/tap-audit.js` enforcing hit area as its own axis, and a CI gate
that fails on a single lint warning.

The earlier draft of that chapter was built on Figma Make compatibility. That is gone; the shadcn
naming convention survives on its own terms.

Link the Storybook as `lizzie-teo.github.io/conjure-ui` unless the domain has landed by then.

---

## 6. Decided — do not reopen without a reason

**`app/api/chat/route.ts` stays.** It is the last thing under `app/` that is not shipped CSS, and
nothing in `demo/` or Storybook calls it. Deleting it looks like it would remove the Next.js surface
from the repo. **It would not.** `next` is a hard peer dependency of `@storybook/nextjs-vite`, the
Storybook framework this repo runs on, and `eslint.config.mjs` is built on `eslint-config-next/core-web-vitals`
and `/typescript` — the whole lint ruleset. Next stays either way. Deleting the route would buy one
devDependency (`@anthropic-ai/sdk`) and three unused scripts, at the cost of a working local chat
endpoint. Dropping Next properly means switching Storybook to `@storybook/react-vite` and rewriting
the lint config — a project, not a cleanup.

**Stale docs in `.docs/plans/` — cleared.** Eight plan docs were deleted: `prompt-figma-make` and
`playbook-site.md` (Figma Make and the retired site), plus six whose subject components were pruned
and no longer exist — `ingredient-shop-list.md`, `recipe-card.md`, `makeup-shopping-journey.md`,
`iga-butter-chicken-journey.md`, `provider-comparison-bloom.md`, `provider-comparison-bubbles.md`.
The rule used: delete a plan doc when the component it plans is gone. `ecommerce-journey-components.md`
and `insurance-comparison-chat-ui.md` were kept — every component the first one plans still exists,
and the second is design reasoning not tied to a deleted component. All recoverable from git history.

`public/` also lost the five stock `create-next-app` SVGs (`file`, `globe`, `next`, `vercel`,
`window`), which were referenced nowhere and were being copied into the published Storybook. The
folder is now gone entirely — see section 4.

**`README.md` links ahead of reality.** It points at the Storybook, the npm package, and
`lizzieteo.com/work/conjure-ui`. All three are correct destinations; none resolve yet. They start
working as sections 1, 2 and 5 land.
