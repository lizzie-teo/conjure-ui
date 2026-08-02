'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
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

type HeaderProps = ComponentPropsWithRef<'div'>

type BodyProps = ComponentPropsWithRef<'div'>

function Header({ children, className, ...props }: HeaderProps) {
  const { isOpen, toggle, collapsible } = useContext(SummaryPanelCtx)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div
      // Spread first: when collapsible, the header owns a button a11y contract
      // and the toggle handler, which a consumer prop must not silently break.
      {...props}
      className={cn(
        'flex items-center justify-between gap-2 px-4 md:px-5 py-3 md:py-4',
        collapsible && 'cursor-pointer select-none',
        className
      )}
      onClick={collapsible ? toggle : undefined}
      // role="button" without a tab stop and key handling is a control only a
      // mouse can reach — the panel would be permanently open for keyboard users.
      onKeyDown={collapsible ? handleKeyDown : undefined}
      role={collapsible ? 'button' : undefined}
      tabIndex={collapsible ? 0 : undefined}
      aria-expanded={collapsible ? isOpen : undefined}
    >
      <div className="font-semibold text-sm md:text-base text-foreground">{children}</div>
      {collapsible && (
        <motion.span
          aria-hidden
          // A decorative marker, not a second control: a real Button here would
          // nest a button inside the header's own button role.
          className="inline-flex items-center justify-center size-6 shrink-0"
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        >
          <ChevronDown className="size-3.5 md:size-4 text-muted-foreground" />
        </motion.span>
      )}
    </div>
  )
}

function Body({ children, className, ...props }: BodyProps) {
  const { isOpen, collapsible } = useContext(SummaryPanelCtx)
  const shouldReduce = useReducedMotion()

  if (!collapsible) {
    return (
      <div className={cn('px-4 md:px-5 pb-4 md:pb-5', className)} {...props}>
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
          <div className={cn('px-4 md:px-5 pb-4 md:pb-5', className)} {...props}>
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
