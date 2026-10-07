'use client'

import type { ComponentPropsWithRef } from 'react'
import { Check } from 'lucide-react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { cn } from '../../../lib/utils'

export interface StepIndicatorProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  status: 'pending' | 'active' | 'complete'
  label?: string
}

export const stepIndicatorDotBase = 'size-3 @md:size-3.5 rounded-full border-2 flex items-center justify-center'

export const stepIndicatorStatusClasses = {
  pending: 'bg-muted border-border',
  active: 'bg-primary/20 border-primary ring-2 ring-primary/30',
  complete: 'bg-primary border-primary',
}

export function StepIndicator({ status, label, className, ...props }: StepIndicatorProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div
      className={cn('inline-flex flex-col items-center gap-1', className)}
      aria-current={status === 'active' ? 'step' : undefined}
      {...props}
    >
      <div className="relative">
        <div className={cn(stepIndicatorDotBase, stepIndicatorStatusClasses[status])}>
          <AnimatePresence>
            {status === 'complete' && (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
                transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                className="flex items-center justify-center"
              >
                <Check className="size-2 @md:size-2.5 text-primary-foreground" strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {status === 'active' && !shouldReduce && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {label && (
        <span className="text-xs @md:text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
