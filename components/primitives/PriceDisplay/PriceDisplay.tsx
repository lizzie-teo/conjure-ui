import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface PriceDisplayProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  amount: number
  currency: string
  strikethrough?: number
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

export function PriceDisplay({ amount, currency, strikethrough, className, ...props }: PriceDisplayProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-1.5', className)} {...props}>
      {strikethrough !== undefined && (
        <span className="text-muted-foreground line-through text-xs md:text-sm">
          {formatCurrency(strikethrough, currency)}
        </span>
      )}
      <span className="text-foreground font-semibold text-sm md:text-base">
        {formatCurrency(amount, currency)}
      </span>
    </span>
  )
}
