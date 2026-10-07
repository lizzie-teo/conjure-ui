import type { ComponentPropsWithRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

// Money set like a price tag: the whole units carry the size, while the currency symbol and the
// cents sit small and raised. A saving reads as one figure at a glance ("$160") instead of a
// string of equal-weight characters ("$160.00"). The parts come from Intl.formatToParts, so
// the symbol lands on the correct side for every locale.

export const currencyAmountBase = 'inline-flex items-start font-heading tabular-nums leading-none tracking-tight'

export const currencyAmountSizeClasses = {
  sm: 'text-sm @md:text-base font-semibold',
  md: 'text-lg @md:text-xl font-semibold',
  lg: 'text-2xl @md:text-3xl font-semibold',
  xl: 'text-4xl @md:text-5xl font-normal',
}

export const currencyAmountToneClasses = {
  default: 'text-foreground',
  primary: 'text-primary',
  inherit: '',
}

const amountVariants = cva(currencyAmountBase, {
  variants: { size: currencyAmountSizeClasses, tone: currencyAmountToneClasses },
  defaultVariants: { size: 'md', tone: 'default' },
})

export interface CurrencyAmountProps
  extends Omit<ComponentPropsWithRef<'span'>, 'children'>,
    VariantProps<typeof amountVariants> {
  value: number
  /** ISO 4217 code, e.g. "AUD". */
  currency: string
  /** BCP 47 locale. Defaults to the browser's. */
  locale?: string
  /** Show cents even when they are zero. By default "$160.00" is set as "$160". */
  showZeroCents?: boolean
}

export function CurrencyAmount({
  value,
  currency,
  locale,
  showZeroCents = false,
  size,
  tone,
  className,
  ...props
}: CurrencyAmountProps) {
  const whole = Number.isInteger(value) && !showZeroCents
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: whole ? 0 : undefined,
    maximumFractionDigits: whole ? 0 : undefined,
  })
  const parts = formatter.formatToParts(value)

  return (
    // The visible parts are split for styling, so the full string is given once as the label
    <span className={cn(amountVariants({ size, tone }), className)} {...props}>
      <span className="sr-only">{formatter.format(value)}</span>
      <span aria-hidden="true" className="inline-flex items-start">
        {parts.map((part, i) => {
          if (part.type === 'currency') {
            return (
              <span key={i} className="mt-[0.1em] mr-[0.04em] text-[0.6em] font-medium opacity-70">
                {part.value}
              </span>
            )
          }
          if (part.type === 'decimal') return null
          if (part.type === 'fraction') {
            return (
              <span key={i} className="mt-[0.1em] ml-[0.06em] text-[0.6em] font-medium">
                {part.value}
              </span>
            )
          }
          if (part.type === 'literal') return <span key={i} className="w-[0.15em]" />
          return <span key={i}>{part.value}</span>
        })}
      </span>
    </span>
  )
}
