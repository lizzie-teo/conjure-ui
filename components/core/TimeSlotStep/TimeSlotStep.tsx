'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Sunrise, Sun, Moon } from 'lucide-react'
import { Button } from '../../ui/button'
import { AvailabilityDot } from '../../primitives/AvailabilityDot/AvailabilityDot'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { cn } from '../../../lib/utils'
import type { TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export interface TimeSlotStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  slots: TimeSlot[]
  selectedSlotId?: string
  onSlotSelect: (slotId: string) => void
}

const periodMeta: Record<TimeOfDay, { label: string; Icon: React.ElementType }> = {
  morning:   { label: 'Morning',   Icon: Sunrise },
  afternoon: { label: 'Afternoon', Icon: Sun     },
  evening:   { label: 'Evening',   Icon: Moon    },
}

function parseHour24(timeStr: string): number {
  const [time, period] = timeStr.toLowerCase().split(' ')
  let hour = parseInt(time.split(':')[0], 10)
  if (period === 'pm' && hour !== 12) hour += 12
  if (period === 'am' && hour === 12) hour = 0
  return hour
}

function getTimeOfDay(startTime: string): TimeOfDay {
  const hour = parseHour24(startTime)
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

function buildSlotLabel(slot: TimeSlot): string {
  const parts = [`${slot.startTime} to ${slot.endTime}`]
  parts.push(slot.fee > 0
    ? new Intl.NumberFormat(undefined, { style: 'currency', currency: slot.currency }).format(slot.fee)
    : 'free')
  if (slot.availability === 'limited') parts.push('limited availability')
  if (slot.availability === 'unavailable') parts.push('unavailable')
  return parts.join(', ')
}

function defaultPeriod(slots: TimeSlot[]): TimeOfDay {
  const order: TimeOfDay[] = ['morning', 'afternoon', 'evening']
  return order.find((p) => slots.some((s) => getTimeOfDay(s.startTime) === p && s.availability !== 'unavailable'))
    ?? order.find((p) => slots.some((s) => getTimeOfDay(s.startTime) === p))
    ?? 'morning'
}

// ── Chip ──────────────────────────────────────────────────────────────────────

const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

const chipVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

interface ChipProps extends Omit<MotionDivProps, 'children' | 'onSelect' | 'slot'> {
  /** Overrides the DOM `slot` attribute — the time slot this chip renders. */
  slot: TimeSlot
  isSelected: boolean
  /** Overrides the DOM `onSelect` handler — fires with the slot id. */
  onSelect: (id: string) => void
  shouldReduce: boolean
}

function Chip({ slot, isSelected, onSelect, shouldReduce, ...props }: ChipProps) {
  const isUnavailable = slot.availability === 'unavailable'

  return (
    <motion.div variants={shouldReduce ? chipVariantsReduced : chipVariants} {...props}>
      <Button
        variant="ghost"
        role="radio"
        aria-checked={isSelected}
        aria-label={buildSlotLabel(slot)}
        disabled={isUnavailable}
        onClick={() => onSelect(slot.id)}
        className={cn(
          'h-auto flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left',
          'transition-colors duration-150 w-full',
          isSelected
            ? 'border-2 border-primary bg-primary/5 hover:bg-primary/5'
            : 'border-border hover:border-primary/40 hover:bg-muted/30',
          isUnavailable && 'opacity-40'
        )}
      >
        <div className="flex-1 min-w-0">
          <p aria-hidden="true" className="text-xs md:text-sm font-medium text-foreground leading-snug">
            {slot.startTime} – {slot.endTime}
          </p>
          {slot.fee > 0 ? (
            <PriceDisplay
              amount={slot.fee}
              currency={slot.currency}
              className="text-xs [&_span:last-child]:text-xs [&_span:last-child]:font-normal [&_span:last-child]:text-muted-foreground"
            />
          ) : (
            <span aria-hidden="true" className="text-xs text-success font-medium">Free</span>
          )}
        </div>
        <AvailabilityDot level={slot.availability} aria-hidden />
      </Button>
    </motion.div>
  )
}

// ── Slot list (animated on tab change) ────────────────────────────────────────

const listVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  exit:  { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

const listVariantsReduced = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.18 } },
  exit:   { opacity: 0, transition: { duration: 0.12 } },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

// ── Main component ────────────────────────────────────────────────────────────

export function TimeSlotStep({
  slots,
  selectedSlotId,
  onSlotSelect,
  className,
  ...props
}: TimeSlotStepProps) {
  const shouldReduce = useReducedMotion() ?? false

  const periods = (['morning', 'afternoon', 'evening'] as TimeOfDay[]).filter(
    (p) => slots.some((s) => getTimeOfDay(s.startTime) === p)
  )

  const [activePeriod, setActivePeriod] = useState<TimeOfDay>(() => defaultPeriod(slots))

  const visibleSlots = slots.filter((s) => getTimeOfDay(s.startTime) === activePeriod)

  return (
    <div className={cn('space-y-3', className)} {...props}>
      {/* Period tabs — segmented control */}
      <div
        role="tablist"
        aria-label="Delivery time of day"
        className="flex gap-1 bg-muted/50 rounded-full p-1"
      >
        {periods.map((period) => {
          const { label, Icon } = periodMeta[period]
          const isActive = activePeriod === period
          return (
            <Button
              key={period}
              role="tab"
              aria-selected={isActive}
              variant="ghost"
              size="sm"
              onClick={() => setActivePeriod(period)}
              className={cn(
                'flex items-center gap-1.5 h-8 px-3 rounded-full flex-1 transition-all duration-200',
                isActive
                  ? 'bg-background text-foreground shadow-sm hover:bg-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
              )}
            >
              <Icon aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          )
        })}
      </div>

      {/* Slot grid */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activePeriod}
          role="tabpanel"
          aria-label={`${periodMeta[activePeriod].label} delivery slots`}
          variants={shouldReduce ? listVariantsReduced : listVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 gap-2"
          >
            {visibleSlots.map((slot) => (
              <Chip
                key={slot.id}
                slot={slot}
                isSelected={selectedSlotId === slot.id}
                onSelect={onSlotSelect}
                shouldReduce={shouldReduce}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

TimeSlotStep.Chip = Chip
