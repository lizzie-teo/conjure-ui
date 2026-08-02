'use client'

import { X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { MotionSpanProps } from '../../../lib/prop-types'

export interface TagProps extends MotionSpanProps {
  label: string
  onRemove?: () => void
}

export function Tag({ label, onRemove, className, ...props }: TagProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs md:text-sm',
        className
      )}
      {...props}
    >
      {label}
      {onRemove && (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="size-3.5 md:size-3 rounded-full p-0 tap-target"
        >
          <X className="size-2.5" />
        </Button>
      )}
    </motion.span>
  )
}
