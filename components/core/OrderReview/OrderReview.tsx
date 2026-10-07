'use client'

import { Button } from '../../ui/button'
import { CartItem } from '../CartItem/CartItem'
import type { CartItemProps } from '../CartItem/CartItem'
import { KeyValueList } from '../KeyValueList/KeyValueList'
import { AddressCard } from '../../primitives/AddressCard/AddressCard'
import type { AddressCardProps } from '../../primitives/AddressCard/AddressCard'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { cn } from '../../../lib/utils'
import type { ComponentProps, ComponentPropsWithRef } from 'react'

// ── Sub-component interfaces ──────────────────────────────────────────────────

interface SectionProps extends ComponentPropsWithRef<'div'> {
  title: string
}

interface TotalsProps extends Omit<ComponentProps<typeof KeyValueList>, 'children'> {
  subtotal: number
  shipping: number
  total: number
  currency: string
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, children, className, ...props }: SectionProps) {
  return (
    <div className={cn('space-y-2 @md:space-y-3', className)} {...props}>
      <h3 className="text-xs @md:text-sm font-semibold text-muted-foreground uppercase tracking-wide px-4 @md:px-5">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Totals({ subtotal, shipping, total, currency, ...props }: TotalsProps) {
  return (
    <KeyValueList {...props}>
      <KeyValueList.Row
        label="Subtotal"
        value={<PriceDisplay amount={subtotal} currency={currency} />}
      />
      <KeyValueList.Row
        label="Shipping"
        value={
          shipping === 0 ? (
            <span className="text-xs @md:text-sm font-medium text-success">Free</span>
          ) : (
            <PriceDisplay amount={shipping} currency={currency} />
          )
        }
      />
      <KeyValueList.Row
        label="Total"
        value={
          <PriceDisplay
            amount={total}
            currency={currency}
            className="[&_span:last-child]:text-sm @md:[&_span:last-child]:text-base [&_span:last-child]:font-semibold"
          />
        }
      />
    </KeyValueList>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export interface OrderReviewProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  items: CartItemProps[]
  shippingAddress: AddressCardProps
  subtotal: number
  shipping: number
  total: number
  currency?: string
  onConfirm: () => void
}

export function OrderReview({
  items,
  shippingAddress,
  subtotal,
  shipping,
  total,
  currency = 'USD',
  onConfirm,
  className,
  ...props
}: OrderReviewProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden',
        'flex flex-col gap-5 @md:gap-6 py-5 @md:py-6',
        className
      )}
      {...props}
    >
      <Section title="Items">
        <div className="flex flex-col gap-2 @md:gap-3 px-4 @md:px-5">
          {items.map((item, i) => (
            <CartItem
              key={i}
              {...item}
              currency={currency}
              onQuantityChange={undefined}
              onRemove={undefined}
            />
          ))}
        </div>
      </Section>

      <Section title="Ship to">
        <div className="px-4 @md:px-5">
          <AddressCard {...shippingAddress} />
        </div>
      </Section>

      <Section title="Order total">
        <OrderReview.Totals
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          currency={currency}
        />
      </Section>

      <div className="px-4 @md:px-5">
        <Button onClick={onConfirm} className="w-full h-12 @md:h-10 pointer-coarse:min-h-11">
          Confirm &amp; authenticate
        </Button>
      </div>
    </div>
  )
}

OrderReview.Section = Section
OrderReview.Totals = Totals
