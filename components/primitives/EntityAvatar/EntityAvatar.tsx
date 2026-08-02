'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { MotionDivProps } from '../../../lib/prop-types'
import { cn } from '../../../lib/utils'

export const entityAvatarBase = 'inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium overflow-hidden'

export const entityAvatarSizeClasses = {
  sm: 'size-7 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
}

const avatarVariants = cva(entityAvatarBase, {
    variants: {
      size: entityAvatarSizeClasses,
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface EntityAvatarProps
  extends Omit<MotionDivProps, 'children'>,
    VariantProps<typeof avatarVariants> {
  fallback: string
  src?: string
  alt?: string
  /** Pulse breathe loop while AI is composing — stops as soon as streaming begins */
  isGenerating?: boolean
}

export function EntityAvatar({ fallback, src, alt, size, isGenerating = false, className, ...props }: EntityAvatarProps) {
  const shouldReduce = useReducedMotion()
  const initials = fallback
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <motion.div
      className={cn(avatarVariants({ size }), className)}
      animate={
        !shouldReduce && isGenerating
          ? { scale: [1, 1.025, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 2.4, repeat: isGenerating ? Infinity : 0, ease: 'easeInOut' }}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? fallback} className="size-full object-cover" />
      ) : (
        <span aria-label={fallback}>{initials}</span>
      )}
    </motion.div>
  )
}
