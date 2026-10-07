'use client'

import { useId, useRef, useState, type ComponentPropsWithRef, type KeyboardEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

export interface SegmentedControlOption {
  value: string
  /** Always required — it is the accessible name even when `iconOnly` hides it. */
  label: string
  icon?: ReactNode
}

export interface SegmentedControlProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue' | 'onChange'> {
  options: SegmentedControlOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Show only each option's icon; the label moves to `aria-label`. */
  iconOnly?: boolean
}

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  iconOnly = false,
  className,
  ...props
}: SegmentedControlProps) {
  const shouldReduce = useReducedMotion()
  // One indicator per instance, so two controls on a page never trade a layoutId
  const indicatorId = useId()
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value)
  const selected = value ?? internal
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  function select(next: string) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  // Radio-group keyboard contract: arrows move and select, Home/End jump to the ends
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = options.findIndex((o) => o.value === selected)
    const last = options.length - 1
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % options.length
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + options.length) % options.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    select(options[next].value)
    buttons.current[next]?.focus()
  }

  return (
    <div
      // Spread first: the root owns the radiogroup contract a consumer prop must not break
      {...props}
      role="radiogroup"
      onKeyDown={onKeyDown}
      className={cn('inline-flex items-center gap-1 rounded-lg bg-muted p-1', className)}
    >
      {options.map((option, i) => {
        const isSelected = option.value === selected
        return (
          <Button
            key={option.value}
            ref={(el) => { buttons.current[i] = el }}
            variant="ghost"
            role="radio"
            aria-checked={isSelected}
            aria-label={iconOnly ? option.label : undefined}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => select(option.value)}
            className={cn(
              'relative flex-1 h-9 @md:h-8 pointer-coarse:min-h-11 rounded-md px-3 @md:px-4',
              'text-sm @md:text-base font-medium transition-colors duration-100',
              'hover:bg-transparent',
              isSelected ? 'text-foreground hover:text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {isSelected && (
              <motion.span
                layoutId={indicatorId}
                aria-hidden="true"
                className="absolute inset-0 rounded-md bg-card shadow-[var(--shadow-sm)]"
                transition={{ duration: shouldReduce ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            <span className="relative flex items-center gap-1.5 [&_svg]:size-4 @md:[&_svg]:size-5">
              {option.icon}
              {!iconOnly && option.label}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
