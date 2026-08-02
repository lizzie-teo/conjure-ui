# Consumer install test — handoff

**Status:** complete and verified, **not committed**.
**Date:** 2 August 2026.

## What this was

Lizzie asked how to test whether people would have trouble importing the published package. The
story suite proves components work *inside this repo*; it cannot tell you whether `npm install
@lizzie-teo/conjure-ui` gives a stranger something usable. That gap is now covered by a consumer
smoke test — which, on its first run, found three real breakages that are also fixed here.

## The test

`npm run test:consumer` → `scripts/consumer-smoke.mjs` (~90s, 11 checks).

It `npm pack`s the library (which runs `prepare`, so it builds from scratch), installs the tarball
into a temp project **outside this repo**, and consumes it as a stranger would:

1. install
2. ESM import of all four entry points + SSR render via `react-dom/server`
3. CJS `require` fails cleanly (ESM-only is deliberate)
4. `tsc` under `moduleResolution: bundler` **and** `nodenext`, with `skipLibCheck: false`
5. both CSS entry points present in the tarball
6. a real Tailwind v4 build against the shipped stylesheet
7. design tokens present in that build
8. library utility classes present in that build
9. `publint`
10. `are-the-types-wrong`

**The temp project must stay outside the repo.** A fixture inside the working tree resolves against
this repo's own `node_modules`, where every dependency — declared or not — is found, so it would
pass for a package that is broken on npm.

Wired into `.github/workflows/ci.yml` as the final step, after the existing entry-point file check.

## The three bugs it found, and the fixes

1. **Components shipped unstyled.** Tailwind never scans `node_modules`, so a consumer importing
   `@lizzie-teo/conjure-ui/styles` got the design tokens and none of the utility classes the
   library's own markup uses. → `app/globals.css` gained `@source "../dist/**/*.js";`. A glob
   rather than a bare `../dist` so a missing dist during local dev is a no-op, not a build error.

2. **`dist` was not declared as ESM.** The build emits ESM but the root package.json has no `type`
   field, so Node read `dist/*.js` as CommonJS; imports only worked via Node 22's syntax detection
   and threw on Node 20. → `scripts/write-dist-package-type.mjs` writes `dist/package.json` =
   `{"type":"module"}` after the build. The root package.json **cannot** carry `"type": "module"`:
   Vite loads `vite.lib.config.ts` as CJS and that config uses `__dirname`.

3. **Type declarations did not resolve under `node16`/`nodenext`.** Masked by bug 2 — extensionless
   relative imports are legal in CJS, so the first run reported this check as passing. Once dist
   became ESM, TypeScript demanded explicit extensions and every `.d.ts` failed with
   TS2834/TS2835. Source is written for `moduleResolution: "bundler"` and tsc emits those paths
   verbatim; it cannot add extensions itself. → `scripts/fix-dts-extensions.mjs` rewrites all 131
   relative specifiers post-build, resolving each against disk so directory specifiers like
   `'./BundleCard'` become `'./BundleCard/index.js'` rather than a broken `.js` suffix.

`npm run build` is now: vite → tsc → `fix-dts-extensions.mjs` → `write-dist-package-type.mjs`.
Neither post-processing step is optional; both are covered by the smoke test.

## Deliberate scope decisions — do not "fix" these

- **Legacy TS `node10` resolution and CJS `require` are unsupported.** For an ESM-only, React 19,
  Tailwind 4 library that is not a real consumer. `attw` runs with `--profile esm-only`, so the
  choice is explicit rather than silently ignored.
- **The `styles`/`theme` CSS entry points are excluded from `attw`.** It resolves JS and type
  declarations, so CSS always reads as a resolution failure. The script asserts their presence
  directly instead.
- **`publint` and `@arethetypeswrong/cli` are pinned devDependencies, not `npx …@latest`.** A
  release gate must give the same answer in six months, and must not need the network mid-job.
  They are dev-only, so they never reach consumers.

## Verified

- `npm run test:consumer` → 11/11
- `npm test` → 287 tests, 47 files
- `npm run typecheck`, `npm run lint` → clean

## Files changed by this work

```
new:       scripts/consumer-smoke.mjs
new:       scripts/fix-dts-extensions.mjs
new:       scripts/write-dist-package-type.mjs
modified:  package.json          (build chain, test:consumer script, 2 devDependencies)
modified:  package-lock.json
modified:  app/globals.css       (@source directive)
modified:  .github/workflows/ci.yml
modified:  CLAUDE.md             (dev environment, theming, build & publish, testing)
```

⚠️ **The working tree also holds a large, unrelated set of staged deletions** — the retired Next
marketing site (`app/page.tsx`, `app/_site/*`, several removed components). Those predate this
work. Do not `git add -A`; commit the list above explicitly.

## What's left

1. Commit the files above (not yet done — Lizzie's call).
2. The fixes change build output, so **the next `npm publish` is the one that carries them**.
   Anyone on 0.2.0 today still gets unstyled components. Worth a version bump and a CHANGELOG entry
   when she's ready to release.
