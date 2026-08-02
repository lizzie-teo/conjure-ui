'use client'

import { useState } from 'react'
import { Button } from '../../ui/button'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { Tag } from '../../primitives/Tag/Tag'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'

// ── Sub-component interfaces ──────────────────────────────────────────────────

interface LineItemProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  name: string
  quantity: number
  price: number
  currency: string
}

interface TotalProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  subtotal: number
  discount?: number
  total: number
  currency: string
}

interface PromoFieldProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  onApply: (code: string) => void
  appliedCode?: string
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LineItem({ name, quantity, price, currency, className, ...props }: LineItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 py-2.5 md:py-3',
        'border-b border-border last:border-0',
        className
      )}
      {...props}
    >
      <span className="text-xs md:text-sm text-foreground truncate min-w-0">
        {name}
        {quantity > 1 && (
          <span className="text-muted-foreground ml-1">× {quantity}</span>
        )}
      </span>
      <PriceDisplay amount={price * quantity} currency={currency} className="shrink-0" />
    </div>
  )
}

function Total({ subtotal, discount, total, currency, className, ...props }: TotalProps) {
  return (
    <div
      className={cn('border-t border-border px-4 md:px-5 py-3 md:py-4 space-y-2', className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs md:text-sm text-muted-foreground">Subtotal</span>
        <PriceDisplay amount={subtotal} currency={currency} />
      </div>
      {discount !== undefined && discount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm text-muted-foreground">Discount</span>
          <span className="text-xs md:text-sm font-medium text-success">
            −{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(discount)}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-sm md:text-base font-semibold text-foreground">Total</span>
        <PriceDisplay
          amount={total}
          currency={currency}
          className="text-sm md:text-base [&_span:last-child]:font-semibold"
        />
      </div>
    </div>
  )
}

function PromoField({ onApply, appliedCode, className, ...props }: PromoFieldProps) {
  const [code, setCode] = useState('')

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {appliedCode && (
        <div className="flex items-center gap-2">
          <Tag label={appliedCode} />
          <span className="text-xs text-muted-foreground">applied</span>
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && code.trim()) {
              onApply(code.trim())
              setCode('')
            }
          }}
          placeholder="Promo code"
          aria-label="Promo code"
          className={cn(
            'flex-1 h-12 md:h-10 rounded-md border border-border bg-background',
            'px-3 text-sm text-foreground placeholder:text-muted-foreground',
            'outline-none focus:ring-2 focus:ring-ring focus:border-ring',
            'transition-shadow duration-150'
          )}
        />
        <Button
          variant="outline"
          onClick={() => {
            if (code.trim()) {
              onApply(code.trim())
              setCode('')
            }
          }}
          disabled={!code.trim()}
          className="h-12 md:h-10 px-4 shrink-0"
        >
          Apply
        </Button>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export interface CartSummaryProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  items: { name: string; price: number; quantity: number }[]
  currency?: string
  promoCode?: string
  discount?: number
  onPromoApply?: (code: string) => void
  onCheckout: () => void
}

export function CartSummary({
  items,
  currency = 'USD',
  promoCode,
  discount,
  onPromoApply,
  onCheckout,
  className,
  ...props
}: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - (discount ?? 0)

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden',
        className
      )}
      {...props}
    >
      {items.length > 0 ? (
        <div className="px-4 md:px-5 pt-3 md:pt-4">
          {items.map((item, i) => (
            <LineItem
              key={i}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              currency={currency}
            />
          ))}
        </div>
      ) : (
        <div className="px-4 md:px-5 pt-4 pb-2 text-sm text-muted-foreground text-center">
          Your cart is empty
        </div>
      )}

      <CartSummary.Total subtotal={subtotal} discount={discount} total={total} currency={currency} />

      {onPromoApply && (
        <div className="px-4 md:px-5 pb-3 md:pb-4">
          <CartSummary.PromoField onApply={onPromoApply} appliedCode={promoCode} />
        </div>
      )}

      <div className="px-4 md:px-5 pb-4 md:pb-5">
        <Button onClick={onCheckout} className="w-full h-12 md:h-10">
          Proceed to review
        </Button>
      </div>
    </div>
  )
}

CartSummary.LineItem = LineItem
CartSummary.PromoField = PromoField
CartSummary.Total = Total
