'use client'

import { Check, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface SignInStatusProps extends Omit<MotionDivProps, 'children'> {
  state: 'success' | 'error'
  /**
   * The outcome, as your brand says it. Required rather than defaulted: this
   * package ships no English copy, and a wrong-language status on an auth step
   * is worse than none.
   */
  label: string
  /** Optional supporting line under the label. */
  message?: string
}

export function SignInStatus({ state, label, message, className, ...props }: SignInStatusProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className={cn(
        'flex flex-col gap-2 @md:gap-3 p-4 @md:p-5 rounded-xl border',
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
          <Check className="size-4 @md:size-5 text-success shrink-0" />
        ) : (
          <X className="size-4 @md:size-5 text-destructive shrink-0" />
        )}
        <StatusBadge label={label} variant={state === 'success' ? 'success' : 'error'} />
      </div>
      {message && <p className="text-xs @md:text-sm text-muted-foreground">{message}</p>}
    </motion.div>
  )
}
