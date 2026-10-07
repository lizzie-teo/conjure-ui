'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import type { ComponentProps, ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export type ButtonGroupProps = ComponentPropsWithRef<'div'>

/**
 * Props land on the inner `<Button>` — that is the element a consumer wants to
 * reference, label or measure, not the motion wrapper that drives the entrance.
 */
type ActionProps = ComponentProps<typeof Button>

function Primary({ className, children, ...props }: ActionProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      className="flex-1"
    >
      <Button
        variant="default"
        size="default"
        className={cn('w-full h-12 @md:h-10 pointer-coarse:min-h-11', className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}

function Secondary({ className, children, ...props }: ActionProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.05 }}
      className="flex-1"
    >
      <Button
        variant="outline"
        size="default"
        className={cn('w-full h-12 @md:h-10 pointer-coarse:min-h-11', className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 @md:gap-3 px-4 @md:px-5 py-3 @md:py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ButtonGroup.Primary = Primary
ButtonGroup.Secondary = Secondary
