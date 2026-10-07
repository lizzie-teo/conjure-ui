'use client'

import { useRef, useState, type ComponentPropsWithRef, type KeyboardEvent, type ReactNode } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, List as ListIcon } from 'lucide-react'
import { Button } from '../../ui/button'
import { SegmentedControl } from '../../primitives/SegmentedControl/SegmentedControl'
import { cn } from '../../../lib/utils'

// "What's on, and when?" A seven-day strip that filters whatever sits under it — the date-strip
// pattern of event and booking apps. Each day shows how much is on (up to three dots) so people
// can see the busy days before tapping, and arrows step a week at a time. The strip *is* the
// calendar, so the list/calendar switch is opt-in rather than a fixture of the header. Offers are
// children, not data, so this never has to know what an offer looks like (and core never
// imports core).

export type WeekCalendarView = 'list' | 'calendar'

export type WeekCalendarProps = ComponentPropsWithRef<'section'>

interface HeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title: ReactNode
  /** Pass `view` or `onViewChange` to show a list/calendar switch. Omit both for none. */
  view?: WeekCalendarView
  defaultView?: WeekCalendarView
  onViewChange?: (view: WeekCalendarView) => void
  listLabel?: string
  calendarLabel?: string
}

function Header({
  title,
  view,
  defaultView = 'calendar',
  onViewChange,
  listLabel = 'List view',
  calendarLabel = 'Calendar view',
  className,
  ...props
}: HeaderProps) {
  const showSwitch = view !== undefined || onViewChange !== undefined
  return (
    <div className={cn('flex items-center justify-between gap-3', className)} {...props}>
      <h2 className="min-w-0 text-lg @md:text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      {showSwitch && (
        <SegmentedControl
          iconOnly
          aria-label="View"
          className="shrink-0"
          value={view}
          defaultValue={defaultView}
          onValueChange={(v) => onViewChange?.(v as WeekCalendarView)}
          options={[
            { value: 'list', label: listLabel, icon: <ListIcon /> },
            { value: 'calendar', label: calendarLabel, icon: <CalendarDays /> },
          ]}
        />
      )}
    </div>
  )
}

export interface WeekCalendarDay {
  /** ISO date, `YYYY-MM-DD`. Read as a local date, so it never shifts a day across time zones. */
  date: string
  /** How many offers are on. Drawn as up to three dots and spoken in full. */
  offers?: number
}

interface WeekProps extends Omit<ComponentPropsWithRef<'div'>, 'onSelect' | 'defaultValue'> {
  days: WeekCalendarDay[]
  /** Heading above the strip, e.g. "21 – 27 Sep 2026". */
  rangeLabel?: ReactNode
  selected?: string
  defaultSelected?: string
  onSelect?: (date: string) => void
  /** Show ‹ › buttons beside the range. */
  onPrevious?: () => void
  onNext?: () => void
  previousLabel?: string
  nextLabel?: string
  /** BCP 47 locale for weekday and date names. Defaults to the browser's. */
  locale?: string
  /** ISO date of today, if it falls in this week. Drawn with a ring and spoken as "today". */
  today?: string
  todayLabel?: string
  /** Spoken count, e.g. (n) => `${n} offers`. */
  offersLabel?: (count: number) => string
}

