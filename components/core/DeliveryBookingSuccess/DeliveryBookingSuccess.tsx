'use client'

import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle2, CalendarPlus } from 'lucide-react'
import { DetailList } from '../DetailList/DetailList'
import { ActionStrip } from '../ActionStrip/ActionStrip'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { DeliveryMethodIcon } from '../../primitives/DeliveryMethodIcon/DeliveryMethodIcon'
import { cn } from '../../../lib/utils'
import type { TimeSlot } from '../DeliveryConfirmation/deliveryFlow.types'
import type { ComponentPropsWithRef } from 'react'

export interface DeliveryBookingSuccessProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  bookingRef: string
  method: 'home-delivery' | 'click-collect'
  scheduledDate: string
  scheduledSlot: Pick<TimeSlot, 'startTime' | 'endTime' | 'tier'>
  pointsEarned?: number
  pointsRedeemed?: number
  currency: string
  ctaLabel?: string
  onCta: () => void
  onAddCalendar?: () => void
}

function formatDateDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day))
}

const tierLabels: Record<string, string> = {
  express: 'Express',
  standard: 'Standard',
  eco: 'Eco',
}

const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

const heroVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
}

const slideVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, delay, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const slideVariantsReduced = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.2, delay },
  }),
}

export function DeliveryBookingSuccess({
  bookingRef,
  method,
  scheduledDate,
  scheduledSlot,
  pointsEarned,
  pointsRedeemed,
  currency,
  ctaLabel = 'View order',
  onCta,
  onAddCalendar,
  className,
  ...props
}: DeliveryBookingSuccessProps) {
  const shouldReduce = useReducedMotion()

  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  })

  return (
    <div className={cn('space-y-4 md:space-y-5', className)} {...props}>
      <motion.div
        variants={shouldReduce ? heroVariantsReduced : heroVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-3 py-4 md:py-5"
      >
        <div className="size-14 md:size-16 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="size-8 md:size-9 text-success" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-base md:text-lg font-semibold text-foreground">
            Delivery scheduled!
          </p>
          <p className="text-xs text-muted-foreground font-mono">{bookingRef}</p>
        </div>
        <StatusBadge label="Confirmed" variant="success" />
      </motion.div>

      <motion.div
        custom={0.1}
        variants={shouldReduce ? slideVariantsReduced : slideVariants}
        initial="hidden"
        animate="show"
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 md:px-5 py-3 border-b border-border bg-muted/30">
          <DeliveryMethodIcon type={method} size={16} className="text-muted-foreground" />
          <span className="text-xs md:text-sm font-medium text-foreground">
            {method === 'home-delivery' ? 'Home delivery' : 'Click & Collect'}
          </span>
        </div>
        <DetailList>
          <DetailList.Row label="Date" value={formatDateDisplay(scheduledDate)} />
          <DetailList.Row
            label="Time window"
            value={`${scheduledSlot.startTime} – ${scheduledSlot.endTime}`}
          />
          <DetailList.Row label="Type" value={tierLabels[scheduledSlot.tier] ?? scheduledSlot.tier} />
        </DetailList>
      </motion.div>

      {pointsEarned !== undefined && pointsEarned > 0 && (
        <motion.div
          custom={0.16}
          variants={shouldReduce ? slideVariantsReduced : slideVariants}
          initial="hidden"
          animate="show"
          className="flex items-center gap-2 rounded-xl bg-success/5 border border-success/20 px-4 py-3"
        >
          <span className="text-xs md:text-sm text-success font-medium">
            +{pointsEarned.toLocaleString()} points added to your account
          </span>
        </motion.div>
      )}

      {pointsRedeemed !== undefined && pointsRedeemed > 0 && (
        <motion.div
          custom={0.2}
          variants={shouldReduce ? slideVariantsReduced : slideVariants}
          initial="hidden"
          animate="show"
          className="flex items-center gap-2 rounded-xl bg-muted/50 border border-border px-4 py-3"
        >
          <span className="text-xs md:text-sm text-muted-foreground">
            {currencyFormatter.format(pointsRedeemed)} discount applied from points
          </span>
        </motion.div>
      )}

      <motion.div
        custom={0.24}
        variants={shouldReduce ? slideVariantsReduced : slideVariants}
        initial="hidden"
        animate="show"
      >
        <ActionStrip>
          {onAddCalendar && (
            <ActionStrip.Secondary onClick={onAddCalendar}>
              <CalendarPlus className="size-4 mr-1.5" />
              Add to calendar
            </ActionStrip.Secondary>
          )}
          <ActionStrip.Primary onClick={onCta}>
            {ctaLabel}
          </ActionStrip.Primary>
        </ActionStrip>
      </motion.div>
    </div>
  )
}
