Read `.docs/guidelines/motion-guidelines` in full, then apply every rule from it to the current task.

Before writing any animation code, verify:

**Easing**
- Entering elements: `ease: [0, 0, 0.2, 1]` (ease-out) — always
- Exiting elements: `ease: [0.4, 0, 1, 1]` (ease-in)
- Never use `linear` for UI motion

**Duration**
- Element enter/exit: 200ms
- Panels, modals, drawers: 300ms
- Nothing visible to the user should exceed 300ms

**AnimatePresence**
- Wrap every conditional render that animates in/out
- Every child needs a stable `key`
- Every child needs an `exit` variant — elements never just disappear

**Imports**
- This project uses the `motion` package (v12): `import { motion, useReducedMotion } from 'motion/react'`
- Never `from 'framer-motion'` — nothing in the codebase imports that

**Reduced motion (mandatory)**
- Import `useReducedMotion` from `motion/react`
- When true: keep opacity transitions, remove all y/x/scale movement
- `useReducedMotion()` returns `boolean | null` — coerce with `?? false` when passing to a prop typed `boolean`

**Immersive patterns**
- Cards: `whileHover={{ y: -3 }}` + `transition-shadow hover:shadow-md`
- Buttons: CSS `active:scale-[0.97]` for press feedback
- Lists: `staggerChildren: 0.05` for sequential reveals
- Layout changes: `layout` prop — never manually animate dimensions
