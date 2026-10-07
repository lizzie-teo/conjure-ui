# Figma Sync Workflow

How the Figma design file and this repository stay in sync. Read this before setting up or modifying the sync system.

---

## Overview

```
Repository                    Catalog                    Figma file
──────────────                ─────────                  ──────────────
components/primitives/  ──→  .docs/figma-catalog.json  ──→  Primitives page
components/core/        ──→  (status per component)    ──→  One page per component
components/layouts/     ──→                             ──→  One page per layout
app/theme.css (tokens)  ──→  tokens.status: synced     ──→  Tokens collection (Light/Dark)
```

The **catalog file** (`.docs/figma-catalog.json`) is the single source of truth. It tracks every component in the codebase, whether it has been built in Figma, and the Figma node ID once it has.

---

## Catalog file

**Location:** `.docs/figma-catalog.json`

**Status values:**

| Status | Meaning |
|--------|---------|
| `"synced"` | Component exists in both repo and Figma, node ID recorded |
| `"pending"` | Component exists in code but has no Figma equivalent yet |
| `"skipped"` | Intentionally excluded (assets, icon wrappers, platform-specific) |

**Shape of a synced entry:**
```json
"MessageBubble": {
  "status": "synced",
  "figmaPage": "MessageBubble",
  "figmaPageId": "XXXX:XXXX",
  "figmaNodeId": "XXXX:XXXX",
  "variants": ["Role=User", "Role=Assistant"],
  "props": ["Content (TEXT)", "Has Timestamp (BOOLEAN)"]
}
```

**When to update the catalog:**
- A new component folder is added to the repo → add an entry with `"status": "pending"`
- A Figma component is built via `#figbuild` → update `status`, `figmaNodeId`, `variants`, `props`
- A component is intentionally not going to Figma → set `"status": "skipped"` with a `"reason"`

---

## Drift detection

**Manual run:**
```bash
node scripts/figma-drift.js           # full report
node scripts/figma-drift.js --pending # pending + unlisted only
node scripts/figma-drift.js --json    # machine-readable JSON
```

The script exits with code `1` if any components need attention — useful for CI.

**What it does:**
1. Reads the catalog
2. Scans `components/primitives/`, `components/core/`, `components/layouts/` for subdirectories
3. Cross-references every folder against the catalog
4. Reports: pending (in code, not in Figma), unlisted (in code, not in catalog), synced, skipped

---

## Scheduled agent (automated drift checks)

A remote scheduled agent runs `figma-drift.js` periodically and surfaces new drift without manual effort.

**Set up with `/schedule`:**

In Claude Code, type:
```
/schedule
```

Use this as the agent prompt:
```
Run `node scripts/figma-drift.js --pending` in the ai-chat repo.
If any components are pending or unlisted, summarise what needs to be built
and suggest running #figbuild. Output a brief list.
```

Recommended cadence: **daily** — Figma drift happens at human speed; sub-hourly polling adds no value.

**What the scheduled agent does:**
- Runs the drift script
- If no drift: silent success (no notification)
- If drift found: posts a summary of what's pending and prompts you to run `#figbuild`

---

## Building components (`#figbuild`)

When `#figbuild` appears in a Claude Code prompt:

1. Read `.docs/figma-catalog.json` — identify all `status: pending` entries
2. Read `.docs/guidelines/figma-guidelines.md` — load the full token map, shared atom rules, naming conventions
3. Present the pending list — ask which components to build (or confirm "build all")
4. Build each component in Figma:
   - One page per core component / layout
   - Primitives go on the shared `Primitives` page
   - Follow all rules in `figma-guidelines.md`: token bindings, shared atoms, component properties
5. After each successful build: update the catalog entry (`status → synced`, add `figmaNodeId`, `variants`, `props`)

**Triggering a specific component:**
```
#figbuild MessageBubble
#figbuild ChatInput QuickReplies
#figbuild --all   ← builds everything pending
```

---

## Shared atom rule (summary)

When building a molecule in Figma, **never recreate an atom** — use an instance of the existing Figma component instead. Before building any core component, confirm its dependencies exist in Figma:

| Dependency | Figma source |
|-----------|-------------|
| Any button / CTA | `Button` page |
| Any input field | `Input` page |
| Any icon | `Icons` page |
| Tag chip | `Primitives` → Tag |
| Step dot | `Primitives` → StepIndicator |
| Biometric ring | `Primitives` → BiometricIndicator |
| Status badge | `Primitives` → StatusBadge *(pending)* |

---

## Token sync

Tokens are considered **synced** as long as:
- `app/theme.css` CSS variables map to the `Tokens` Figma collection (Light/Dark modes)
- The Primitives collection contains the raw palette values that Tokens aliases

If you add a new CSS variable, add a corresponding entry in the `Tokens` Figma collection **and** update the mapping table in `.docs/guidelines/figma-guidelines.md`.

---

## Quick reference

| Task | Command |
|------|---------|
| Check what's out of sync | `node scripts/figma-drift.js` |
| Build pending components | `#figbuild` in Claude Code |
| Build a specific component | `#figbuild ComponentName` |
| Read Figma build rules | `#figkit` in Claude Code |
| Read this workflow | `.docs/guidelines/figma-sync-workflow.md` |
| Open catalog | `.docs/figma-catalog.json` |
