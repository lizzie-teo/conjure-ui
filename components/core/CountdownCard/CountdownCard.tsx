import type { ComponentPropsWithRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../../lib/utils'

// "Something you booked is coming up": a reminder card with a tear-off calendar tile that counts
// down the days. The tile is built from tokens (a primary binding strip over a card page), so it
// follows any brand — no illustration to source. The title's link stretches over the card.

export type CountdownCardProps = ComponentPropsWithRef<'article'>

function Body({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn('flex min-w-0 flex-1 flex-col gap-1', className)} {...props}>
      {children}
    </div>
  )
}

interface TitleProps extends ComponentPropsWithRef<'h3'> {
  href?: string
}

function Title({ href, children, className, ...props }: TitleProps) {
  return (
    <h3 className={cn('text-base @md:text-lg font-semibold leading-snug text-foreground text-balance', className)} {...props}>
      {href ? (
        <a
          href={href}
          className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </h3>
  )
}

// The detail line ends in a chevron: the cue that the card opens something
function Meta({ children, className, ...props }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={cn('flex items-center gap-0.5 text-xs @md:text-sm text-muted-foreground', className)} {...props}>
      {children}
      <ChevronRight
        aria-hidden="true"
        className="size-3.5 @md:size-4 transition-transform duration-200 ease-out group-has-[h3_a:hover]/countdown:translate-x-0.5 motion-reduce:transition-none"
      />
    </p>
  )
}

interface DaysProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  days: number
  /** Words above and below the number. */
  before?: string
  unit?: (days: number) => string
}

function Days({ days, before = 'Starts in', unit = (n) => (n === 1 ? 'day' : 'days'), className, ...props }: DaysProps) {
  return (
    // Spoken once as a sentence; the stacked visual parts are hidden
    <div
      className={cn(
        'relative flex w-16 @md:w-20 shrink-0 -rotate-3 flex-col overflow-hidden rounded-lg border border-border bg-card text-center shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      <span className="sr-only">{`${before} ${days} ${unit(days)}`}</span>
      <span aria-hidden="true" className="h-2.5 @md:h-3 bg-primary" />
      <span aria-hidden="true" className="flex flex-col items-center py-1.5 @md:py-2">
        <span className="text-[0.5625rem] @md:text-[0.625rem] font-semibold uppercase leading-none tracking-wide text-muted-foreground">
          {before}
        </span>
        <span className="font-heading text-3xl @md:text-4xl font-semibold leading-tight tabular-nums text-primary">{days}</span>
        <span className="text-[0.5625rem] @md:text-[0.625rem] font-semibold uppercase leading-none tracking-wide text-muted-foreground">
          {unit(days)}
        </span>
      </span>
    </div>
  )
}

export function CountdownCard({ children, className, ...props }: CountdownCardProps) {
  return (
    <article
      className={cn(
        'group/countdown relative flex items-center gap-4 rounded-2xl border border-border bg-card p-4 @md:p-5',
        'shadow-[var(--shadow-card)] transition-shadow duration-200 has-[h3_a:hover]:shadow-[var(--shadow-elevated)]',
        className
      )}
      {...props}
    >
      {children}
    </article>
  )
}

CountdownCard.Body = Body
CountdownCard.Title = Title
CountdownCard.Meta = Meta
CountdownCard.Days = Days
