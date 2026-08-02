'use client'

import { cn } from '../../../lib/utils'
import { ProgressStep } from '../../primitives/ProgressStep/ProgressStep'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { TimestampLabel } from '../../primitives/TimestampLabel/TimestampLabel'
import type { ComponentPropsWithRef } from 'react'

export interface OrderStatusStep {
  label: string
  timestamp?: string
  status: 'complete' | 'active' | 'pending'
}

export interface OrderStatusCardProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  orderId: string
  steps: OrderStatusStep[]
  eta?: string
}

export function OrderStatusCard({
  orderId,
  steps,
  eta,
  className,
  ...props
}: OrderStatusCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl shadow-[var(--shadow-card)]',
        'flex flex-col gap-4 md:gap-5 p-4 md:p-5',
        className
      )}
      {...props}
    >
      {eta && (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs md:text-sm text-muted-foreground">Estimated arrival</span>
          <span className="text-base md:text-lg font-semibold text-foreground">{eta}</span>
        </div>
      )}

      <span className="text-xs md:text-sm text-muted-foreground">Order #{orderId}</span>

      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 md:gap-4">
            {/* Indicator column — dot container height matches text-sm/text-base line height */}
            <div className="flex flex-col items-center shrink-0">
              <div className="h-5 md:h-6 flex items-center justify-center">
                <ProgressStep status={step.status} />
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'w-px flex-1',
                    step.status === 'complete' ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>

            <div
              className={cn(
                'flex flex-col gap-0.5 min-w-0',
                i < steps.length - 1 ? 'pb-5 md:pb-6' : 'pb-0'
              )}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    'text-sm md:text-base font-medium',
                    step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {step.label}
                </span>
                {step.status === 'active' && (
                  <StatusBadge label="In progress" variant="info" />
                )}
              </div>
              {step.timestamp && step.status === 'complete' && (
                <TimestampLabel datetime={step.timestamp} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
