'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ProgressStep } from '../../primitives/ProgressStep/ProgressStep'
import { ActionStrip } from '../../core/ActionStrip/ActionStrip'
import { DeliveryMethodStep } from '../../core/DeliveryMethodStep/DeliveryMethodStep'
import { BranchSelectStep } from '../../core/BranchSelectStep/BranchSelectStep'
import { ScheduleStep } from '../../core/ScheduleStep/ScheduleStep'
import { RewardsStep } from '../../core/RewardsStep/RewardsStep'
import { DeliveryConfirmation } from '../../core/DeliveryConfirmation/DeliveryConfirmation'
import { DeliveryBookingSuccess } from '../../core/DeliveryBookingSuccess/DeliveryBookingSuccess'
import { cn } from '../../../lib/utils'
import type { AddressTileProps } from '../../primitives/AddressTile/AddressTile'
import type {
  DeliveryStep,
  Branch,
  AvailableDate,
  TimeSlot,
  RewardsSummary,
  SubstitutionPreference,
  CarBootDetails,
  CompletedBooking,
} from '../../core/DeliveryConfirmation/deliveryFlow.types'

export interface DeliveryFlowProps {
  availableDates: AvailableDate[]
  timeSlots: TimeSlot[]
  branches?: Branch[]
  rewards?: RewardsSummary
  homeAddress?: AddressTileProps
  onAddressEdit?: () => void
  editableUntil?: string
  initialStep?: DeliveryStep
  initialData?: Partial<DeliveryFlowState>
  onComplete: (booking: CompletedBooking) => void
  onCancel?: () => void
  className?: string
}

interface DeliveryFlowState {
  method?: 'home-delivery' | 'click-collect'
  branchId?: string
  carBootDetails?: CarBootDetails
  selectedDate?: string
  selectedSlotId?: string
  redeemPoints: boolean
  substitution: SubstitutionPreference
}

type FlowStatus = 'in-progress' | 'resolved'

const stepLabels: Record<DeliveryStep, string> = {
  method: 'Method',
  branch: 'Branch',
  schedule: 'Schedule',
  rewards: 'Rewards',
  confirm: 'Confirm',
}

// ── Step Rail ─────────────────────────────────────────────────────────────────

