'use client'

import { cn } from '../../../lib/utils'
import { DetailList } from '../DetailList/DetailList'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { TimestampLabel } from '../../primitives/TimestampLabel/TimestampLabel'
import type { ComponentPropsWithRef } from 'react'

export interface ReceiptItem {
  name: string
  quantity: number
  price: number
  image?: string
}

export interface ReceiptSummaryProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  orderId: string
  items: ReceiptItem[]
  subtotal: number
  shipping: number
  total: number
  currency?: string
  paidAt?: string
}

export function ReceiptSummary({
  orderId,
  items,
  subtotal,
  shipping,
  total,
  currency = 'USD',
  paidAt,
  className,
  ...props
}: ReceiptSummaryProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden',
        'flex flex-col',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-4 md:px-5 py-4 md:py-5 border-b border-border">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs md:text-sm text-muted-foreground">Order #{orderId}</span>
          {paidAt && <TimestampLabel datetime={paidAt} />}
        </div>
        <StatusBadge label="Payment confirmed" variant="success" />
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-border px-4 md:px-5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 md:gap-4 py-3 md:py-3.5">
            {item.image && (
              <img
                src={item.image}
                alt=""
                className="size-10 md:size-12 rounded-[calc(var(--radius)-2px)] object-cover shrink-0 bg-muted"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground truncate">
                {item.name}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs md:text-sm text-muted-foreground">
                  Qty {item.quantity}
                </p>
              )}
            </div>
            <PriceDisplay
              amount={item.price * item.quantity}
              currency={currency}
              className="shrink-0"
            />
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border py-1">
        <DetailList>
          <DetailList.Row
            label="Subtotal"
            value={<PriceDisplay amount={subtotal} currency={currency} />}
          />
          <DetailList.Row
            label="Shipping"
            value={
              shipping === 0 ? (
                <span className="text-xs md:text-sm font-medium text-success">Free</span>
              ) : (
                <PriceDisplay amount={shipping} currency={currency} />
              )
            }
          />
          <DetailList.Row
            label="Total"
            value={
              <PriceDisplay
                amount={total}
                currency={currency}
                className="[&_span:last-child]:font-semibold"
              />
            }
          />
        </DetailList>
      </div>
    </div>
  )
}
