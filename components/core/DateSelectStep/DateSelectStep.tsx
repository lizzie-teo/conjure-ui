'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { AvailabilityDot } from '../../primitives/AvailabilityDot/AvailabilityDot'
import { cn } from '../../../lib/utils'
import type { AvailableDate } from '../DeliveryConfirmation/deliveryFlow.types'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface DateSelectStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  availableDates: AvailableDate[]
  selectedDate?: string
  onDateSelect: (date: string) => void
}

function parseDateLocal(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDateParts(isoDate: string): {
  dayLabel: string
  dayNum: string
  isToday: boolean
} {
  const date = parseDateLocal(isoDate)
  const today = new Date()
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  return {
    dayLabel: isToday ? 'Today' : new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date),
    dayNum: new Intl.DateTimeFormat(undefined, { day: 'numeric' }).format(date),
    isToday,
  }
}

function formatFullDate(isoDate: string): string {
  const date = parseDateLocal(isoDate)
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
}

function formatCutoffTime(isoString: string): string {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(isoString))
}

function buildCellLabel(date: AvailableDate): string {
  const { isToday } = formatDateParts(date.date)
  const parts: string[] = [isToday ? `Today, ${formatFullDate(date.date)}` : formatFullDate(date.date)]

  if (date.availability === 'unavailable') parts.push('unavailable')
  else if (date.availability === 'limited') parts.push('limited availability')

  if (date.cutoffAt) parts.push(`order by ${formatCutoffTime(date.cutoffAt)} for same-day delivery`)

  return parts.join(', ')
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

const cellVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

const cellVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

interface CellProps extends Omit<MotionDivProps, 'children' | 'onSelect'> {
  date: AvailableDate
  isSelected: boolean
  /** Overrides the DOM `onSelect` handler — fires with the cell's ISO date. */
  onSelect: (date: string) => void
  shouldReduce: boolean
}

function Cell({
  date,
  isSelected,
  onSelect,
  shouldReduce,
  className,
  ...props
}: CellProps) {
  const { dayLabel, dayNum, isToday } = formatDateParts(date.date)
  const isUnavailable = date.availability === 'unavailable'

  return (
    <motion.div
      variants={shouldReduce ? cellVariantsReduced : cellVariants}
      className={cn('snap-start shrink-0', className)}
      {...props}
    >
      <Button
        variant="ghost"
        role="radio"
        aria-checked={isSelected}
        aria-label={buildCellLabel(date)}
        disabled={isUnavailable}
        onClick={() => onSelect(date.date)}
        className={cn(
          'flex flex-col items-center gap-1 h-auto w-[64px] md:w-[72px] py-3 px-2 rounded-xl',
          'border transition-colors duration-150',
          isSelected
            ? 'border-2 border-primary bg-primary/5 hover:bg-primary/5'
            : 'border-border hover:border-primary/40 hover:bg-muted/30',
          isUnavailable && 'opacity-40'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'text-xs font-medium uppercase tracking-wide',
            isToday ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {dayLabel}
        </span>
        <span aria-hidden="true" className="text-base md:text-lg font-semibold text-foreground leading-none">
          {dayNum}
        </span>
        <AvailabilityDot level={date.availability} aria-hidden />
      </Button>
    </motion.div>
  )
}

export function DateSelectStep({
  availableDates,
  selectedDate,
  onDateSelect,
  className,
  ...props
}: DateSelectStepProps) {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <div className={cn('space-y-3', className)} {...props}>
      <motion.div
        role="radiogroup"
        aria-label="Select delivery date"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pr-4"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {availableDates.map((date) => (
          <Cell
            key={date.date}
            date={date}
            isSelected={selectedDate === date.date}
            onSelect={onDateSelect}
            shouldReduce={shouldReduce}
          />
        ))}
      </motion.div>

    </div>
  )
}

DateSelectStep.Cell = Cell