function StepRail({
  steps,
  currentStep,
}: {
  steps: DeliveryStep[]
  currentStep: DeliveryStep
}) {
  const currentIdx = steps.indexOf(currentStep)

  return (
    <div className="flex items-center px-4 md:px-5 pt-4 pb-3" aria-label="Progress">
      {steps.map((step, i) => {
        const status =
          i < currentIdx ? 'complete' : i === currentIdx ? 'active' : 'pending'
        return (
          <div key={step} className="flex items-start flex-1 last:flex-none">
            <ProgressStep status={status} label={stepLabels[step]} />
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-px mx-1 mt-1.5',
                  i < currentIdx ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Step body transitions ─────────────────────────────────────────────────────

interface StepBodyProps {
  stepKey: string
  direction: 1 | -1
  shouldReduce: boolean
  children: React.ReactNode
}

function StepBody({ stepKey, direction, shouldReduce, children }: StepBodyProps) {
  const x = shouldReduce ? 0 : direction * 20

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -x }}
        transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        className="px-4 md:px-5 pb-2"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function DeliveryFlow({
  availableDates,
  timeSlots,
  branches,
  rewards,
  homeAddress,
  onAddressEdit,
  editableUntil,
  initialStep = 'method',
  initialData,
  onComplete,
  onCancel,
  className,
}: DeliveryFlowProps) {
  const shouldReduce = useReducedMotion()

  const [status, setStatus] = useState<FlowStatus>('in-progress')
  const [bookingRef, setBookingRef] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<DeliveryStep>(initialStep)
  const [direction, setDirection] = useState<1 | -1>(1)

  const [state, setState] = useState<DeliveryFlowState>({
    redeemPoints: false,
    substitution: 'allow',
    ...initialData,
  })

  const steps: DeliveryStep[] = useMemo(() => {
    const base: DeliveryStep[] = ['method']
    if (state.method === 'click-collect') base.push('branch')
    base.push('schedule')
    if (rewards) base.push('rewards')
    base.push('confirm')
    return base
  }, [state.method, rewards])

  function navigate(to: DeliveryStep) {
    const fromIdx = steps.indexOf(currentStep)
    const toIdx = steps.indexOf(to)
    setDirection(toIdx >= fromIdx ? 1 : -1)
    setCurrentStep(to)
  }

  function next() {
    const idx = steps.indexOf(currentStep)
    if (idx < steps.length - 1) navigate(steps[idx + 1])
  }

  function back() {
    const idx = steps.indexOf(currentStep)
    if (idx > 0) navigate(steps[idx - 1])
    else onCancel?.()
  }

  function canContinue(): boolean {
    switch (currentStep) {
      case 'method':
        return !!state.method
      case 'branch':
        return !!state.branchId
      case 'schedule':
        return !!state.selectedDate && !!state.selectedSlotId
      case 'rewards':
        return true
      case 'confirm':
        return true
    }
  }

  function handleConfirm() {
    const ref = `DEL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const booking: CompletedBooking = {
      method: state.method ?? 'home-delivery',
      branchId: state.branchId,
      carBootDetails: state.carBootDetails,
      date: state.selectedDate ?? '',
      slotId: state.selectedSlotId ?? '',
      redeemPoints: state.redeemPoints,
      substitution: state.substitution,
      bookingRef: ref,
    }
    setBookingRef(ref)
    setStatus('resolved')
    onComplete(booking)
  }

  const selectedSlot = timeSlots.find((s) => s.id === state.selectedSlotId)

  // Last-resort edit window when neither an explicit `editableUntil` nor a
  // selected date is available. Read the clock once per flow instance — calling
  // Date.now() in render would yield a new deadline on every re-render.
  const [fallbackEditableUntil] = useState(() =>
    new Date(Date.now() + 86_400_000).toISOString(),
  )

  const resolvedEditableUntil =
    editableUntil ??
    (state.selectedDate
      ? `${state.selectedDate}T00:00:00.000Z`
      : fallbackEditableUntil)

  if (status === 'resolved' && selectedSlot) {
    return (
      <div
        className={cn(
          'bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden',
          className
        )}
      >
        <div className="px-4 md:px-5 py-4 md:py-5">
          <DeliveryBookingSuccess
            bookingRef={bookingRef}
            method={state.method ?? 'home-delivery'}
            scheduledDate={state.selectedDate ?? ''}
            scheduledSlot={selectedSlot}
            pointsEarned={state.redeemPoints ? undefined : rewards?.pointsEarned}
            pointsRedeemed={state.redeemPoints && rewards ? rewards.pointsValue : undefined}
            currency={selectedSlot.currency}
            onCta={() => onComplete({
              method: state.method ?? 'home-delivery',
              date: state.selectedDate ?? '',
              slotId: state.selectedSlotId ?? '',
              redeemPoints: state.redeemPoints,
              substitution: state.substitution,
              bookingRef,
            })}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden',
        className
      )}
    >
      <StepRail steps={steps} currentStep={currentStep} />

      <div className="border-t border-border" />

      <StepBody
        stepKey={currentStep}
        direction={direction}
        shouldReduce={shouldReduce ?? false}
      >
        <div className="pt-4 pb-2 space-y-4">
          {currentStep === 'method' && (
            <DeliveryMethodStep
              value={state.method}
              homeAddress={homeAddress}
              onMethodChange={(method) =>
                setState((s) => ({
                  ...s,
                  method,
                  branchId: method === 'home-delivery' ? undefined : s.branchId,
                }))
              }
              onAddressEdit={onAddressEdit}
            />
          )}

          {currentStep === 'branch' && branches && (
            <BranchSelectStep
              branches={branches}
              selectedBranchId={state.branchId}
              carBootDetails={state.carBootDetails}
              onBranchSelect={(id) => setState((s) => ({ ...s, branchId: id }))}
              onCarBootChange={(details) => setState((s) => ({ ...s, carBootDetails: details }))}
            />
          )}

          {currentStep === 'schedule' && (
            <ScheduleStep
              availableDates={availableDates}
              timeSlots={timeSlots}
              selectedDate={state.selectedDate}
              selectedSlotId={state.selectedSlotId}
              onDateSelect={(date) => setState((s) => ({ ...s, selectedDate: date }))}
              onSlotSelect={(id) => setState((s) => ({ ...s, selectedSlotId: id || undefined }))}
            />
          )}

          {currentStep === 'rewards' && rewards && (
            <RewardsStep
              rewards={rewards}
              redeemPoints={state.redeemPoints}
              onRedeemToggle={(redeem) => setState((s) => ({ ...s, redeemPoints: redeem }))}
              substitution={state.substitution}
              onSubstitutionChange={(sub) => setState((s) => ({ ...s, substitution: sub }))}
            />
          )}

          {currentStep === 'confirm' && selectedSlot && (
            <DeliveryConfirmation
              method={state.method ?? 'home-delivery'}
              deliveryAddress={state.method === 'home-delivery' ? homeAddress : undefined}
              branch={
                state.method === 'click-collect' && state.branchId
                  ? branches?.find((b) => b.id === state.branchId)
                  : undefined
              }
              selectedDate={state.selectedDate ?? ''}
              selectedSlot={selectedSlot}
              rewards={rewards}
              redeemPoints={state.redeemPoints}
              substitution={state.substitution}
              editableUntil={resolvedEditableUntil}
              onConfirm={handleConfirm}
              onEdit={(step) => navigate(step)}
            />
          )}
        </div>

        {currentStep !== 'confirm' && (
          <ActionStrip>
            <ActionStrip.Secondary onClick={back}>
              {steps.indexOf(currentStep) === 0 ? 'Cancel' : '← Back'}
            </ActionStrip.Secondary>
            <ActionStrip.Primary onClick={next} disabled={!canContinue()}>
              {currentStep === steps[steps.length - 2] ? 'Review order →' : 'Continue →'}
            </ActionStrip.Primary>
          </ActionStrip>
        )}
      </StepBody>
    </div>
  )
}

DeliveryFlow.StepRail = StepRail
DeliveryFlow.StepBody = StepBody
