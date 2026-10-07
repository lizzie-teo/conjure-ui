'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface QuickRepliesProps extends Omit<MotionDivProps, 'children' | 'onSelect'> {
  options: string[]
  /** Note: replaces the DOM `onSelect` — receives the chosen option string. */
  onSelect: (option: string) => void
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] } },
}

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

export function QuickReplies({ options, onSelect, className, ...props }: QuickRepliesProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn(
        'flex gap-2 @md:gap-3 overflow-x-auto pb-1 scrollbar-none',
        className
      )}
      role="group"
      aria-label="Quick reply options"
      {...props}
    >
      {options.map((option) => (
        <motion.div
          key={option}
          variants={shouldReduce ? itemVariantsReduced : itemVariants}
          className="shrink-0"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(option)}
            className="rounded-full whitespace-nowrap h-11 @md:h-8 pointer-coarse:min-h-11"
          >
            {option}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
