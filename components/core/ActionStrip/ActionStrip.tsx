'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export type ActionStripProps = ComponentPropsWithRef<'div'>

interface PrimaryProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

interface SecondaryProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

function Primary({ onClick, disabled, className, children }: PrimaryProps) {
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
        onClick={onClick}
        disabled={disabled}
        className={cn('w-full', className)}
      >
        {children}
      </Button>
    </motion.div>
  )
}

function Secondary({ onClick, disabled, className, children }: SecondaryProps) {
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
        onClick={onClick}
        disabled={disabled}
        className={cn('w-full', className)}
      >
        {children}
      </Button>
    </motion.div>
  )
}

export function ActionStrip({ className, children, ...props }: ActionStripProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

ActionStrip.Primary = Primary
ActionStrip.Secondary = Secondary
