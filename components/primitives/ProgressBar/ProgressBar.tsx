'use client'

import type { ComponentPropsWithRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'

export interface ProgressBarProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  value: number
  max?: number
  /** Accessible name — "Savings goal". Shown above the bar unless `hideLabel`. */
  label: string
  hideLabel?: boolean
  /** Readable progress for the label row and screen readers — "$120 of $200". Defaults to a percentage. */
  valueText?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  hideLabel = false,
  valueText,
  className,
  ...props
}: ProgressBarProps) {
  const shouldReduce = useReducedMotion()
  const clamped = Math.min(Math.max(value, 0), max)
  const pct = max > 0 ? (clamped / max) * 100 : 0
  const text = valueText ?? `${Math.round(pct)}%`

  return (
    <div className={cn('flex flex-col gap-1.5 @md:gap-2', className)} {...props}>
      {!hideLabel && (
        <div className="flex items-baseline justify-between gap-3 text-xs @md:text-sm">
          <span className="font-medium text-foreground">{label}</span>
          <span className="tabular-nums text-muted-foreground">{text}</span>
        </div>
      )}
      {/* The track is a hairline-class element — it does not scale with the container */}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-valuetext={text}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        {/* Slides a full-width fill rather than scaling it, so the rounded end keeps its shape */}
        <motion.div
          className="h-full w-full rounded-full bg-primary"
          initial={shouldReduce ? false : { x: '-100%' }}
          animate={{ x: `${pct - 100}%` }}
          transition={{ duration: shouldReduce ? 0 : 0.3, ease: [0, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}
