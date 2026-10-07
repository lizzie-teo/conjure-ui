'use client'

import { useRef, useState, type ComponentPropsWithRef, type KeyboardEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { CurrencyAmount } from '../CurrencyAmount/CurrencyAmount'
import { cn } from '../../../lib/utils'

// A value over time — savings by month, spend by week — read the way banking apps read it: the
// selected period's figure sits large above the chart, and tapping a bar moves the selection.
// Bars carry no figures of their own; one number in one place reads faster than a figure
// crowded over every bar. For a breakdown by category (unordered, often with long names) use
// CategoryBreakdown instead: horizontal rows rank better and never truncate the name.

export interface BarChartDatum {
  /** Stable id, also the value passed to `onSelect`. */
  id: string
  /** Short axis label, e.g. "May". */
  label: string
  value: number
  /** Long name for the caption and screen readers, e.g. "May 2026". Defaults to `label`. */
  fullLabel?: string
}

export interface BarChartProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onSelect' | 'defaultValue'> {
  data: BarChartDatum[]
  /** ISO 4217 code. Values are drawn as `CurrencyAmount`s. */
  currency: string
  locale?: string
  /** Accessible name for the bar group, e.g. "Savings by month". */
  label: string
  selected?: string
  /** Defaults to the last period, which is usually "now". */
  defaultSelected?: string
  onSelect?: (id: string) => void
  /** Words under the figure, e.g. (d) => `saved in ${d.fullLabel}`. */
  caption?: (datum: BarChartDatum) => ReactNode
  /** Draws a dashed reference line, e.g. a monthly average or a budget. */
  reference?: { value: number; label: string }
}

const ease = [0, 0, 0.2, 1] as const

export function BarChart({
  data,
  currency,
  locale,
  label,
  selected,
  defaultSelected,
  onSelect,
  caption = (d) => d.fullLabel ?? d.label,
  reference,
  className,
  ...props
}: BarChartProps) {
  const shouldReduce = useReducedMotion()
  const [internal, setInternal] = useState(defaultSelected ?? data[data.length - 1]?.id)
  const current = selected ?? internal
  const active = data.find((d) => d.id === current) ?? data[data.length - 1]
  const bars = useRef<(HTMLButtonElement | null)[]>([])
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency })
  const max = Math.max(...data.map((d) => d.value), reference?.value ?? 0, 0)
  const pct = (v: number) => (max > 0 ? (v / max) * 100 : 0)

  function select(id: string) {
    if (selected === undefined) setInternal(id)
    onSelect?.(id)
  }

  // Radio-group keyboard contract, as in SegmentedControl: arrows move and select
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = data.findIndex((d) => d.id === active?.id)
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? Math.min(i + 1, data.length - 1)
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? Math.max(i - 1, 0)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? data.length - 1
      : null
    if (next === null) return
    e.preventDefault()
    select(data[next].id)
    bars.current[next]?.focus()
  }

  if (!active) return null

  return (
    <div className={cn('flex flex-col gap-4 @md:gap-5', className)} {...props}>
      {/* The headline figure; aria-live so moving the selection announces the new value */}
      <div aria-live="polite" className="flex flex-col gap-1.5">
        <CurrencyAmount value={active.value} currency={currency} locale={locale} size="xl" />
        <p className="text-sm @md:text-base text-muted-foreground">{caption(active)}</p>
      </div>

      <div className="relative">
        {reference && (
          // Spans the bar area only; the axis labels sit in the bottom h-6 below it
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 bottom-6 @md:bottom-7">
            <div className="absolute inset-x-0 flex items-center gap-2" style={{ bottom: `${pct(reference.value)}%` }}>
              <span className="h-0 flex-1 border-t border-dashed border-muted-foreground/50" />
              <span className="w-12 text-xs text-muted-foreground">{reference.label}</span>
            </div>
          </div>
        )}

        <div
          role="radiogroup"
          aria-label={label}
          onKeyDown={onKeyDown}
          className={cn('flex h-40 @md:h-48 items-stretch gap-1 @md:gap-2', reference && 'pr-14')}
        >
          {data.map((d, i) => {
            const isActive = d.id === active.id
            // Floor at 3% so a near-zero period still shows as a sliver rather than vanishing
            const height = Math.max(pct(d.value), 3)
            return (
              <Button
                key={d.id}
                ref={(el) => { bars.current[i] = el }}
                variant="ghost"
                role="radio"
                aria-checked={isActive}
                aria-label={`${d.fullLabel ?? d.label}, ${money.format(d.value)}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(d.id)}
                className="group/bar h-full min-h-11 min-w-0 flex-1 flex-col items-stretch gap-2 rounded-md p-0 hover:bg-transparent"
              >
                <span className="flex flex-1 items-end justify-center">
                  {/* Bar height is data, so it must be inline. Grows with scaleY, staggered. */}
                  <motion.span
                    aria-hidden="true"
                    className={cn(
                      'block w-full max-w-10 origin-bottom rounded-md transition-colors duration-150',
                      isActive ? 'bg-primary' : 'bg-primary/20 group-hover/bar:bg-primary/35'
                    )}
                    style={{ height: `${height}%` }}
                    initial={{ scaleY: shouldReduce ? 1 : 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: shouldReduce ? 0.01 : 0.3, ease, delay: shouldReduce ? 0 : i * 0.04 }}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-4 @md:h-5 text-center text-xs @md:text-sm leading-none',
                    isActive ? 'font-semibold text-foreground' : 'font-normal text-muted-foreground'
                  )}
                >
                  {d.label}
                </span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
