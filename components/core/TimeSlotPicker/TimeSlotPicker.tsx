'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { CalendarDays, Sunrise, Sun, Moon } from 'lucide-react'
import { Button } from '../../ui/button'
import { AvailabilityDot } from '../../primitives/AvailabilityDot/AvailabilityDot'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { cn } from '../../../lib/utils'
import type { AvailabilityLevel } from '../../primitives/AvailabilityDot/AvailabilityDot'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

/**
 * Pick a date, then a time within it. Fulfilment, appointments, viewings,
 * consultations, collection windows — anything booked against a calendar.
 *
 * Deliberately knows nothing about what is being booked. Copy arrives through
 * `labels`; what a slot costs is optional.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type { AvailabilityLevel }

export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export interface PickableDate {
  /** ISO date, `YYYY-MM-DD`. */
  date: string
  availability: AvailabilityLevel
  /** ISO datetime after which this date can no longer be booked. */
  cutoffAt?: string
}

export interface PickableSlot {
  id: string
  /** Display time, e.g. `9:00 am`. Parsed only to group slots by time of day. */
  startTime: string
  endTime: string
  availability: AvailabilityLevel
  /** Omit for slots that cost nothing to book. */
  fee?: number
  currency?: string
}

export interface TimeSlotPickerLabels {
  /** Heading above the date rail. */
  dateHeading?: string
  /** Accessible name for the date rail itself. */
  dateGroup?: string
  /** Shown in place of the slot grid until a date is chosen. */
  slotPrompt?: string
  /** Accessible name for the morning/afternoon/evening tabs. */
  timeOfDayGroup?: string
  /** Trailing text on a zero-fee slot. */
  free?: string
}

export interface TimeSlotPickerProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  dates: PickableDate[]
  /** Slots offered when the chosen date has no entry in `slotsByDate`. */
  slots: PickableSlot[]
  /** Per-date slot overrides, keyed by ISO date. */
  slotsByDate?: Record<string, PickableSlot[]>
  selectedDate?: string
  selectedSlotId?: string
  onDateSelect: (date: string) => void
  onSlotSelect: (slotId: string) => void
  labels?: TimeSlotPickerLabels
}

const DEFAULT_LABELS: Required<TimeSlotPickerLabels> = {
  dateHeading: 'Choose a date',
  dateGroup: 'Select a date',
  slotPrompt: 'Pick a date above to see available times',
  timeOfDayGroup: 'Time of day',
  free: 'Free',
}

// ── Date formatting ───────────────────────────────────────────────────────────

function parseDateLocal(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDateParts(isoDate: string): { dayLabel: string; dayNum: string; isToday: boolean } {
  const date = parseDateLocal(isoDate)
  const today = new Date()
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  return {
    dayLabel: isToday
      ? 'Today'
      : new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date),
    dayNum: new Intl.DateTimeFormat(undefined, { day: 'numeric' }).format(date),
    isToday,
  }
}

function formatFullDate(isoDate: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(parseDateLocal(isoDate))
}

function formatCutoffTime(isoString: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(isoString))
}

function buildDateLabel(date: PickableDate): string {
  const { isToday } = formatDateParts(date.date)
  const full = formatFullDate(date.date)
  const parts: string[] = [isToday ? `Today, ${full}` : full]

  if (date.availability === 'unavailable') parts.push('unavailable')
  else if (date.availability === 'limited') parts.push('limited availability')

  if (date.cutoffAt) parts.push(`order by ${formatCutoffTime(date.cutoffAt)}`)

  return parts.join(', ')
}

// ── Slot grouping ─────────────────────────────────────────────────────────────

const periodMeta: Record<TimeOfDay, { label: string; Icon: React.ElementType }> = {
  morning: { label: 'Morning', Icon: Sunrise },
  afternoon: { label: 'Afternoon', Icon: Sun },
  evening: { label: 'Evening', Icon: Moon },
}

const PERIOD_ORDER: TimeOfDay[] = ['morning', 'afternoon', 'evening']

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

/**
 * Keeps `9:30 am` from breaking between the clock and the meridiem, so the only
 * wrap point a chip offers is the dash between the two times. Display only —
 * the accessible name keeps ordinary spaces.
 */
function unbreakable(time: string): string {
  return time.replace(/\s+/g, '\u00A0')
}

