'use client'

import { X } from 'lucide-react'
import { Button } from '../../ui/button'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { QuantityStepper } from '../../primitives/QuantityStepper/QuantityStepper'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'

export interface CartItemProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  image: string
  name: string
  variant?: string
  price: number
  currency?: string
  quantity: number
  onQuantityChange?: (quantity: number) => void
  onRemove?: () => void
}

export function CartItem({
  image,
  name,
  variant,
  price,
  currency = 'USD',
  quantity,
  onQuantityChange,
  onRemove,
  className,
  ...props
}: CartItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 @md:gap-4 p-4 @md:p-5',
        'bg-card border border-border rounded-xl shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      <img
        src={image}
        alt={name}
        className="size-16 @md:size-14 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col gap-2 @md:gap-3">
        {/* Name + remove row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm @md:text-base font-medium text-foreground truncate">{name}</p>
            {variant && (
              <p className="text-xs @md:text-sm text-muted-foreground mt-0.5">{variant}</p>
            )}
            <PriceDisplay amount={price * quantity} currency={currency} className="mt-1" />
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${name}`}
              onClick={onRemove}
              className="size-8 @md:size-7 tap-target shrink-0 -mt-0.5 -mr-1 text-muted-foreground"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
        {/* Stepper row */}
        <div>
          {onQuantityChange ? (
            <QuantityStepper value={quantity} onChange={onQuantityChange} />
          ) : (
            <span className="text-xs @md:text-sm text-muted-foreground">Qty: {quantity}</span>
          )}
        </div>
      </div>
    </div>
  )
}
