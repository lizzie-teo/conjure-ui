import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface PriceDisplayProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  amount: number
  currency: string
  strikethrough?: number
  /** Words before the price, e.g. "From" when the price is a starting point. */
  prefix?: string
  /** What the price buys, e.g. "guest" → "/ guest". Shown after the price, quieter. */
  unit?: string
  /** BCP 47 locale, e.g. "en-AU" shows AUD as "$50.00" rather than "A$50.00". Defaults to the browser's. */
  locale?: string
}

function formatCurrency(amount: number, currency: string, locale?: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

export function PriceDisplay({ amount, currency, strikethrough, prefix, unit, locale, className, ...props }: PriceDisplayProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-1.5', className)} {...props}>
      {prefix && <span className="text-muted-foreground text-sm @md:text-base">{prefix}</span>}
      {strikethrough !== undefined && (
        <span className="text-muted-foreground line-through text-xs @md:text-sm">
          {formatCurrency(strikethrough, currency, locale)}
        </span>
      )}
      <span className="text-foreground font-semibold text-sm @md:text-base">
        {formatCurrency(amount, currency, locale)}
      </span>
      {unit && <span className="-ml-0.5 text-muted-foreground text-sm @md:text-base">/ {unit}</span>}
    </span>
  )
}
