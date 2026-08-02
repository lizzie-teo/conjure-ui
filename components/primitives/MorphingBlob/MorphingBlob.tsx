'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface MorphingBlobProps extends Omit<MotionDivProps, 'children'> {
  size?: 'sm' | 'md'
}

const sizeClasses: Record<NonNullable<MorphingBlobProps['size']>, string> = {
  sm: 'size-8',
  md: 'size-12',
}

// Keyframe border-radius values that trace a smooth organic loop
const BLOB_RADII = [
  '60% 40% 55% 45% / 45% 55% 45% 55%',
  '40% 60% 45% 55% / 55% 45% 55% 45%',
  '55% 45% 65% 35% / 40% 60% 50% 50%',
  '45% 55% 40% 60% / 50% 50% 60% 40%',
  '60% 40% 55% 45% / 45% 55% 45% 55%',
]

export function MorphingBlob({ size = 'md', className, ...props }: MorphingBlobProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className={cn('bg-muted-foreground/20', sizeClasses[size], className)}
      animate={{ borderRadius: shouldReduce ? '50%' : BLOB_RADII }}
      transition={
        shouldReduce
          ? {}
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
      {...props}
    />
  )
}
