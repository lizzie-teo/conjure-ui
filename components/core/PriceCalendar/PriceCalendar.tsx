'use client'

import { useMemo, useRef, useState, type ComponentPropsWithRef, type KeyboardEvent } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import { daysBetween, monthWeeks, parseISODate, toISODate, weekRuns, weekdayNames } from '../../../lib/calendar'

// A month you pick a stay from, with the nightly price under every date — the pattern booking
// and hosting apps use because price is part of choosing *which* dates. Tap a first night, then
// a last night; the range draws as one continuous bar, the way people think of a stay, rather
// than seven separately highlighted squares. Booked or blocked stretches draw as a labelled bar
// too, and a range can never be stretched across one.

export interface PriceCalendarDay {
  price?: number
  /** `booked`: someone has it. `blocked`: closed by the owner. Both are unselectable. */
  status?: 'booked' | 'blocked'
}

export interface PriceCalendarRange {
  /** ISO date of the first night. */
  start?: string
  /** ISO date of the last night. */
  end?: string
}

export interface PriceCalendarProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue' | 'onChange'> {
  /** `YYYY-MM`. */
  month: string
  days?: Record<string, PriceCalendarDay>
  currency: string
  locale?: string
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1
  /** ISO date. Earlier days are greyed out and cannot be picked. */
  today?: string
  range?: PriceCalendarRange
  defaultRange?: PriceCalendarRange
  onRangeChange?: (range: PriceCalendarRange) => void
  /** Show the month name above the grid. Turn off when a header outside already says it. */
  showTitle?: boolean
  bookedLabel?: string
  blockedLabel?: string
  /** Announced as the selection changes, e.g. (n) => `${n} nights selected`. */
  nightsLabel?: (nights: number) => string
}

