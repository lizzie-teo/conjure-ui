'use client'

import type { ComponentPropsWithRef } from 'react'
import { Button } from '../../ui/button'
import { CurrencyAmount } from '../../primitives/CurrencyAmount/CurrencyAmount'
import { cn } from '../../../lib/utils'
import { monthWeeks, parseISODate, weekRuns } from '../../../lib/calendar'

// A year at a glance: each month is a tile with its total and a dot-calendar where booked
// stretches draw as bars. It answers "how full is my year?" before anyone opens a month — the
// shape of the bars carries it, so no month needs reading closely. Tapping a month opens it.

export interface YearCalendarMonth {
  /** `YYYY-MM`. */
  month: string
  /** The month's total, e.g. earnings or savings. Omit to show the calendar alone. */
  total?: number
  /** ISO dates that are taken. Consecutive ones join into a bar. */
  booked?: string[]
}

export interface YearCalendarProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onSelect'> {
  months: YearCalendarMonth[]
  currency: string
  locale?: string
  weekStartsOn?: 0 | 1
  /** ISO date; its dot is ringed so "now" is findable in the year. */
  today?: string
  /** `YYYY-MM` of the month that is open, if any. */
  selected?: string
  onSelectMonth?: (month: string) => void
  /** Spoken after a month's total, e.g. (n) => `${n} nights booked`. */
  bookedLabel?: (nights: number) => string
}

export function YearCalendar({
  months,
  currency,
  locale,
  weekStartsOn = 1,
  today,
  selected,
  onSelectMonth,
  bookedLabel = (n) => (n === 1 ? '1 night booked' : `${n} nights booked`),
  className,
  ...props
}: YearCalendarProps) {
  const short = new Intl.DateTimeFormat(locale, { month: 'short' })
  const long = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 })

  return (
    <div role="list" className={cn('grid grid-cols-2 @md:grid-cols-3 gap-x-4 gap-y-6 @md:gap-x-6', className)} {...props}>
      {months.map((m) => {
        const first = parseISODate(`${m.month}-01`)
        const booked = new Set(m.booked ?? [])
        const isSelected = m.month === selected
        const label = [long.format(first), m.total !== undefined && money.format(m.total), bookedLabel(booked.size)]
          .filter(Boolean)
          .join(', ')
        return (
          <div key={m.month} role="listitem">
            <Button
              variant="ghost"
              aria-label={label}
              aria-current={isSelected ? 'date' : undefined}
              onClick={() => onSelectMonth?.(m.month)}
              className={cn(
                'h-auto w-full flex-col items-stretch gap-3 rounded-xl p-2 text-left hover:bg-muted/60',
                isSelected && 'bg-muted'
              )}
            >
              <span aria-hidden="true" className="flex flex-col gap-0.5">
                <span className="text-base @md:text-lg font-semibold text-foreground">{short.format(first)}</span>
                {m.total !== undefined && (
                  <CurrencyAmount value={m.total} currency={currency} locale={locale} size="sm" tone="inherit" className="font-normal text-muted-foreground" />
                )}
              </span>

              {/* Mini calendar: a dot per day, with booked runs drawn as one bar per week */}
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                {monthWeeks(m.month, weekStartsOn).map((week, w) => (
                  <span key={w} className="relative grid grid-cols-7">
                    {weekRuns(week, (iso) => booked.has(iso)).map((run) => (
                      <span
                        key={run.start}
                        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-foreground"
                        style={{
                          left: `calc(${(run.start / 7) * 100}% + 0.125rem)`,
                          width: `calc(${(run.length / 7) * 100}% - 0.25rem)`,
                        }}
                      />
                    ))}
                    {week.map((iso, col) => (
                      <span key={col} className="flex h-1.5 items-center justify-center">
                        {iso && !booked.has(iso) && (
                          <span
                            className={cn(
                              'size-1 rounded-full',
                              iso === today ? 'bg-foreground ring-2 ring-foreground/30' : 'bg-muted-foreground/40'
                            )}
                          />
                        )}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </Button>
          </div>
        )
      })}
    </div>
  )
}
