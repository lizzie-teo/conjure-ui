'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Star, Sparkles } from 'lucide-react'
import { DetailList } from '../DetailList/DetailList'
import { SelectionGroup } from '../SelectionGroup/SelectionGroup'
import { cn } from '../../../lib/utils'
import type { RewardsSummary, SubstitutionPreference } from '../DeliveryConfirmation/deliveryFlow.types'
import type { ComponentPropsWithRef } from 'react'

export interface RewardsStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  rewards: RewardsSummary
  redeemPoints: boolean
  onRedeemToggle: (redeem: boolean) => void
  substitution: SubstitutionPreference
  onSubstitutionChange: (pref: SubstitutionPreference) => void
}

export interface PointsSummaryProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  rewards: RewardsSummary
  redeemPoints: boolean
  onRedeemToggle: (redeem: boolean) => void
}

export interface BonusPromptProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  prompt: string
}

export interface SubstitutionSelectorProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onChange'> {
  value: SubstitutionPreference
  /** Overrides the DOM `onChange` handler — fires with the chosen preference. */
  onChange: (v: SubstitutionPreference) => void
}

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

const sectionVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

function PointsSummary({
  rewards,
  redeemPoints,
  onRedeemToggle,
  className,
  ...props
}: PointsSummaryProps) {
  const netPoints = rewards.currentPoints + rewards.pointsEarned
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: rewards.currency,
  })

  return (
    <div
      className={cn('rounded-xl border border-border bg-card overflow-hidden', className)}
      {...props}
    >
      <div className="flex items-center gap-2 px-4 md:px-5 py-3 border-b border-border bg-muted/30">
        <Star className="size-4 text-warning shrink-0" />
        <span className="text-sm font-medium text-foreground">{rewards.programName}</span>
      </div>
      <DetailList>
        <DetailList.Row
          label="Current balance"
          value={`${rewards.currentPoints.toLocaleString()} pts`}
        />
        <DetailList.Row
          label="Earned this order"
          value={
            <span className="text-success font-semibold">
              +{rewards.pointsEarned.toLocaleString()} pts
            </span>
          }
        />
        {rewards.bonusPointsAvailable && (
          <DetailList.Row
            label="Bonus points"
            value={
              <span className="text-success font-semibold">
                +{rewards.bonusPointsAvailable.toLocaleString()} pts
              </span>
            }
          />
        )}
        <DetailList.Row
          label="New balance"
          value={
            <span className="font-semibold">
              {netPoints.toLocaleString()} pts
            </span>
          }
        />
      </DetailList>

      {rewards.pointsValue > 0 && (
        <div className="px-4 md:px-5 py-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-foreground font-medium leading-snug">
                Use {rewards.currentPoints.toLocaleString()} pts
              </p>
              <p className="text-xs text-muted-foreground">
                Save {currencyFormatter.format(rewards.pointsValue)} on this order
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={redeemPoints}
              onClick={() => onRedeemToggle(!redeemPoints)}
              className={cn(
                'relative shrink-0 h-6 w-10 rounded-full border-2 transition-colors duration-200',
                'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                redeemPoints
                  ? 'bg-primary border-primary'
                  : 'bg-muted border-border'
              )}
              aria-label={`${redeemPoints ? 'Remove' : 'Apply'} points redemption`}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow-sm transition-transform duration-200',
                  redeemPoints && 'translate-x-4'
                )}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function BonusPrompt({ prompt, className, ...props }: BonusPromptProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-xl bg-success/5 border border-success/20 px-4 py-3',
        className
      )}
      {...props}
    >
      <Sparkles className="size-4 text-success shrink-0 mt-0.5" />
      <p className="text-xs md:text-sm text-success font-medium leading-snug">{prompt}</p>
    </div>
  )
}

function SubstitutionSelector({
  value,
  onChange,
  className,
  ...props
}: SubstitutionSelectorProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      <p className="text-xs md:text-sm font-medium text-foreground px-1">
        If an item is out of stock
      </p>
      <SelectionGroup
        type="radio"
        value={value}
        onChange={(v) => onChange(v as SubstitutionPreference)}
      >
        <SelectionGroup.Option value="allow" description="We'll pick the closest match">
          Allow substitutions
        </SelectionGroup.Option>
        <SelectionGroup.Option value="notify" description="We'll message you before swapping">
          Notify me first
        </SelectionGroup.Option>
        <SelectionGroup.Option value="deny" description="Remove the item instead">
          Don’t substitute
        </SelectionGroup.Option>
      </SelectionGroup>
    </div>
  )
}

export function RewardsStep({
  rewards,
  redeemPoints,
  onRedeemToggle,
  substitution,
  onSubstitutionChange,
  className,
  ...props
}: RewardsStepProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className={cn('space-y-4 md:space-y-5', className)} {...props}>
      <motion.div
        variants={shouldReduce ? sectionVariantsReduced : sectionVariants}
        initial="hidden"
        animate="show"
      >
        <PointsSummary
          rewards={rewards}
          redeemPoints={redeemPoints}
          onRedeemToggle={onRedeemToggle}
        />
      </motion.div>

      {rewards.bonusPrompt && (
        <motion.div
          variants={shouldReduce ? sectionVariantsReduced : sectionVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.08 }}
        >
          <BonusPrompt prompt={rewards.bonusPrompt} />
        </motion.div>
      )}

      <motion.div
        variants={shouldReduce ? sectionVariantsReduced : sectionVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.12 }}
      >
        <SubstitutionSelector value={substitution} onChange={onSubstitutionChange} />
      </motion.div>
    </div>
  )
}

RewardsStep.PointsSummary = PointsSummary
RewardsStep.BonusPrompt = BonusPrompt
RewardsStep.SubstitutionSelector = SubstitutionSelector
