'use client'

import type { ComponentPropsWithRef } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

export interface QuantityStepperProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onChange'> {
  value: number
  min?: number
  max?: number
  /** Note: replaces the DOM `onChange` — receives the new quantity, not an event. */
  onChange: (value: number) => void
  disabled?: boolean
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  className,
  ...props
}: QuantityStepperProps) {
  const atMin = value <= min
  const atMax = value >= max

  return (
    <div
      role="group"
      aria-label="Quantity"
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      <Button
        variant="outline"
        size="icon"
        aria-label="Decrease quantity"
        disabled={disabled || atMin}
        onClick={() => onChange(value - 1)}
        className="size-12 @md:size-10 pointer-coarse:size-12 rounded-md shrink-0"
      >
        <Minus className="size-3.5" />
      </Button>
      <span
        aria-live="polite"
        aria-atomic="true"
        className="min-w-[2rem] text-center text-sm @md:text-base font-medium text-foreground select-none"
      >
        {value}
      </span>
      <Button
        variant="outline"
        size="icon"
        aria-label="Increase quantity"
        disabled={disabled || atMax}
        onClick={() => onChange(value + 1)}
        className="size-12 @md:size-10 pointer-coarse:size-12 rounded-md shrink-0"
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  )
}
