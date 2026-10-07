'use client'

import { useState, type ComponentPropsWithRef } from 'react'
import { Heart } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// Save-for-later heart. A toggle, so it carries aria-pressed rather than swapping its label.
//
// `onImage` is for a heart that floats over a photo: an outlined heart over a soft dark scrim,
// so it reads on any picture. The literal white/black there is a legibility specification over
// arbitrary photography (as in MediaCarousel), not a themeable surface. `surface` is the round
// button used on a plain background, e.g. a detail page header.

export interface FavoriteButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'onChange' | 'children'> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  /** What is being saved, e.g. "Weekend city tour". Spoken as "Save Weekend city tour". */
  itemName: string
  appearance?: 'onImage' | 'surface'
}

export function FavoriteButton({
  pressed,
  defaultPressed = false,
  onPressedChange,
  itemName,
  appearance = 'onImage',
  className,
  onClick,
  ...props
}: FavoriteButtonProps) {
  const shouldReduce = useReducedMotion()
  const [internal, setInternal] = useState(defaultPressed)
  const isPressed = pressed ?? internal

  return (
    <Button
      variant="ghost"
      aria-pressed={isPressed}
      aria-label={`Save ${itemName}`}
      onClick={(e) => {
        onClick?.(e)
        if (pressed === undefined) setInternal(!isPressed)
        onPressedChange?.(!isPressed)
      }}
      className={cn(
        'size-10 @md:size-9 pointer-coarse:size-11 rounded-full p-0 active:scale-[0.97]',
        appearance === 'onImage'
          ? 'text-white hover:bg-black/10 hover:text-white'
          : 'bg-card text-foreground shadow-[var(--shadow-sm)] hover:bg-card',
        className
      )}
      {...props}
    >
      {/* A short pop on save: the one moment of motion here, and it confirms the tap */}
      <motion.span
        key={String(isPressed)}
        initial={{ scale: isPressed && !shouldReduce ? 0.7 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="flex"
      >
        <Heart
          className={cn(
            'size-5 @md:size-6',
            appearance === 'onImage' && 'drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]',
            isPressed && 'fill-primary text-primary'
          )}
          strokeWidth={appearance === 'onImage' && !isPressed ? 2.25 : 2}
        />
      </motion.span>
    </Button>
  )
}
