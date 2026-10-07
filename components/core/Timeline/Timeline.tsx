'use client'

import type { ComponentPropsWithRef, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { MotionElementProps } from '../../../lib/prop-types'

// A vertical line with a dot at each stop and a card beside it. Each stop is an <li>, so the order
// is real list order for a screen reader; the line and dots are decoration.
//
// Use it only for things that happened in order — months, milestones. A rail implies time, so
// categories (Dining, Travel…) on a rail read as a sequence they are not; rank those with
// CategoryBreakdown instead.

export type TimelineProps = MotionElementProps<'ol'>

const ease = [0, 0, 0.2, 1] as const

interface StopProps extends Omit<MotionElementProps<'li'>, 'title'> {
  title: ReactNode
  /** Shown on the right of the stop's heading. Pass an `CurrencyAmount` for the price-tag figure. */
  amount?: ReactNode
  /** A word beside the amount that says what it counts, e.g. "saved". */
  amountCaption?: string
  /** The latest stop — usually "this month". Gets the solid dot; earlier stops are hollow. */
  current?: boolean
}

function Stop({ title, amount, amountCaption, current = false, children, className, ...props }: StopProps) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : 10 },
        show: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.2, ease } },
      }}
      aria-current={current ? 'step' : undefined}
      className={cn('group/stop flex gap-3 @md:gap-4', className)}
      {...props}
    >
      {/* Rail: a lead-in segment, the dot level with the heading, then the line on to the next
          stop. The first stop drops its lead-in and the last its tail, so the rail starts and
          ends on a dot rather than trailing off. */}
      <div aria-hidden="true" className="flex w-2.5 shrink-0 flex-col items-center">
        <span className="h-5 @md:h-6 w-px shrink-0 bg-primary/30 group-first/stop:invisible" />
        {/* The halo is the page colour, so the line appears to stop at the dot instead of
            running through it */}
        <span
          className={cn(
            'size-2.5 shrink-0 rounded-full ring-4',
            current ? 'bg-primary ring-primary/15' : 'border-2 border-primary/40 bg-background ring-background'
          )}
        />
        <span className="w-px flex-1 bg-primary/30 group-last/stop:hidden" />
      </div>
      <div className="min-w-0 flex-1 pb-3 @md:pb-4 group-last/stop:pb-0">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-sm)]">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="min-w-0 truncate text-sm @md:text-base font-semibold text-foreground">{title}</h3>
            {amount && (
              <p className="flex shrink-0 items-end gap-1">
                <span className="text-base @md:text-lg font-semibold tabular-nums text-primary">{amount}</span>
                {amountCaption && <span className="pb-px text-xs @md:text-sm leading-none text-muted-foreground">{amountCaption}</span>}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </motion.li>
  )
}

function List({ children, className, ...props }: ComponentPropsWithRef<'ul'>) {
  return (
    // Rows, not tiles: names line up on the left and amounts on the right, so a column of
    // figures can be scanned top to bottom
    <ul role="list" className={cn('flex flex-col divide-y divide-border', className)} {...props}>
      {children}
    </ul>
  )
}

interface ItemProps extends Omit<ComponentPropsWithRef<'li'>, 'children'> {
  /** A logo or photo. Optional: a row reads fine on its name alone. */
  src?: string
  /** Usually empty, since `name` already says what the picture is. */
  alt?: string
  name: string
  /** Pass an `CurrencyAmount` (size="sm") for the price-tag figure. */
  amount: ReactNode
}

function Item({ src, alt = '', name, amount, className, ...props }: ItemProps) {
  return (
    <li className={cn('flex items-center gap-3 py-2.5 first:pt-0 last:pb-0', className)} {...props}>
      {src && <img src={src} alt={alt} className="size-8 @md:size-9 shrink-0 rounded-full bg-muted object-cover" />}
      <span className="min-w-0 flex-1 truncate text-sm @md:text-base text-foreground">{name}</span>
      <span className="shrink-0 text-sm @md:text-base font-semibold tabular-nums text-foreground">{amount}</span>
    </li>
  )
}

export function Timeline({ children, className, ...props }: TimelineProps) {
  return (
    <motion.ol
      role="list"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      className={cn('flex flex-col', className)}
      {...props}
    >
      {children}
    </motion.ol>
  )
}

Timeline.Stop = Stop
Timeline.List = List
Timeline.Item = Item
