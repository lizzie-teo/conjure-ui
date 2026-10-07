'use client'

import type { ComponentPropsWithRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'

export interface SkeletonProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  shape: 'line' | 'heading' | 'code' | 'bullet-list'
  lines?: number
}

// Token-based shimmer: sweeps from muted → accent (slightly lighter) → muted
const SHIMMER_GRADIENT = {
  backgroundImage:
    'linear-gradient(90deg, var(--color-muted) 0%, var(--color-accent) 45%, var(--color-muted) 100%)',
  backgroundSize: '200% 100%',
}

// Widths cycle across lines to give a natural "real text" silhouette
const LINE_WIDTHS = ['w-full', 'w-5/6', 'w-4/5', 'w-full', 'w-3/4', 'w-5/6']

export function Skeleton({ shape, lines = 3, className, style, ...props }: SkeletonProps) {
  const shouldReduce = useReducedMotion()
  const shimmerClass = shouldReduce ? '' : 'animate-shimmer'
  const shimmerStyle = shouldReduce ? undefined : SHIMMER_GRADIENT

  if (shape === 'heading') {
    return (
      <div
        className={cn('h-6 @md:h-7 w-3/4 rounded-md bg-muted', shimmerClass, className)}
        style={{ ...shimmerStyle, ...style }}
        {...props}
      />
    )
  }

  if (shape === 'code') {
    return (
      <div
        className={cn('rounded-lg bg-muted p-3 @md:p-4 space-y-2 @md:space-y-3', className)}
        style={style}
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-3 @md:h-4 rounded bg-muted-foreground/15',
              i % 3 === 0 ? 'w-4/5' : i % 3 === 1 ? 'w-full' : 'w-2/3',
              shimmerClass
            )}
            style={shimmerStyle}
          />
        ))}
      </div>
    )
  }

  if (shape === 'bullet-list') {
    return (
      <div className={cn('space-y-2 @md:space-y-3', className)} style={style} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 @md:gap-3">
            <span className="size-1.5 @md:size-2 rounded-full bg-muted-foreground/30 shrink-0" />
            <div
              className={cn(
                'h-4 @md:h-5 rounded-md bg-muted flex-1',
                i % 2 === 0 ? 'max-w-full' : 'max-w-[85%]',
                shimmerClass
              )}
              style={shimmerStyle}
            />
          </div>
        ))}
      </div>
    )
  }

  // shape === 'line'
  return (
    <div className={cn('space-y-2 @md:space-y-3', className)} style={style} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 @md:h-5 rounded-md bg-muted',
            LINE_WIDTHS[i % LINE_WIDTHS.length],
            shimmerClass
          )}
          style={shimmerStyle}
        />
      ))}
    </div>
  )
}