function parseLocal(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function Week({
  days,
  rangeLabel,
  selected,
  defaultSelected,
  onSelect,
  onPrevious,
  onNext,
  previousLabel = 'Previous week',
  nextLabel = 'Next week',
  locale,
  today,
  todayLabel = 'today',
  offersLabel = (n) => (n === 1 ? '1 offer' : `${n} offers`),
  children,
  className,
  ...props
}: WeekProps) {
  const [internal, setInternal] = useState(defaultSelected)
  const current = selected ?? internal
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
  const full = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })
  // Roving focus lands on the selected day, else today, else the first day
  const focusIndex = Math.max(
    days.findIndex((d) => d.date === (current ?? today)),
    0
  )

  function select(date: string) {
    if (selected === undefined) setInternal(date)
    onSelect?.(date)
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = days.findIndex((d) => d.date === document.activeElement?.getAttribute('data-date'))
    if (i < 0) return
    const next =
      e.key === 'ArrowRight' ? Math.min(i + 1, days.length - 1)
      : e.key === 'ArrowLeft' ? Math.max(i - 1, 0)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? days.length - 1
      : null
    if (next === null) return
    e.preventDefault()
    select(days[next].date)
    buttons.current[next]?.focus()
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 @md:gap-4 rounded-xl border border-border bg-card p-4 @md:p-5 shadow-[var(--shadow-sm)]',
        className
      )}
      {...props}
    >
      {(rangeLabel || onPrevious || onNext) && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs @md:text-sm font-medium uppercase tracking-wide text-muted-foreground">{rangeLabel}</p>
          {(onPrevious || onNext) && (
            <div className="-my-2 -mr-2 flex items-center gap-2">
              <Button variant="ghost" aria-label={previousLabel} onClick={onPrevious} disabled={!onPrevious} className="size-9 @md:size-8 pointer-coarse:size-11 rounded-full p-0 text-muted-foreground hover:text-foreground">
                <ChevronLeft className="size-4 @md:size-5" />
              </Button>
              <Button variant="ghost" aria-label={nextLabel} onClick={onNext} disabled={!onNext} className="size-9 @md:size-8 pointer-coarse:size-11 rounded-full p-0 text-muted-foreground hover:text-foreground">
                <ChevronRight className="size-4 @md:size-5" />
              </Button>
            </div>
          )}
        </div>
      )}
      <div
        role="radiogroup"
        aria-label={typeof rangeLabel === 'string' ? rangeLabel : 'Choose a day'}
        onKeyDown={onKeyDown}
        className="grid grid-cols-7 gap-1 text-center"
      >
        {days.map((day, i) => {
          const date = parseLocal(day.date)
          const isSelected = day.date === current
          const isToday = day.date === today
          const count = day.offers ?? 0
          const name = [full.format(date), isToday && todayLabel, count > 0 ? offersLabel(count) : 'no offers']
            .filter(Boolean)
            .join(', ')
          return (
            <div key={day.date} className="flex flex-col items-center gap-1 @md:gap-2">
              <span aria-hidden="true" className="text-xs @md:text-sm font-medium text-muted-foreground">
                {weekday.format(date)}
              </span>
              <Button
                ref={(el) => { buttons.current[i] = el }}
                variant="ghost"
                role="radio"
                aria-checked={isSelected}
                aria-label={name}
                data-date={day.date}
                tabIndex={i === focusIndex ? 0 : -1}
                onClick={() => select(day.date)}
                className={cn(
                  'relative size-10 @md:size-11 pointer-coarse:size-11 flex-col gap-0 rounded-full p-0',
                  'text-sm @md:text-base font-semibold tabular-nums transition-colors duration-100',
                  isSelected
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                    : count > 0
                      ? 'text-foreground'
                      : 'font-normal text-muted-foreground',
                  isToday && !isSelected && 'ring-1 ring-inset ring-primary/40'
                )}
              >
                {date.getDate()}
                {/* Dots, the calendar convention for "something on" — one per offer, up to three,
                    so a busy day reads as busy before it is tapped */}
                <span aria-hidden="true" className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                  {Array.from({ length: Math.min(count, 3) }, (_, k) => (
                    <span
                      key={k}
                      className={cn('size-1 rounded-full', isSelected ? 'bg-primary-foreground' : 'bg-primary')}
                    />
                  ))}
                </span>
              </Button>
            </div>
          )
        })}
      </div>
      {children}
    </div>
  )
}

function Divider({ className, ...props }: ComponentPropsWithRef<'hr'>) {
  return <hr className={cn('border-border', className)} {...props} />
}

function List({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-2 @md:gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export function WeekCalendar({ children, className, ...props }: WeekCalendarProps) {
  return (
    <section className={cn('flex flex-col gap-4 @md:gap-6', className)} {...props}>
      {children}
    </section>
  )
}

WeekCalendar.Header = Header
WeekCalendar.Week = Week
WeekCalendar.Divider = Divider
WeekCalendar.List = List
