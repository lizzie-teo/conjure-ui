'use client'

import { useState, useRef, useLayoutEffect, Children } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

const MAX_ITEMS = 5
const COLLAPSED_OFFSET = 6
const EXPANDED_GAP = 12

export interface CardStackProps extends MotionDivProps {
  /** Controlled expanded state. Omit to use internal state. */
  expanded?: boolean
  /** Called whenever the stack expands or collapses. */
  onExpandChange?: (expanded: boolean) => void
  /** Initial expanded state when uncontrolled. */
  defaultExpanded?: boolean
}

type ItemProps = ComponentPropsWithRef<'div'>

function Item({ children, className, ...props }: ItemProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  )
}

export function CardStack({
  children,
  expanded,
  onExpandChange,
  defaultExpanded = false,
  className,
  ...props
}: CardStackProps) {
  const isControlled = expanded !== undefined
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = isControlled ? expanded! : internalExpanded

  const shouldReduce = useReducedMotion()
  const firstItemRef = useRef<HTMLDivElement>(null)
  const [cardHeight, setCardHeight] = useState(0)
  const [initialized, setInitialized] = useState(false)

  const items = Children.toArray(children)
  const count = Math.min(items.length, MAX_ITEMS)
  const capped = items.slice(0, count)

  if (process.env.NODE_ENV === 'development' && items.length > MAX_ITEMS) {
    console.warn(
      `CardStack: received ${items.length} items but only ${MAX_ITEMS} are supported. Extra items are hidden.`
    )
  }

  useLayoutEffect(() => {
    if (!firstItemRef.current) return

    const measure = () => {
      const height = firstItemRef.current!.getBoundingClientRect().height
      if (height > 0) {
        setCardHeight(height)
        setInitialized(true)
      }
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(firstItemRef.current)
    return () => observer.disconnect()
  }, [])

  const expandedOffset = cardHeight + EXPANDED_GAP
  const collapsedHeight = cardHeight + (count - 1) * COLLAPSED_OFFSET
  const expandedHeight = cardHeight + (count - 1) * expandedOffset

  const setExpanded = (next: boolean) => {
    if (!isControlled) setInternalExpanded(next)
    onExpandChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setExpanded(true)
    } else if (isExpanded && e.key === 'Escape') {
      setExpanded(false)
    }
  }

  return (
    <motion.div
      // Spread first: the root owns a button a11y contract (role/tabIndex/
      // keyboard + click handlers) that a consumer prop must not silently break.
      {...props}
      className={cn(
        'relative select-none',
        !isExpanded && 'cursor-pointer',
        className
      )}
      animate={initialized ? { height: isExpanded ? expandedHeight : collapsedHeight } : undefined}
      transition={
        !initialized || shouldReduce
          ? { duration: 0 }
          : { type: 'spring', stiffness: 320, damping: 28 }
      }
      onClick={!isExpanded ? () => setExpanded(true) : undefined}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Card options expanded' : 'Tap to expand card options'}
    >
      {capped.map((child, i) => (
        <motion.div
          key={i}
          ref={i === 0 ? firstItemRef : undefined}
          className="absolute inset-x-0 top-0"
          style={{ zIndex: count - i }}
          animate={{
            y: shouldReduce ? 0 : i * (isExpanded ? expandedOffset : COLLAPSED_OFFSET),
            rotate: shouldReduce ? 0 : i * (isExpanded ? 0 : -1.5),
          }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 28,
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

CardStack.Item = Item
