'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

export type CardStripProps = MotionDivProps

type ItemProps = ComponentPropsWithRef<'div'>

function Item({ children, className, ...props }: ItemProps) {
  return (
    <div className={cn('snap-start shrink-0 w-[280px] md:w-[300px]', className)} {...props}>
      {children}
    </div>
  )
}

export function CardStrip({ children, className, ...props }: CardStripProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      className={cn(
        'flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pr-6',
        className
      )}
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      aria-label="Scroll for more options"
      {...props}
    >
      {children}
    </motion.div>
  )
}

CardStrip.Item = Item
