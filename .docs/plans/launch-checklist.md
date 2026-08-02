# Launch checklist

What is left to make Conjure UI publicly reachable — the Storybook at `ui.lizzieteo.com`, the
package on npm, and the case study on the portfolio. State verified 2026-08-02.

Everything in the repo is done: the site is retired, Figma Make is gone, the Pages workflow and the
release pipeline are written and committed. What remains is almost entirely **settings and DNS**,
which is why none of it could be done from the repo.

---

## 1. Blocking — two workflows are failing right now

### Enable GitHub Pages

`.github/workflows/pages.yml` runs on every push to `main` and fails at the `configure-pages` step:

```
Get Pages site failed. Please verify that the repository has Pages enabled
and configured to build using GitHub Actions
```

**Fix:** repo → Settings → Pages → Source: **GitHub Actions**. Then re-run the workflow
(`gh run rerun <id>`, or push anything).

Or from the CLI, without opening Settings at all:

```bash
gh api -X POST repos/lizzie-teo/conjure-ui/pages -f build_type=workflow
```

**`enablement: true` is not a way around this — tried on 2 Aug, reverted.**
`actions/configure-pages@v5` does take that input, but creating a Pages site needs admin rights that
`GITHUB_TOKEN` does not have and that workflow `permissions:` cannot grant. It fails with
`Resource not accessible by integration`, which is a worse error than the plain "verify that the
repository has Pages enabled" it replaces. Self-enabling would mean storing a PAT for a one-time
setup step. The step in `pages.yml` now carries a comment saying so.

**Verify:** `gh api repos/lizzie-teo/conjure-ui/pages` returns a JSON body instead of a 404, and the
Deploy Storybook run goes green.

### Set the Chromatic project token

Unrelated to any of this work — Chromatic has been failing since 26 July with `✖ Missing project
token`. `gh secret list` shows no secrets on the repo at all.

**Fix:** get the token from the Chromatic project's Manage screen, then:

```bash
gh secret set CHROMATIC_PROJECT_TOKEN
```

---

## 2. The custom domain — deferred, and that is fine

**Status: parked on 2 Aug.** `lizzieteo.com` was bought through Squarespace and is going to be moved
off it, so no DNS record is being added there in the meantime.

Nothing else waits on this. Pages serves at `lizzie-teo.github.io/conjure-ui/`, and Storybook works
there unchanged — `build-storybook` emits relative asset paths (`./assets/…`), so a project subpath
needs no `base` config. The earlier note claiming the domain root was *why* no base path was needed
had the causation backwards.

What changed to park it:

- `public/CNAME` is deleted, and with it the `public/` folder. **This is the load-bearing part.**
  Publishing that file before the DNS record exists makes Pages claim `ui.lizzieteo.com` and 301 the
  working `github.io` URL to a domain that does not resolve — the site goes down rather than moving.
  Removing the `../public` entry from `staticDirs` was **not** enough on its own: Vite's default
  `publicDir` copies `public/` regardless, so the file kept shipping. That staticDirs entry was
  redundant all along and is now gone too.
- `README.md`, `CHANGELOG.md`, `package.json` `homepage`, `CLAUDE.md` and the designer guide all
  point at the `github.io` URL.

**Those links do not need changing back.** GitHub 301s the `github.io` URL to the custom domain once
one is set, so everything written now keeps working. That matters for `README.md` especially, which
is the npm landing page and is frozen at publish time for every released version.

### When the domain has moved

1. At the new DNS host, add: `CNAME` · host `ui` · value `lizzie-teo.github.io`.
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

---

## 3. Publish to npm

`npm view @lizzie-teo/conjure-ui` currently 404s — the package has never been published, so the
install instructions and the npm badge in `README.md` describe something that does not exist yet.

`.github/workflows/release.yml` does the whole job on a version tag; it just needs the token.

```bash
gh secret set NPM_TOKEN          # an npm automation token with publish rights
npm version patch                # writes package.json + creates the tag
git push --follow-tags           # pushing the tag is what ships
```

`publishConfig` is already `{"access":"public","provenance":true}`, so a scoped package publishes
publicly and the tarball is linked back to the commit. The workflow refuses to publish if the tag
disagrees with `package.json`, so let `npm version` create the tag rather than tagging by hand.

**Verify:** `npm view @lizzie-teo/conjure-ui version` returns the version, and a GitHub Release
appears with the CHANGELOG section as its body.

---

## 4. The case study, in the portfolio repo

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

---

## 5. Loose ends and open decisions

**`app/api/chat/route.ts`** — the last thing under `app/` that isn't shipped CSS. Nothing in
`demo/` or Storybook calls it, and it is the only reason `npm run next` and `build:next` still
exist. Deleting it would also orphan `@anthropic-ai/sdk` in devDependencies and an externals entry
in `vite.lib.config.ts`. Left in place deliberately; your call whether it earns its keep.

**~~Stale docs in `.docs/plans/`~~ — done.** Eight plan docs were deleted: `prompt-figma-make` and
`playbook-site.md` (Figma Make and the retired site), plus six whose subject components were pruned
and no longer exist — `ingredient-shop-list.md`, `recipe-card.md`, `makeup-shopping-journey.md`,
`iga-butter-chicken-journey.md`, `provider-comparison-bloom.md`, `provider-comparison-bubbles.md`.
The rule used: delete a plan doc when the component it plans is gone. `ecommerce-journey-components.md`
and `insurance-comparison-chat-ui.md` were kept — every component the first one plans still exists,
and the second is design reasoning not tied to a deleted component. All recoverable from git history.

`public/` also lost the five stock `create-next-app` SVGs (`file`, `globe`, `next`, `vercel`,
`window`), which were referenced nowhere and were being copied into the published Storybook by
`staticDirs`. It now holds only `CNAME`.

**`README.md` links ahead of reality.** It points at `ui.lizzieteo.com`, the npm package, and
`lizzieteo.com/work/conjure-ui`. All three are correct destinations; none of them resolve yet. They
start working as sections 2, 3, and 4 land.
