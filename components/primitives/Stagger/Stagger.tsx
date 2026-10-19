'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { duration, ease, stagger as staggerTokens } from '../../../lib/motion'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface StaggerProps extends MotionDivProps {
  /** Seconds between each item. Keep within 0.03–0.08; the default is the library token. */
  interval?: number
  /** Seconds before the first item. */
  delay?: number
  /** Play when scrolled into view instead of on mount, once only. */
  inView?: boolean
}

export type StaggerItemProps = MotionDivProps

const itemVariants = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(10px)' },
  show: {
    opacity: 1,
    ...(reduce ? {} : { transform: 'translateY(0px)' }),
    transition: { duration: duration.fast, ease: ease.out },
  },
})

/**
 * Sequences its `Stagger.Item` children so a group arrives in order rather
 * than all at once. Decorative only — items are interactive from the start.
 *
 * Use for groups seen occasionally (a results set, an onboarding checklist),
 * not lists people scroll past all day.
 */
function StaggerRoot({
  interval = staggerTokens.children,
  delay = staggerTokens.delay,
  inView = false,
  children,
  ...props
}: StaggerProps) {
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: interval, delayChildren: delay } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      {...(inView
        ? { whileInView: 'show', viewport: { once: true, margin: '-80px' } }
        : { animate: 'show' })}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, ...props }: StaggerItemProps) {
  const reduce = useReducedMotion() ?? false
  return (
    <motion.div variants={itemVariants(reduce)} {...props}>
      {children}
    </motion.div>
  )
}

export const Stagger = Object.assign(StaggerRoot, { Item: StaggerItem })
