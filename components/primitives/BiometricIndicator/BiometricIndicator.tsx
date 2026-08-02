'use client'

import type { ComponentPropsWithRef } from 'react'
import { Check, Fingerprint, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'

const stateIconClasses = {
  idle: 'text-muted-foreground',
  pending: 'text-primary',
  success: 'text-success',
  error: 'text-destructive',
}

const stateRingClasses = {
  idle: 'border-border',
  pending: 'border-primary',
  success: 'border-success',
  error: 'border-destructive',
}

const stateAriaLabels = {
  idle: 'Ready for biometric authentication',
  pending: 'Waiting for biometric',
  success: 'Verified',
  error: 'Authentication failed',
}

export interface BiometricIndicatorProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  state: 'idle' | 'pending' | 'success' | 'error'
}

export function BiometricIndicator({ state, className, ...props }: BiometricIndicatorProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div
      role="img"
      aria-label={stateAriaLabels[state]}
      className={cn(
        'relative inline-flex items-center justify-center size-20 md:size-16',
        className
      )}
      {...props}
    >
      {/* Static ring — transitions color with state */}
      <div
        className={cn(
          'absolute inset-0 rounded-full border-2 transition-colors duration-300',
          stateRingClasses[state]
        )}
      />

      {/* Pulse ring — pending only */}
      {state === 'pending' && !shouldReduce && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Icon — swaps on state change */}
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="text-success"
          >
            <Check className="size-8 md:size-7" strokeWidth={2.5} />
          </motion.span>
        ) : state === 'error' ? (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
            className="text-destructive"
          >
            <motion.span
              animate={shouldReduce ? {} : { x: [0, -5, 5, -5, 5, 0] }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="block"
            >
              <X className="size-8 md:size-7" strokeWidth={2.5} />
            </motion.span>
          </motion.span>
        ) : (
          <motion.span
            key="fingerprint"
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className={stateIconClasses[state]}
          >
            <Fingerprint className="size-8 md:size-7" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
