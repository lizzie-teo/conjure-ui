import type { ComponentPropsWithRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

// Sized by the tile's own width (container queries), not the viewport: a tile is usually half of a
// narrow card, so a wide screen says nothing about how much room the amount has. `md:` here
// overflowed — "$129.99" at text-3xl spilled out of a 160px tile on a desktop.
export const statCardBase =
  '@container relative flex min-w-0 flex-col gap-1 rounded-xl px-3 pt-3.5 pb-3 @[12rem]:px-4 @[12rem]:pt-4'

export const statCardVariantClasses = {
  default: '',
  // ring, not border-2: a thicker border would make this tile taller than its default pair
  highlight: 'ring-1',
}

export const statCardToneClasses = {
  default: '',
  // For tiles sitting on a bg-primary surface, where primary-on-primary would vanish
  inverse: '',
}

const statCardVariants = cva(statCardBase, {
  variants: {
    variant: statCardVariantClasses,
    tone: statCardToneClasses,
  },
  compoundVariants: [
    { variant: 'default', tone: 'default', class: 'border border-border bg-card' },
    { variant: 'highlight', tone: 'default', class: 'border border-primary ring-primary bg-primary/5' },
    { variant: 'default', tone: 'inverse', class: 'border border-primary-foreground/30 bg-primary-foreground/10' },
    {
      variant: 'highlight',
      tone: 'inverse',
      class: 'border border-primary-foreground ring-primary-foreground bg-primary-foreground/15',
    },
  ],
  defaultVariants: {
    variant: 'default',
    tone: 'default',
  },
})

export interface StatCardProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    VariantProps<typeof statCardVariants> {
  /** Small uppercase caption above the amount — "Value", "You pay", "Yearly". */
  label: string
  amount: number
  /** ISO 4217 code, e.g. `AUD`. */
  currency: string
  /** Render the amount as a floor — "$300+" — for estimated value. */
  orMore?: boolean
  /**
   * Pill sitting on the top edge — "Best value", "Save $49.90". It overhangs the tile by half its
   * height rather than pushing it down, so paired tiles stay level; leave room above the row.
   */
  badge?: string
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)
}

export function StatCard({
  label,
  amount,
  currency,
  orMore = false,
  badge,
  variant,
  tone,
  className,
  ...props
}: StatCardProps) {
  const inverse = tone === 'inverse'
  const highlight = variant === 'highlight'

  return (
    <div className={cn(statCardVariants({ variant, tone }), className)} {...props}>
      {badge && (
        <span
          className={cn(
            'absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide',
            inverse ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
          )}
        >
          {badge}
        </span>
      )}
      <span
        className={cn(
          'text-xs font-medium uppercase tracking-wide',
          inverse ? 'text-primary-foreground/80' : highlight ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'text-xl @[8rem]:text-2xl @[11rem]:text-3xl font-semibold tabular-nums tracking-tight',
          inverse ? 'text-primary-foreground' : highlight ? 'text-primary' : 'text-foreground'
        )}
      >
        {formatCurrency(amount, currency)}
        {orMore && '+'}
      </span>
    </div>
  )
}
