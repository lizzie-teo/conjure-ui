'use client'

import type { ComponentPropsWithRef } from 'react'
import { Check, CreditCard, Landmark } from 'lucide-react'
import { cn } from '../../../lib/utils'

function ApplePayMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 56 22"
      className="h-5 w-auto fill-current"
    >
      <path d="M9.6 3.1c.62-.77 1.04-1.83.93-2.9a4.04 4.04 0 0 0-2.63 1.38A3.72 3.72 0 0 0 7 4.4c1.02.08 2.07-.52 2.6-1.3zM10.55 4.6c-1.44-.08-2.67.82-3.36.82-.69 0-1.74-.78-2.87-.76A4.23 4.23 0 0 0 .77 6.8C-.73 9.6.5 13.85 1.95 16.2c.72 1.07 1.59 2.25 2.73 2.21 1.08-.04 1.49-.7 2.8-.7 1.31 0 1.68.7 2.81.68 1.18-.02 1.93-.98 2.65-2.05.83-1.18 1.17-2.33 1.19-2.39a3.67 3.67 0 0 1-2.2-3.37 3.75 3.75 0 0 1 1.78-3.18 3.84 3.84 0 0 0-3.16-1.8z" />
      <text
        x="16"
        y="15.5"
        fontSize="12"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="500"
      >
        Pay
      </text>
    </svg>
  )
}

function GooglePayMark() {
  return (
    <svg aria-hidden viewBox="0 0 56 22" className="h-5 w-auto">
      <text
        x="0"
        y="15.5"
        fontSize="13"
        fontFamily="system-ui,sans-serif"
        fontWeight="700"
        fill="#4285F4"
      >
        G
      </text>
      <text
        x="13"
        y="15.5"
        fontSize="12"
        fontFamily="system-ui,sans-serif"
        fontWeight="500"
        fill="currentColor"
      >
        Pay
      </text>
    </svg>
  )
}

const brandMarks: Record<string, React.ReactNode> = {
  card: <CreditCard className="size-5" aria-hidden />,
  'apple-pay': <ApplePayMark />,
  'google-pay': <GooglePayMark />,
  bank: <Landmark className="size-5" aria-hidden />,
}

export interface PaymentMethodCardProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  type: 'card' | 'apple-pay' | 'google-pay' | 'bank'
  label: string
  /** URL of a card network logo (e.g. `/payment-logos/cards/mastercard.svg`). When provided for `type="card"`, replaces the generic card icon. */
  networkLogoSrc?: string
  selected?: boolean
}

export function PaymentMethodCard({
  type,
  label,
  networkLogoSrc,
  selected,
  onClick,
  className,
  ...props
}: PaymentMethodCardProps) {
  const isInteractive = Boolean(onClick)

  const brandMark =
    networkLogoSrc && type === 'card' ? (
      <img
        src={networkLogoSrc}
        alt=""
        className="h-6 @md:h-5 w-auto object-contain"
        draggable={false}
      />
    ) : (
      brandMarks[type]
    )

  return (
    <div
      // Spread first: the role/tabIndex/keyboard handling below is this tile's
      // a11y contract and must not be silently overridden by a consumer prop.
      {...props}
      role={isInteractive ? 'button' : undefined}
      aria-pressed={isInteractive ? selected : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                // Dispatch a real click so `onClick` receives a genuine event.
                e.currentTarget.click()
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center gap-3 px-4 py-3 @md:py-2.5 rounded-[calc(var(--radius)+2px)] border transition-colors',
        'bg-card text-card-foreground',
        selected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border',
        isInteractive &&
          'cursor-pointer hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <span className="shrink-0 text-foreground">{brandMark}</span>
      <span className="flex-1 min-w-0 text-sm @md:text-base font-medium truncate">
        {label}
      </span>
      {selected && (
        <span className="shrink-0 text-primary">
          <Check className="size-4 @md:size-5" strokeWidth={2.5} aria-hidden />
        </span>
      )}
    </div>
  )
}
