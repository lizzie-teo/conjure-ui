'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'
import { Button } from '../../ui/button'

const MotionButton = motion(Button)

type SelectionType = 'radio' | 'checkbox'

interface SelectionGroupContextValue {
  type: SelectionType
  selected: string[]
  toggle: (value: string) => void
}

const SelectionGroupCtx = createContext<SelectionGroupContextValue>({
  type: 'radio',
  selected: [],
  toggle: () => {},
})

export interface SelectionGroupProps
  extends Omit<MotionDivProps, 'onChange' | 'defaultValue'> {
  type?: SelectionType
  value?: string | string[]
  defaultValue?: string | string[]
  /** Note: replaces the DOM `onChange` — receives the new selection. */
  onChange?: (value: string | string[]) => void
}

export interface OptionProps {
  value: string
  children: React.ReactNode
  description?: string
  icon?: React.ReactNode
  className?: string
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const optionVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

const optionVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

function Option({ value, children, description, icon, className }: OptionProps) {
  const { type, selected, toggle } = useContext(SelectionGroupCtx)
  const shouldReduce = useReducedMotion()
  const isSelected = selected.includes(value)

  return (
    <MotionButton
      variants={shouldReduce ? optionVariantsReduced : optionVariants}
      onClick={() => toggle(value)}
      role={type}
      aria-checked={isSelected}
      variant="ghost"
      className={cn(
        'w-full h-auto flex items-center gap-3 rounded-xl px-4 py-3.5 md:py-4 text-left whitespace-normal',
        'transition-colors duration-150',
        isSelected
          ? 'border-2 border-primary bg-primary/5 shadow-[var(--shadow-card)] hover:bg-primary/5'
          : 'border border-border bg-card shadow-[var(--shadow-sm)] hover:border-primary/40 hover:bg-muted/30 hover:shadow-[var(--shadow-card)]',
        className
      )}
    >
      {icon && (
        <span className="shrink-0 size-8 md:size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </span>
      )}

      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-sm md:text-base font-medium leading-snug',
          isSelected ? 'text-foreground' : 'text-foreground'
        )}>
          {children}
        </p>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5 leading-snug">{description}</p>
        )}
      </div>

      <div
        className={cn(
          'shrink-0 flex items-center justify-center border-2 transition-colors duration-150',
          type === 'radio' ? 'rounded-full size-5' : 'rounded-md size-5',
          isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-transparent'
        )}
      >
        <AnimatePresence initial={false}>
          {isSelected && (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.5 }}
              transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <Check className="size-3 text-primary-foreground" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </MotionButton>
  )
}

function normalise(v: string | string[] | undefined): string[] {
  if (v === undefined) return []
  if (Array.isArray(v)) return v
  return [v]
}

export function SelectionGroup({
  type = 'radio',
  value,
  defaultValue,
  onChange,
  className,
  children,
  ...props
}: SelectionGroupProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState<string[]>(() => normalise(defaultValue))

  const selected = isControlled ? normalise(value) : internal

  function toggle(v: string) {
    let next: string[]

    if (type === 'radio') {
      next = [v]
    } else {
      next = selected.includes(v)
        ? selected.filter((s) => s !== v)
        : [...selected, v]
    }

    if (!isControlled) setInternal(next)
    onChange?.(type === 'radio' ? next[0] ?? '' : next)
  }

  return (
    <SelectionGroupCtx.Provider value={{ type, selected, toggle }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        role={type === 'radio' ? 'radiogroup' : 'group'}
        className={cn('flex flex-col gap-2 md:gap-2.5', className)}
        {...props}
      >
        {children}
      </motion.div>
    </SelectionGroupCtx.Provider>
  )
}

SelectionGroup.Option = Option
