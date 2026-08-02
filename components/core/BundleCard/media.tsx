'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'

/**
 * Domain-neutral media treatments for `BundleCard`'s `hero` slot.
 *
 * These were previously trapped inside `MakeupRecipeCard` as `CollageHero` /
 * `CarouselHero`. Nothing about them is beauty-specific — a collage of three
 * dishes, three rooms, or three garments works identically. Lifting them out is
 * the point: the *hero* is a genuinely different affordance from the *card*,
 * so it belongs in a slot, not in a branch.
 */

export interface MediaFrame {
  id: string
  src: string
  alt?: string
}

type MediaProps = Omit<ComponentPropsWithRef<'div'>, 'children'>

// ── Single ────────────────────────────────────────────────────────────────────

export interface MediaSingleProps extends MediaProps {
  src: string
  alt?: string
}

export function MediaSingle({ src, alt = '', className, ...props }: MediaSingleProps) {
  return (
    <div className={cn('h-40 md:h-48 overflow-hidden', className)} {...props}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

// ── Colour strip ──────────────────────────────────────────────────────────────

export interface MediaSwatchStripProps extends MediaProps {
  /** Literal product colours — real-world pigment data, not design tokens. */
  colors: string[]
}

export function MediaSwatchStrip({ colors, className, ...props }: MediaSwatchStripProps) {
  return (
    <div className={cn('flex h-2 overflow-hidden', className)} {...props}>
      {colors.map((color, i) => (
        <div key={`${color}-${i}`} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}

// ── Collage ───────────────────────────────────────────────────────────────────

export interface MediaCollageProps extends MediaProps {
  frames: MediaFrame[]
  /** Rendered when `frames` is empty — e.g. a swatch strip. */
  fallback?: React.ReactNode
}

export function MediaCollage({ frames, fallback = null, className, ...props }: MediaCollageProps) {
  if (frames.length === 0) return <>{fallback}</>

  const [focal, ...rest] = frames

  if (frames.length === 1) {
    return <MediaSingle src={focal.src} alt={focal.alt} className={cn('md:h-44', className)} {...props} />
  }

  if (frames.length === 2) {
    return (
      <div className={cn('flex h-40 md:h-44 overflow-hidden gap-px bg-border', className)} {...props}>
        <img src={focal.src} alt={focal.alt ?? ''} className="flex-1 h-full object-cover min-w-0" />
        <img src={rest[0].src} alt={rest[0].alt ?? ''} className="flex-1 h-full object-cover min-w-0" />
      </div>
    )
  }

  // Three or more — focal takes 2/3, supporting frames stack in the remaining 1/3
  return (
    <div className={cn('flex h-40 md:h-44 overflow-hidden gap-px bg-border', className)} {...props}>
      <img src={focal.src} alt={focal.alt ?? ''} className="w-2/3 h-full object-cover shrink-0" />
      <div className="flex flex-col flex-1 gap-px min-w-0">
        {rest.slice(0, 2).map(frame => (
          <img key={frame.id} src={frame.src} alt={frame.alt ?? ''} className="flex-1 w-full object-cover" />
        ))}
      </div>
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────────────────────

export interface MediaCarouselProps extends MediaProps {
  frames: MediaFrame[]
  fallback?: React.ReactNode
}

export function MediaCarousel({ frames, fallback = null, className, ...props }: MediaCarouselProps) {
  const shouldReduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)

  if (frames.length === 0) return <>{fallback}</>
  if (frames.length === 1) {
    return <MediaSingle src={frames[0].src} alt={frames[0].alt} className={cn('md:h-44', className)} {...props} />
  }

  const navigate = (newDir: number) => {
    setDir(newDir)
    setIndex(i => (i + newDir + frames.length) % frames.length)
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  return (
    <div className={cn('relative h-40 md:h-44 overflow-hidden bg-muted', className)} {...props}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: shouldReduce ? 0.01 : 0.3, ease: [0, 0, 0.2, 1] }}
          src={frames[index].src}
          alt={frames[index].alt ?? ''}
          className="absolute inset-0 w-full h-full object-cover"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40) navigate(1)
            else if (info.offset.x > 40) navigate(-1)
          }}
        />
      </AnimatePresence>

      {/* Scrim and dots sit over arbitrary photography — the literal white/black
          here is a legibility specification, not a themeable surface. */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Tiled 44px targets with the dot as an inner visual. `tap-target` would be
          wrong here: the dots sit ~6px apart, so overlapping pseudo hit areas
          would hand every tap to the last sibling. */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
        {frames.map((frame, i) => (
          <Button
            key={frame.id}
            variant="ghost"
            aria-label={`View image ${i + 1} of ${frames.length}`}
            aria-current={i === index}
            onClick={() => {
              setDir(i > index ? 1 : -1)
              setIndex(i)
            }}
            className="size-11 md:size-8 pointer-coarse:size-11 p-0 rounded-full hover:bg-transparent"
          >
            <span
              aria-hidden
              className={cn(
                'rounded-full transition-all duration-200',
                i === index ? 'size-2 bg-white' : 'size-1.5 bg-white/50 hover:bg-white/70'
              )}
            />
          </Button>
        ))}
      </div>
    </div>
  )
}