function buildSlotLabel(slot: PickableSlot, freeLabel: string): string {
  const parts = [`${slot.startTime} to ${slot.endTime}`]
  parts.push(
    slot.fee && slot.fee > 0
      ? new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: slot.currency ?? 'USD',
        }).format(slot.fee)
      : freeLabel
  )
  if (slot.availability === 'limited') parts.push('limited availability')
  if (slot.availability === 'unavailable') parts.push('unavailable')
  return parts.join(', ')
}

function defaultPeriod(slots: PickableSlot[]): TimeOfDay {
  return (
    PERIOD_ORDER.find(p =>
      slots.some(s => getTimeOfDay(s.startTime) === p && s.availability !== 'unavailable')
    ) ??
    PERIOD_ORDER.find(p => slots.some(s => getTimeOfDay(s.startTime) === p)) ??
    'morning'
  )
}

// ── Motion ────────────────────────────────────────────────────────────────────

const EASE_OUT = [0, 0, 0.2, 1] as [number, number, number, number]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

const cellVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_OUT } },
}

const cellVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_OUT } },
}

const chipVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

const panelVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const listVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: EASE_OUT } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

const listVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface DateCellProps extends Omit<MotionDivProps, 'children' | 'onSelect'> {
  date: PickableDate
  isSelected: boolean
  /** Overrides the DOM `onSelect` handler — fires with the cell's ISO date. */
  onSelect: (date: string) => void
  shouldReduce: boolean
}

function DateCell({ date, isSelected, onSelect, shouldReduce, className, ...props }: DateCellProps) {
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
        aria-label={buildDateLabel(date)}
        disabled={isUnavailable}
        onClick={() => onSelect(date.date)}
        className={cn(
          'flex flex-col items-center justify-center gap-1 px-2',
          'h-auto min-h-19 @md:min-h-21 w-16 @md:w-18 py-2.5 @md:py-3 rounded-xl',
          // Selection is an inset ring, not a thicker border: a 2px border would
          // grow the cell by 1px per edge and shunt the whole rail sideways.
          'border border-border transition-colors duration-150',
          isSelected
            ? 'border-primary ring-2 ring-inset ring-primary bg-primary/5 hover:bg-primary/5'
            : 'hover:border-primary/40 hover:bg-muted/30'
          // No extra opacity for unavailable — `Button` already applies
          // `disabled:opacity-50`, and stacking a second fade drops the cell to
          // ~20% alpha, well below any legible contrast.
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'text-xs @md:text-sm font-medium uppercase tracking-wide',
            isToday ? 'text-primary' : isSelected ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {dayLabel}
        </span>
        <span
          aria-hidden="true"
          className="text-base @md:text-lg font-semibold text-foreground leading-none"
        >
          {dayNum}
        </span>
        <AvailabilityDot level={date.availability} aria-hidden />
      </Button>
    </motion.div>
  )
}

interface DateRailProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  dates: PickableDate[]
  selectedDate?: string
  onDateSelect: (date: string) => void
  label?: string
}

