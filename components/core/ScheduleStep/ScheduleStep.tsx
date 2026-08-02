'use client'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { DateSelectStep } from '../DateSelectStep/DateSelectStep'
import { TimeSlotStep } from '../TimeSlotStep/TimeSlotStep'
import { AvailabilityDot } from '../../primitives/AvailabilityDot/AvailabilityDot'
import { cn } from '../../../lib/utils'
import type { AvailableDate, TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types'
import type { ComponentPropsWithRef } from 'react'

export interface ScheduleStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  availableDates: AvailableDate[]
  timeSlots: TimeSlot[]
  slotsByDate?: Record<string, TimeSlot[]>
  selectedDate?: string
  selectedSlotId?: string
  onDateSelect: (date: string) => void
  onSlotSelect: (slotId: string) => void
}

function formatDayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day))
}

const slotsVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

const slotsVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export function ScheduleStep({
  availableDates,
  timeSlots,
  slotsByDate,
  selectedDate,
  selectedSlotId,
  onDateSelect,
  onSlotSelect,
  className,
  ...props
}: ScheduleStepProps) {
  const shouldReduce = useReducedMotion()

  const visibleSlots =
    selectedDate && slotsByDate?.[selectedDate]
      ? slotsByDate[selectedDate]
      : timeSlots

  function handleDateSelect(date: string) {
    if (date !== selectedDate) onSlotSelect('')
    onDateSelect(date)
  }

  return (
    <div className={cn('space-y-3', className)} {...props}>

      {/* ── Date section ─────────────────────────────────── */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-primary/8">
          <p className="text-sm font-semibold text-primary">Choose a date</p>
        </div>
        <div className="px-4 pt-4 pb-3">
          <DateSelectStep
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-muted/20">
          <AvailabilityDot level="available" showLabel />
          <AvailabilityDot level="limited" showLabel />
        </div>
      </div>

      {/* ── Time section ─────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false}>
        {selectedDate ? (
          <motion.div
            key={selectedDate}
            variants={shouldReduce ? slotsVariantsReduced : slotsVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="rounded-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-primary/8">
              <CalendarDays aria-hidden="true" className="size-3.5 text-primary shrink-0" />
              <p className="text-sm font-semibold text-primary">
                {formatDayDate(selectedDate)}
              </p>
            </div>
            <div className="p-4">
              <TimeSlotStep
                slots={visibleSlots}
                selectedSlotId={selectedSlotId}
                onSlotSelect={onSlotSelect}
              />
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="prompt"
            variants={shouldReduce ? slotsVariantsReduced : slotsVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="text-xs md:text-sm text-muted-foreground text-center py-1"
          >
            Pick a date above to see available times
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
