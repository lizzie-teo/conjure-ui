'use client'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { MapPin, Bell } from 'lucide-react'
import { SelectionGroup } from '../SelectionGroup/SelectionGroup'
import { AvailabilityDot } from '../../primitives/AvailabilityDot/AvailabilityDot'
import { cn } from '../../../lib/utils'
import type { Branch, CarBootDetails } from '../DeliveryConfirmation/deliveryFlow.types'
import type { ComponentProps, ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface BranchSelectStepProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  branches: Branch[]
  selectedBranchId?: string
  carBootDetails?: CarBootDetails
  onBranchSelect: (branchId: string) => void
  onCarBootChange: (details: CarBootDetails) => void
}

export interface BranchListProps
  extends Omit<ComponentProps<typeof SelectionGroup>, 'children' | 'type' | 'value' | 'onChange'> {
  branches: Branch[]
  selectedBranchId?: string
  onBranchSelect: (id: string) => void
}

export interface CarBootFormProps extends Omit<MotionDivProps, 'children' | 'onChange'> {
  details: CarBootDetails
  /** Overrides the DOM `onChange` handler — fires with the updated car boot details. */
  onChange: (d: CarBootDetails) => void
  shouldReduce: boolean
}

const inputClass = cn(
  'w-full h-12 md:h-10 rounded-md border border-border bg-background',
  'px-3 text-sm text-foreground placeholder:text-muted-foreground',
  'outline-none focus:ring-2 focus:ring-ring focus:border-ring',
  'transition-shadow duration-150'
)

const formVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  show: {
    opacity: 1,
    height: 'auto',
    overflow: 'visible',
    transition: { duration: 0.25, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    transition: { duration: 0.2 },
  },
}

const formItemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, delay: i * 0.05, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

function BranchList({ branches, selectedBranchId, onBranchSelect, ...props }: BranchListProps) {
  return (
    <SelectionGroup
      {...props}
      type="radio"
      value={selectedBranchId}
      onChange={(v) => onBranchSelect(v as string)}
    >
      {branches.map((branch) => (
        <SelectionGroup.Option
          key={branch.id}
          value={branch.id}
          icon={<MapPin className="size-4" />}
          description={branch.address}
        >
          <span className="flex items-center gap-2 flex-wrap">
            {branch.name}
            <AvailabilityDot
              level={branch.availableSlots === 0 ? 'unavailable' : branch.availableSlots < 3 ? 'limited' : 'available'}
              showLabel
            />
          </span>
          <span className="text-xs text-muted-foreground font-normal block">
            {branch.distanceKm < 1
              ? `${Math.round(branch.distanceKm * 1000)} m away`
              : `${branch.distanceKm.toFixed(1)} km away`}
          </span>
        </SelectionGroup.Option>
      ))}
    </SelectionGroup>
  )
}

function CarBootForm({
  details,
  onChange,
  shouldReduce,
  className,
  ...props
}: CarBootFormProps) {
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={cn('mt-3', className)}
      {...props}
    >
      <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-5 space-y-3 md:space-y-4">
        <p className="text-xs md:text-sm font-medium text-foreground">
          Car boot details — so our team can find you
        </p>

        {([
          { key: 'vehicleColour', label: 'Vehicle colour', placeholder: 'e.g. Silver' },
          { key: 'vehicleMake', label: 'Make & model', placeholder: 'e.g. Toyota RAV4' },
          { key: 'registrationPlate', label: 'Registration plate', placeholder: 'e.g. ABC 123' },
        ] as const).map((field, i) => (
          <motion.div
            key={field.key}
            custom={i}
            variants={shouldReduce ? undefined : formItemVariants}
            initial="hidden"
            animate="show"
            className="space-y-1"
          >
            <label
              htmlFor={`car-boot-${field.key}`}
              className="text-xs text-muted-foreground"
            >
              {field.label}
            </label>
            <input
              id={`car-boot-${field.key}`}
              type="text"
              value={details[field.key]}
              onChange={(e) => onChange({ ...details, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </motion.div>
        ))}

        <motion.div
          custom={3}
          variants={shouldReduce ? undefined : formItemVariants}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between pt-1"
        >
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs md:text-sm text-foreground font-medium leading-snug">
                Arrival notification
              </p>
              <p className="text-xs text-muted-foreground leading-snug">
                Alert the team when you pull in
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={details.arrivalNotification}
            onClick={() => onChange({ ...details, arrivalNotification: !details.arrivalNotification })}
            className={cn(
              'relative shrink-0 h-6 w-10 rounded-full border-2 transition-colors duration-200',
              'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              details.arrivalNotification
                ? 'bg-primary border-primary'
                : 'bg-muted border-border'
            )}
            aria-label="Toggle arrival notification"
          >
            <span
              className={cn(
                'absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow-sm transition-transform duration-200',
                details.arrivalNotification && 'translate-x-4'
              )}
            />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function BranchSelectStep({
  branches,
  selectedBranchId,
  carBootDetails,
  onBranchSelect,
  onCarBootChange,
  className,
  ...props
}: BranchSelectStepProps) {
  const shouldReduce = useReducedMotion() ?? false
  const defaultDetails: CarBootDetails = carBootDetails ?? {
    vehicleColour: '',
    vehicleMake: '',
    registrationPlate: '',
    arrivalNotification: true,
  }

  return (
    <div className={cn('space-y-1', className)} {...props}>
      <BranchList
        branches={branches}
        selectedBranchId={selectedBranchId}
        onBranchSelect={(id) => {
          onBranchSelect(id)
          if (!carBootDetails) {
            onCarBootChange(defaultDetails)
          }
        }}
      />

      <AnimatePresence initial={false}>
        {selectedBranchId && (
          <CarBootForm
            key="car-boot-form"
            details={carBootDetails ?? defaultDetails}
            onChange={onCarBootChange}
            shouldReduce={shouldReduce}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

BranchSelectStep.BranchList = BranchList
BranchSelectStep.CarBootForm = CarBootForm
