'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export type TypingIndicatorProps = Omit<MotionDivProps, 'children'>

export function TypingIndicator({ className, ...props }: TypingIndicatorProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 6, scale: shouldReduce ? 1 : 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      className={cn(
        'inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 @md:px-5',
        className
      )}
      aria-label="Assistant is typing"
      role="status"
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={
            shouldReduce
              ? { opacity: [0.4, 1, 0.4] }
              : { opacity: [0.3, 1, 0.3], y: [0, -4, 0] }
          }
          transition={{
            duration: shouldReduce ? 1.2 : 0.8,
            repeat: Infinity,
            ease: shouldReduce ? 'linear' : ('easeInOut' as const),
            delay: i * 0.15,
          }}
          className="size-1.5 @md:size-2 rounded-full bg-muted-foreground"
        />
      ))}
    </motion.div>
  )
}