export function PriceCalendar({
  month,
  days = {},
  currency,
  locale,
  weekStartsOn = 1,
  today,
  range,
  defaultRange = {},
  onRangeChange,
  showTitle = true,
  bookedLabel = 'Booked',
  blockedLabel = 'Blocked',
  nightsLabel = (n) => (n === 1 ? '1 night selected' : `${n} nights selected`),
  className,
  ...props
}: PriceCalendarProps) {
  const [internal, setInternal] = useState<PriceCalendarRange>(defaultRange)
  const { start, end } = range ?? internal
  const weeks = useMemo(() => monthWeeks(month, weekStartsOn), [month, weekStartsOn])
  const dates = useMemo(() => weeks.flat().filter((d): d is string => d !== null), [weeks])
  const buttons = useRef(new Map<string, HTMLButtonElement>())

  const money = new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 })
  const fullDate = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })
  const title = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(parseISODate(`${month}-01`))

  const isPast = (iso: string) => today !== undefined && iso < today
  const isTaken = (iso: string) => days[iso]?.status !== undefined
  const isUnavailable = (iso: string) => isPast(iso) || isTaken(iso)
  const inRange = (iso: string) => !!start && !!end && iso >= start && iso <= end

  function commit(next: PriceCalendarRange) {
    if (range === undefined) setInternal(next)
    onRangeChange?.(next)
  }

  function select(iso: string) {
    if (isUnavailable(iso)) return
    if (!start || end || iso <= start) return commit({ start: iso })
    // A stay cannot run through someone else's booking: start again from the tapped day
    const crossesTaken = dates.some((d) => d > start && d < iso && isTaken(d))
    commit(crossesTaken ? { start: iso } : { start, end: iso })
  }

  // Roving focus: one tab stop for the grid, arrow keys move by day and by week
  const focusDate = start ?? (today && dates.includes(today) ? today : dates.find((d) => !isUnavailable(d)) ?? dates[0])
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const current = (document.activeElement as HTMLElement | null)?.dataset.date
    if (!current) return
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key]
    if (step === undefined) return
    e.preventDefault()
    const target = parseISODate(current)
    target.setDate(target.getDate() + step)
    buttons.current.get(toISODate(target))?.focus()
  }

  const nights = start && end ? daysBetween(start, end) + 1 : 0

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {showTitle && <h3 className="px-1 pb-3 text-lg @md:text-xl font-semibold tracking-tight text-foreground">{title}</h3>}
      <p className="sr-only" aria-live="polite">
        {nights > 0 ? nightsLabel(nights) : ''}
      </p>

      {/* isolate: the bars and dates stack with z-index inside the grid; this keeps those layers
          from rising above a sheet or header the page lays over the calendar */}
      <div role="grid" aria-label={title} onKeyDown={onKeyDown} className="isolate flex flex-col border-b border-border">
        <div role="row" className="grid grid-cols-7 pb-2">
          {weekdayNames(locale, weekStartsOn).map((name, i) => (
            <span key={i} role="columnheader" className="text-center text-xs font-medium text-muted-foreground">
              {name}
            </span>
          ))}
        </div>

        {weeks.map((week, w) => (
          <div key={w} role="row" className="relative grid grid-cols-7 border-t border-border">
            {/* Bars first, under the cells: the selected stay, then booked and blocked stretches */}
            {weekRuns(week, inRange).map((run) => {
              const runStart = week[run.start]!
              const runEnd = week[run.start + run.length - 1]!
              return (
                <span
                  key={`sel-${run.start}`}
                  aria-hidden="true"
                  className={cn(
                    // z-[1]: above the cell borders (so no grid lines cross the stay), below the dates
                    'pointer-events-none absolute inset-y-1 z-[1] bg-primary',
                    runStart === start && 'rounded-l-full',
                    runEnd === end && 'rounded-r-full'
                  )}
                  style={{ left: `${(run.start / 7) * 100}%`, width: `${(run.length / 7) * 100}%` }}
                />
              )
            })}
            {(['booked', 'blocked'] as const).flatMap((status) =>
              weekRuns(week, (iso) => days[iso]?.status === status).map((run) => (
                <span
                  key={`${status}-${run.start}`}
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute bottom-1.5 z-[3] flex h-6 items-center truncate rounded-full border border-border px-2.5 text-xs text-muted-foreground',
                    status === 'booked' ? 'bg-card shadow-[var(--shadow-sm)]' : 'bg-muted'
                  )}
                  style={{ left: `calc(${(run.start / 7) * 100}% + 0.25rem)`, width: `calc(${(run.length / 7) * 100}% - 0.5rem)` }}
                >
                  {/* One cell is too narrow for the word; the bar alone still says "taken" */}
                  {run.length > 1 && (status === 'booked' ? bookedLabel : blockedLabel)}
                </span>
              ))
            )}

            {week.map((iso, col) => {
              if (!iso) {
                return <span key={`empty-${col}`} role="gridcell" className={cn(col > 0 && 'border-l border-border')} />
              }
              const day = days[iso]
              const selected = inRange(iso) || iso === start
              const pendingStart = iso === start && !end
              const unavailable = isUnavailable(iso)
              const label = [
                fullDate.format(parseISODate(iso)),
                day?.price !== undefined && !day.status && money.format(day.price),
                day?.status === 'booked' && bookedLabel,
                day?.status === 'blocked' && blockedLabel,
                today === iso && 'today',
              ]
                .filter(Boolean)
                .join(', ')
              return (
                <div key={iso} role="gridcell" aria-selected={selected} className={cn('relative', col > 0 && 'border-l border-border')}>
                  <Button
                    ref={(el) => {
                      if (el) buttons.current.set(iso, el)
                      else buttons.current.delete(iso)
                    }}
                    variant="ghost"
                    data-date={iso}
                    aria-label={label}
                    aria-disabled={unavailable || undefined}
                    tabIndex={iso === focusDate ? 0 : -1}
                    onClick={() => select(iso)}
                    className={cn(
                      'relative z-[2] h-16 @md:h-[4.5rem] w-full flex-col items-center justify-start gap-0.5 rounded-none px-0 pt-2.5',
                      'text-sm @md:text-base font-semibold tabular-nums hover:bg-transparent',
                      inRange(iso)
                        ? 'text-primary-foreground hover:text-primary-foreground'
                        : unavailable
                          ? 'cursor-default font-normal text-muted-foreground hover:text-muted-foreground'
                          : 'text-foreground hover:bg-muted/60',
                      pendingStart && 'rounded-lg ring-2 ring-inset ring-foreground',
                      today === iso && !selected && 'underline decoration-2 underline-offset-4'
                    )}
                  >
                    {parseISODate(iso).getDate()}
                    {day?.price !== undefined && !day.status && (
                      <span className={cn('text-xs font-medium', isPast(iso) && 'line-through', !inRange(iso) && !unavailable && 'text-muted-foreground')}>
                        {money.format(day.price)}
                      </span>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
