'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { BiometricIndicator } from '../../primitives/BiometricIndicator/BiometricIndicator'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface AuthPromptProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  state: 'idle' | 'pending' | 'success' | 'error'
  onAuthenticate: () => void
  onRetry?: () => void
  errorMessage?: string
}

const stateMessages = {
  idle: 'Use your passkey to confirm',
  pending: 'Authenticating…',
  success: 'Identity confirmed',
  error: 'Authentication failed',
}

export function AuthPrompt({
  state,
  onAuthenticate,
  onRetry,
  errorMessage,
  className,
  ...props
}: AuthPromptProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 md:gap-6 p-6 md:p-8',
        className
      )}
      {...props}
    >
      <BiometricIndicator state={state} />

      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduce ? 0 : -4 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-3 text-center w-full"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm md:text-base font-medium text-foreground">
            {stateMessages[state]}
          </p>

          {state === 'error' && errorMessage && (
            <p className="text-xs md:text-sm text-destructive">{errorMessage}</p>
          )}

          {state === 'idle' && (
            <Button
              className="h-12 md:h-10 pointer-coarse:min-h-11 w-full md:w-auto"
              onClick={onAuthenticate}
            >
              Authenticate
            </Button>
          )}

          {state === 'pending' && (
            <Button className="h-12 md:h-10 pointer-coarse:min-h-11 w-full md:w-auto" disabled>
              Authenticating…
            </Button>
          )}

          {state === 'error' && onRetry && (
            <Button
              variant="outline"
              className="h-12 md:h-10 pointer-coarse:min-h-11 w-full md:w-auto"
              onClick={onRetry}
            >
              Try again
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
