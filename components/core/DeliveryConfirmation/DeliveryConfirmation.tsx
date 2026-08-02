'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Pencil } from 'lucide-react'
import { ActionStrip } from '../ActionStrip/ActionStrip'
import { DeliveryMethodIcon } from '../../primitives/DeliveryMethodIcon/DeliveryMethodIcon'
import { AddressTile } from '../../primitives/AddressTile/AddressTile'
import { EditWindowNotice } from '../../primitives/EditWindowNotice/EditWindowNotice'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile'
import type {
  DeliveryStep,
  TimeSlot,
  Branch,
  RewardsSummary,
  SubstitutionPreference,
} from './deliveryFlow.types'
import type { ComponentPropsWithRef } from 'react'

export interface DeliveryConfirmationProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  method: 'home-delivery' | 'click-collect'
  deliveryAddress?: AddressTileProps
  branch?: Pick<Branch, 'name' | 'address'>
  selectedDate: string
  selectedSlot: TimeSlot
  rewards?: RewardsSummary
  redeemPoints?: boolean
  substitution: SubstitutionPreference
  editableUntil: string
  onConfirm: () => void
  onEdit: (step: DeliveryStep) => void
  onSetupRecurring?: () => void
}

const substitutionLabels: Record<SubstitutionPreference, string> = {
  allow: 'Allow substitutions',
  notify: 'Notify me first',
  deny: "Don't substitute",
}

function formatDateDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day))
}

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

const sectionVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

interface EditRowProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  label: string
  value: React.ReactNode
  step: DeliveryStep
  onEdit: (step: DeliveryStep) => void
}

function EditRow({ label, value, step, onEdit, className, ...props }: EditRowProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 py-2 md:py-2.5 border-b border-border last:border-0',
        className
      )}
      {...props}
    >
      <span className="text-xs md:text-sm text-muted-foreground shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs md:text-sm text-foreground font-medium text-right truncate">{value}</span>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onEdit(step)}
          aria-label={`Edit ${label}`}
          className="shrink-0 size-6 text-muted-foreground hover:text-foreground"
        >
          <Pencil className="size-3" />
        </Button>
      </div>
    </div>
  )
}

export function DeliveryConfirmation({
  method,
  deliveryAddress,
  branch,
  selectedDate,
  selectedSlot,
  rewards,
  redeemPoints,
  substitution,
  editableUntil,
  onConfirm,
  onEdit,
  onSetupRecurring,
  className,
  ...props
}: DeliveryConfirmationProps) {
  const shouldReduce = useReducedMotion()

  const currencyFormatter = rewards
    ? new Intl.NumberFormat(undefined, { style: 'currency', currency: selectedSlot.currency })
    : null

  return (
    <div className={cn('space-y-4 md:space-y-5', className)} {...props}>
      <motion.div
        variants={shouldReduce ? sectionVariantsReduced : sectionVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center gap-2 mb-3">
          <DeliveryMethodIcon type={method} size={18} className="text-foreground" />
          <span className="text-sm font-semibold text-foreground">
            {method === 'home-delivery' ? 'Home delivery' : 'Click & Collect — car boot'}
          </span>
          <StatusBadge label="Ready to confirm" variant="info" />
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 md:px-5 py-1">
            <EditRow label="Date" value={formatDateDisplay(selectedDate)} step="schedule" onEdit={onEdit} />
            <EditRow
              label="Time"
              value={`${selectedSlot.startTime} – ${selectedSlot.endTime}`}
              step="schedule"
              onEdit={onEdit}
            />
            <EditRow
              label="Delivery fee"
              value={
                selectedSlot.fee === 0
                  ? 'Free'
                  : new Intl.NumberFormat(undefined, { style: 'currency', currency: selectedSlot.currency }).format(selectedSlot.fee)
              }
              step="schedule"
              onEdit={onEdit}
            />
            {rewards && (
              <EditRow
                label="Points earned"
                value={`+${rewards.pointsEarned.toLocaleString()} pts`}
                step="rewards"
                onEdit={onEdit}
              />
            )}
            {rewards && redeemPoints && currencyFormatter && (
              <EditRow
                label="Points redeemed"
                value={`−${currencyFormatter.format(rewards.pointsValue)}`}
                step="rewards"
                onEdit={onEdit}
              />
            )}
            <EditRow
              label="Out of stock"
              value={substitutionLabels[substitution]}
              step="rewards"
              onEdit={onEdit}
            />
          </div>
        </div>
      </motion.div>

      {(deliveryAddress || branch) && (
        <motion.div
          variants={shouldReduce ? sectionVariantsReduced : sectionVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.06 }}
          className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 md:px-5 md:py-4"
        >
          {deliveryAddress ? (
            <>
              <AddressTile {...deliveryAddress} />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onEdit('method')}
                aria-label="Change delivery address"
                className="shrink-0 mt-0.5"
              >
                <Pencil className="size-3.5" />
              </Button>
            </>
          ) : branch ? (
            <div>
              <p className="text-xs md:text-sm font-medium text-foreground">{branch.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{branch.address}</p>
            </div>
          ) : null}
        </motion.div>
      )}

      <motion.div
        variants={shouldReduce ? sectionVariantsReduced : sectionVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <EditWindowNotice editableUntil={editableUntil} />

        {onSetupRecurring && (
          <Button
            variant="ghost"
            onClick={onSetupRecurring}
            className="w-full text-xs md:text-sm text-muted-foreground hover:text-foreground"
          >
            Set up a recurring delivery
          </Button>
        )}
      </motion.div>

      <ActionStrip>
        <ActionStrip.Secondary onClick={() => onEdit('schedule')}>
          ← Edit
        </ActionStrip.Secondary>
        <ActionStrip.Primary onClick={onConfirm}>
          Confirm delivery
        </ActionStrip.Primary>
      </ActionStrip>
    </div>
  )
}

DeliveryConfirmation.EditRow = EditRow
