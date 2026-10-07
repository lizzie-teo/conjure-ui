'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export type KeyValueListProps = MotionDivProps

export interface RowProps extends Omit<MotionDivProps, 'children'> {
  label: string
  value: React.ReactNode
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] } },
}

const rowVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

function Row({ label, value, className, ...props }: RowProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      variants={shouldReduce ? rowVariantsReduced : rowVariants}
      className={cn(
        'flex items-center justify-between gap-4 py-2 @md:py-2.5',
        'border-b border-border last:border-0',
        className
      )}
      {...props}
    >
      <span className="text-xs @md:text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-xs @md:text-sm text-foreground font-medium text-right">{value}</span>
    </motion.div>
  )
}

export function KeyValueList({ className, children, ...props }: KeyValueListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn('divide-y-0 px-4 @md:px-5 py-1', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

KeyValueList.Row = Row
