#!/usr/bin/env node
/**
 * Writes `dist/package.json` = {"type":"module"}.
 *
 * The build emits ESM only, but the root package.json has no `type` field — and
 * it cannot get one: Vite loads `vite.lib.config.ts` as CJS and that config uses
 * `__dirname`, so flipping the root to `"type": "module"` breaks the build.
 *
 * Without this, Node reads `dist/*.js` as CommonJS and an ESM consumer only
 * works by accident, via the syntax detection added in Node 22. On Node 20 the
 * import throws. A nested package.json sets the module type for everything under
 * dist/ without touching how the root `exports` map resolves.
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
writeFileSync(path.join(dist, 'package.json'), `${JSON.stringify({ type: 'module' }, null, 2)}\n`)
console.log('wrote dist/package.json ({"type":"module"})')