function DateRail({
  dates,
  selectedDate,
  onDateSelect,
  label = DEFAULT_LABELS.dateGroup,
  className,
  ...props
}: DateRailProps) {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <div className={cn('space-y-3 @md:space-y-4', className)} {...props}>
      <motion.div
        role="radiogroup"
        aria-label={label}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cn(
          'flex gap-2 @md:gap-3 overflow-x-auto scroll-smooth snap-x snap-proximity',
          // `overflow-x: auto` computes `overflow-y` to `auto` too, so the cells'
          // outset focus ring is clipped top and bottom without this padding.
          // The negative margin keeps the rail optically flush with the header.
          '-mx-1 px-1 py-1 pb-2 scroll-px-1 pr-6',
          // The rail is wider than the card on purpose — fade the cut-off cell
          // instead of chopping it mid-glyph against the card edge. A mask reads
          // alpha only, so `currentColor` just means "fully opaque here"; it
          // carries no colour decision and needs no token. Tailwind's own
          // `mask-r-*` utilities compose six layers and cancel this out, hence
          // the single explicit declaration.
          '[mask-image:linear-gradient(to_right,currentColor_calc(100%-1.25rem),transparent)]'
        )}
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {dates.map(date => (
          <DateCell
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

interface SlotChipProps extends Omit<MotionDivProps, 'children' | 'onSelect' | 'slot'> {
  /** Overrides the DOM `slot` attribute — the slot this chip renders. */
  slot: PickableSlot
  isSelected: boolean
  /** Overrides the DOM `onSelect` handler — fires with the slot id. */
  onSelect: (id: string) => void
  shouldReduce: boolean
  freeLabel: string
}

function SlotChip({ slot, isSelected, onSelect, shouldReduce, freeLabel, ...props }: SlotChipProps) {
  const isUnavailable = slot.availability === 'unavailable'
  const hasFee = Boolean(slot.fee && slot.fee > 0)

  return (
    <motion.div variants={shouldReduce ? chipVariantsReduced : chipVariants} {...props}>
      <Button
        variant="ghost"
        role="radio"
        aria-checked={isSelected}
        aria-label={buildSlotLabel(slot, freeLabel)}
        disabled={isUnavailable}
        onClick={() => onSelect(slot.id)}
        className={cn(
          // `h-full`, not `h-auto`: grid rows stretch, so a chip that wraps to
          // two lines would otherwise leave its shorter neighbour floating with
          // a mismatched bottom border.
          'h-full w-full pointer-coarse:min-h-11 flex flex-col items-start justify-center gap-0.5',
          'px-3 py-2.5 @md:px-3.5 @md:py-3 rounded-xl text-left',
          // `Button`'s base is `whitespace-nowrap`; left alone, a time range
          // wider than its grid column paints straight over the dot beside it.
          'whitespace-normal',
          // Inset ring rather than a 2px border, so selecting a chip does not
          // resize it and reflow the grid row.
          'border border-border transition-colors duration-150',
          isSelected
            ? 'border-primary ring-2 ring-inset ring-primary bg-primary/5 hover:bg-primary/5'
            : 'hover:border-primary/40 hover:bg-muted/30'
          // `disabled:opacity-50` on `Button` is the only fade — a second one
          // stacked on top left unavailable slots at ~20% alpha.
        )}
      >
        {/*
          The dot reads as a marker on the time itself, so it sits on the time
          row — `items-start` and a small optical offset keep it on the first
          line even when a long range wraps. `min-w-0 flex-1` on the time is
          what stops it painting over the dot instead of wrapping.
        */}
        <span className="flex w-full items-start gap-2">
          <span
            aria-hidden="true"
            className={cn(
              'min-w-0 flex-1 text-xs @md:text-sm font-medium text-foreground leading-snug',
              isUnavailable && 'line-through'
            )}
          >
            {unbreakable(slot.startTime)} – {unbreakable(slot.endTime)}
          </span>
          <AvailabilityDot
            level={slot.availability}
            aria-hidden
            className="shrink-0 mt-0.5 @md:mt-1"
          />
        </span>
        {hasFee ? (
          <PriceDisplay
            amount={slot.fee as number}
            currency={slot.currency ?? 'USD'}
            className="min-w-0 text-xs @md:text-sm [&_span:last-child]:text-xs @md:[&_span:last-child]:text-sm [&_span:last-child]:font-normal [&_span:last-child]:text-muted-foreground"
          />
        ) : (
          <span aria-hidden="true" className="text-xs @md:text-sm text-success font-medium">
            {freeLabel}
          </span>
        )}
      </Button>
    </motion.div>
  )
}

interface SlotGridProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  slots: PickableSlot[]
  selectedSlotId?: string
  onSlotSelect: (slotId: string) => void
  groupLabel?: string
  freeLabel?: string
}

function SlotGrid({
  slots,
  selectedSlotId,
  onSlotSelect,
  groupLabel = DEFAULT_LABELS.timeOfDayGroup,
  freeLabel = DEFAULT_LABELS.free,
  className,
  ...props
}: SlotGridProps) {
  const shouldReduce = useReducedMotion() ?? false

  const periods = PERIOD_ORDER.filter(p => slots.some(s => getTimeOfDay(s.startTime) === p))
  const [activePeriod, setActivePeriod] = useState<TimeOfDay>(() => defaultPeriod(slots))

  // The chosen date can change under us, leaving `activePeriod` on a tab this
  // date has no slots for — fall back to one it does.
  const period = periods.includes(activePeriod) ? activePeriod : (periods[0] ?? activePeriod)
  const visibleSlots = slots.filter(s => getTimeOfDay(s.startTime) === period)

  return (
    <div className={cn('space-y-3 @md:space-y-4', className)} {...props}>
      <div role="tablist" aria-label={groupLabel} className="flex gap-1 bg-muted/50 rounded-full p-1">
        {periods.map(p => {
          const { label, Icon } = periodMeta[p]
          const isActive = period === p
          return (
            <Button
              key={p}
              role="tab"
              aria-selected={isActive}
              variant="ghost"
              size="sm"
              onClick={() => setActivePeriod(p)}
              className={cn(
                'flex items-center gap-1.5 h-8 pointer-coarse:min-h-11 px-3 rounded-full flex-1 transition-all duration-200',
                isActive
                  ? 'bg-background text-foreground shadow-sm hover:bg-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
              )}
            >
              <Icon aria-hidden="true" className="size-3.5 @md:size-4 shrink-0" />
              <span className="text-xs @md:text-sm font-medium">{label}</span>
            </Button>
          )
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={period}
          role="tabpanel"
          aria-label={periodMeta[period].label}
          variants={shouldReduce ? listVariantsReduced : listVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            // Columns are sized by what a time range actually needs, not by
            // viewport: `md:grid-cols-3` made chips *narrower* on wider screens,
            // because the picker's own width barely changes at that breakpoint.
            className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-2 @md:gap-2.5"
          >
            {visibleSlots.map(slot => (
              <SlotChip
                key={slot.id}
                slot={slot}
                isSelected={selectedSlotId === slot.id}
                onSelect={onSlotSelect}
                shouldReduce={shouldReduce}
                freeLabel={freeLabel}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function TimeSlotPicker({
  dates,
  slots,
  slotsByDate,
  selectedDate,
  selectedSlotId,
  onDateSelect,
  onSlotSelect,
  labels,
  className,
  ...props
}: TimeSlotPickerProps) {
  const shouldReduce = useReducedMotion()
  const copy = { ...DEFAULT_LABELS, ...labels }

  const visibleSlots =
    selectedDate && slotsByDate?.[selectedDate] ? slotsByDate[selectedDate] : slots

  function handleDateSelect(date: string) {
    // Moving to another date invalidates the slot held for the old one.
    if (date !== selectedDate) onSlotSelect('')
    onDateSelect(date)
  }

  return (
    <div className={cn('space-y-3 @md:space-y-4', className)} {...props}>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="px-4 @md:px-5 py-3 border-b border-border bg-primary/8">
          <p className="text-sm @md:text-base font-semibold text-primary">{copy.dateHeading}</p>
        </div>
        <div className="px-4 @md:px-5 pt-4 @md:pt-5 pb-3 @md:pb-4">
          <TimeSlotPicker.DateRail
            dates={dates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            label={copy.dateGroup}
          />
        </div>
        <div className="flex items-center gap-4 @md:gap-6 px-4 @md:px-5 py-2.5 border-t border-border bg-muted/20">
          <AvailabilityDot level="available" showLabel />
          <AvailabilityDot level="limited" showLabel />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {selectedDate ? (
          // Keyed on "panel", not on `selectedDate`: keying on the date tore the
          // whole card down and rebuilt it on every change, and `mode="wait"`
          // meant the container hit zero height in between, so everything below
          // the picker jumped up and back. Only the heading swaps now.
          <motion.div
            key="panel"
            variants={shouldReduce ? panelVariantsReduced : panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="rounded-2xl border border-border overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 @md:px-5 py-3 border-b border-border bg-primary/8">
              <CalendarDays aria-hidden="true" className="size-3.5 @md:size-4 text-primary shrink-0" />
              <motion.p
                key={selectedDate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduce ? 0 : 0.18, ease: EASE_OUT }}
                className="text-sm @md:text-base font-semibold text-primary"
              >
                {formatFullDate(selectedDate)}
              </motion.p>
            </div>
            <div className="p-4 @md:p-5">
              <TimeSlotPicker.SlotGrid
                slots={visibleSlots}
                selectedSlotId={selectedSlotId}
                onSlotSelect={onSlotSelect}
                groupLabel={copy.timeOfDayGroup}
                freeLabel={copy.free}
              />
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="prompt"
            variants={shouldReduce ? panelVariantsReduced : panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="text-xs @md:text-sm text-muted-foreground text-center py-1"
          >
            {copy.slotPrompt}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

TimeSlotPicker.DateRail = DateRail
TimeSlotPicker.DateCell = DateCell
TimeSlotPicker.SlotGrid = SlotGrid
TimeSlotPicker.SlotChip = SlotChip
