'use client'

import { useReducedMotion, type TargetAndTransition, type Transition } from 'motion/react'

/* ──────────────────────────────────────────────────────────────────────────
 * Motion tokens
 *
 * The code form of the tables in `.docs/guidelines/motion-guidelines`. Import
 * these instead of writing literal durations and curves, so a change to the
 * library's feel is one edit here rather than forty across components.
 * ────────────────────────────────────────────────────────────────────────── */

/** Durations in seconds (motion's unit). UI responses stay ≤ `base`. */
export const duration = {
  /** 100ms — hover fills, icon swaps, colour changes */
  instant: 0.1,
  /** 200ms — element enter/exit, tooltips, badges */
  fast: 0.2,
  /** 300ms — drawers, modals, tab switches */
  base: 0.3,
  /** 500ms — page transitions, hero reveals, count-ups */
  slow: 0.5,
} as const

/** Cubic-bezier curves. Enter with `out`, exit with `in`, reposition with `inOut`. Never linear. */
export const ease = {
  out: [0, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  inOut: [0.4, 0, 0.2, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>

/** Springs — for interactive press/release only, not for entrances. */
export const spring = {
  press: { type: 'spring', stiffness: 320, damping: 28 },
} as const satisfies Record<string, Transition>

/** Stagger timings for lists. Keep `children` at 0.05 — longer reads as slow. */
export const stagger = {
  children: 0.05,
  delay: 0.05,
} as const

/* ──────────────────────────────────────────────────────────────────────────
 * Reveal presets
 *
 * Named entrances built from the tokens. Each returns `initial` / `animate` /
 * `exit` / `transition`, ready to spread onto any `motion.*` element. Under
 * reduced motion every preset collapses to an opacity fade: opacity aids
 * comprehension, movement is what the preference opts out of.
 * ────────────────────────────────────────────────────────────────────────── */

export const revealPresetNames = [
  'fade',
  'fade-up',
  'scale-in',
  'slide-from-bottom',
  'slide-from-top',
  'slide-from-left',
  'slide-from-right',
] as const

export type RevealPresetName = (typeof revealPresetNames)[number]

export interface RevealPresetOptions {
  /** Strip all movement, keep opacity. Usually `useReducedMotion() ?? false`. */
  reduce?: boolean
  /** Seconds to wait before entering. */
  delay?: number
  /**
   * Travel distance in px for `fade-up`, or start scale for `scale-in`
   * (e.g. `0.9`). Ignored by `fade` and the slides, which travel their full size.
   */
  distance?: number
}

export interface RevealPreset {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
  transition: Transition
}

const exitTransition: Transition = { duration: duration.fast, ease: ease.in }

export function getRevealPreset(
  name: RevealPresetName,
  { reduce = false, delay = 0, distance }: RevealPresetOptions = {}
): RevealPreset {
  const isSlide = name.startsWith('slide-')
  const enter: Transition = {
    duration: name === 'scale-in' ? 0.15 : isSlide ? duration.base : duration.fast,
    ease: ease.out,
    delay,
  }

  if (reduce || name === 'fade') {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: exitTransition },
      transition: { ...enter, duration: duration.fast },
    }
  }

  switch (name) {
    case 'fade-up': {
      const y = distance ?? 10
      return {
        initial: { opacity: 0, transform: `translateY(${y}px)` },
        animate: { opacity: 1, transform: 'translateY(0px)' },
        exit: { opacity: 0, transform: `translateY(${Math.round(y * 0.6)}px)`, transition: exitTransition },
        transition: enter,
      }
    }
    case 'scale-in': {
      const scale = distance ?? 0.95
      return {
        initial: { opacity: 0, transform: `scale(${scale})` },
        animate: { opacity: 1, transform: 'scale(1)' },
        exit: { opacity: 0, transform: `scale(${scale})`, transition: { ...exitTransition, duration: 0.15 } },
        transition: enter,
      }
    }
    case 'slide-from-bottom':
      return slide('translateY(100%)', 'translateY(0%)', enter)
    case 'slide-from-top':
      return slide('translateY(-100%)', 'translateY(0%)', enter)
    case 'slide-from-left':
      return slide('translateX(-100%)', 'translateX(0%)', enter)
    case 'slide-from-right':
      return slide('translateX(100%)', 'translateX(0%)', enter)
  }
}

// Full transform strings rather than x/y shorthands: they stay hardware
// accelerated when the main thread is busy. Slides exit the way they entered.
function slide(from: string, to: string, enter: Transition): RevealPreset {
  return {
    initial: { transform: from },
    animate: { transform: to },
    exit: { transform: from, transition: { duration: duration.base, ease: ease.in } },
    transition: enter,
  }
}

/** `getRevealPreset` with the reduced-motion preference read for you. */
export function useRevealPreset(
  name: RevealPresetName,
  options: Omit<RevealPresetOptions, 'reduce'> = {}
): RevealPreset {
  const reduce = useReducedMotion() ?? false
  return getRevealPreset(name, { ...options, reduce })
}

/* ──────────────────────────────────────────────────────────────────────────
 * Interaction hooks
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * Returns motion props that shake the element on error.
 * Reduced-motion fallback: opacity pulse instead of positional shake.
 *
 * Usage:
 *   const shakeProps = useErrorShake(hasError)
 *   <motion.div {...shakeProps}>…</motion.div>
 */
export function useErrorShake(hasError: boolean) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return {
      animate: hasError ? { opacity: [1, 0.4, 1, 0.4, 1] } : {},
      transition: { duration: 0.5, ease: 'easeInOut' as const },
    }
  }

  return {
    animate: hasError ? { x: [0, -6, 6, -4, 4, 0] } : {},
    transition: { duration: 0.35, ease: 'easeInOut' as const },
  }
}
