'use client'

import { motion } from 'motion/react'
import { useRevealPreset, type RevealPresetName } from '../../../lib/motion'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface RevealProps extends MotionDivProps {
  /** Which entrance to play. Defaults to `fade-up`, the library's default entrance. */
  preset?: RevealPresetName
  /** Seconds to wait before entering — use for hand-sequencing, or reach for `Stagger`. */
  delay?: number
  /** Travel in px for `fade-up`, or start scale for `scale-in`. */
  distance?: number
  /**
   * Play when scrolled into view instead of on mount, once only.
   * For onboarding and marketing surfaces — not for UI people visit daily.
   */
  inView?: boolean
}

/**
 * Plays one of the library's entrance presets on whatever it wraps.
 *
 * Wrap in `AnimatePresence` (with a stable `key`) when the content is
 * conditional, and the matching exit plays too. Under reduced motion every
 * preset becomes an opacity fade.
 */
export function Reveal({
  preset = 'fade-up',
  delay,
  distance,
  inView = false,
  children,
  ...props
}: RevealProps) {
  const { initial, animate, exit, transition } = useRevealPreset(preset, { delay, distance })

  return (
    <motion.div
      initial={initial}
      {...(inView
        ? { whileInView: animate, viewport: { once: true, margin: '-80px' } }
        : { animate })}
      exit={exit}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
}
