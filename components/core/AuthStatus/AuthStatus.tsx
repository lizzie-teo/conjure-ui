'use client'

import { Check, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface AuthStatusProps extends Omit<MotionDivProps, 'children'> {
  state: 'success' | 'error'
  message?: string
}

const defaults = {
  success: {
    label: 'Identity verified',
    message: "You're all set — proceeding to payment.",
  },
  error: {
    label: 'Not verified',
    message: "We couldn't verify your identity. Please try again.",
  },
}

export function AuthStatus({ state, message, className, ...props }: AuthStatusProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className={cn(
        'flex flex-col gap-2 p-4 md:p-5 rounded-xl border',
        state === 'success'
          ? 'bg-success/5 border-success/20'
          : 'bg-destructive/5 border-destructive/20',
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      <div className="flex items-center gap-2">
        {state === 'success' ? (
          <Check className="size-4 text-success shrink-0" />
        ) : (
          <X className="size-4 text-destructive shrink-0" />
        )}
        <StatusBadge
          label={defaults[state].label}
          variant={state === 'success' ? 'success' : 'error'}
        />
      </div>
      <p className="text-xs md:text-sm text-muted-foreground">
        {message ?? defaults[state].message}
      </p>
    </motion.div>
  )
}
