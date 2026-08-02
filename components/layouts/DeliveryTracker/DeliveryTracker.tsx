'use client'

import { cn } from '../../../lib/utils'
import { OrderStatusCard } from '../../core/OrderStatusCard/OrderStatusCard'
import type { OrderStatusStep } from '../../core/OrderStatusCard/OrderStatusCard'
import type { ComponentProps, ComponentPropsWithRef } from 'react'

// ── Sub-component interfaces ──────────────────────────────────────────────────

type MapSlotProps = ComponentPropsWithRef<'div'>

type StepsSlotProps = ComponentProps<typeof OrderStatusCard>

// ── Sub-components ────────────────────────────────────────────────────────────

function MapSlot({ children, className, ...props }: MapSlotProps) {
  return (
    <div
      className={cn(
        'h-40 md:h-56 w-full overflow-hidden rounded-t-xl',
        className
      )}
      {...props}
    >
      {children ?? (
        <div className="h-full w-full bg-muted flex items-center justify-center">
          <span className="text-xs md:text-sm text-muted-foreground select-none">
            Map unavailable
          </span>
        </div>
      )}
    </div>
  )
}

function StepsSlot({ className, ...props }: StepsSlotProps) {
  return (
    <OrderStatusCard
      className={cn('rounded-t-none border-t-0', className)}
      {...props}
    />
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export interface DeliveryTrackerProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  orderId: string
  steps: OrderStatusStep[]
  eta?: string
  mapSlot?: React.ReactNode
}

export function DeliveryTracker({
  orderId,
  steps,
  eta,
  mapSlot,
  className,
  ...props
}: DeliveryTrackerProps) {
  return (
    <div
      className={cn(
        'border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden',
        className
      )}
      {...props}
    >
      <DeliveryTracker.Map>{mapSlot}</DeliveryTracker.Map>
      <DeliveryTracker.Steps orderId={orderId} steps={steps} eta={eta} />
    </div>
  )
}

DeliveryTracker.Map = MapSlot
DeliveryTracker.Steps = StepsSlot
