'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'

interface SummaryPanelContextValue {
  isOpen: boolean
  toggle: () => void
  collapsible: boolean
}

const SummaryPanelCtx = createContext<SummaryPanelContextValue>({
  isOpen: true,
  toggle: () => {},
  collapsible: false,
})

export interface SummaryPanelProps extends ComponentPropsWithRef<'div'> {
  defaultOpen?: boolean
  collapsible?: boolean
}

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

interface BodyProps {
  children: React.ReactNode
  className?: string
}

function Header({ children, className }: HeaderProps) {
  const { isOpen, toggle, collapsible } = useContext(SummaryPanelCtx)

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 px-4 md:px-5 py-3 md:py-4',
        collapsible && 'cursor-pointer select-none',
        className
      )}
      onClick={collapsible ? toggle : undefined}
      role={collapsible ? 'button' : undefined}
      aria-expanded={collapsible ? isOpen : undefined}
    >
      <div className="font-semibold text-sm md:text-base text-foreground">{children}</div>
      {collapsible && (
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          <Button variant="ghost" size="icon-xs" aria-hidden tabIndex={-1}>
            <ChevronDown className="size-3.5 md:size-4 text-muted-foreground" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}

function Body({ children, className }: BodyProps) {
  const { isOpen, collapsible } = useContext(SummaryPanelCtx)
  const shouldReduce = useReducedMotion()

  if (!collapsible) {
    return (
      <div className={cn('px-4 md:px-5 pb-4 md:pb-5', className)}>
        {children}
      </div>
    )
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="body"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: shouldReduce ? 0.01 : 0.25, ease: [0, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className={cn('px-4 md:px-5 pb-4 md:pb-5', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SummaryPanel({
  defaultOpen = true,
  collapsible = false,
  className,
  children,
  ...props
}: SummaryPanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <SummaryPanelCtx.Provider value={{ isOpen, toggle: () => setIsOpen((o) => !o), collapsible }}>
      <div
        className={cn(
          'rounded-xl border border-border bg-card shadow-card overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SummaryPanelCtx.Provider>
  )
}

SummaryPanel.Header = Header
SummaryPanel.Body = Body
