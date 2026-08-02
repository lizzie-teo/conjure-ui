import type { ComponentPropsWithRef, JSX } from 'react'

/**
 * Event handlers that `motion.*` elements redefine with signatures incompatible
 * with the DOM ones. Spreading raw HTML props onto a motion element without
 * removing these fails to typecheck.
 */
type MotionConflictingProps =
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'

/**
 * Standard props (including `ref`) for the intrinsic element `T`, safe to
 * forward onto the corresponding `motion.T`.
 *
 * Use this instead of `ComponentPropsWithRef<T>` on any component whose root
 * element is a motion element, so consumers still get `id`, `data-*`, `aria-*`,
 * `title`, `style` and a working `ref`.
 */
export type MotionElementProps<T extends keyof JSX.IntrinsicElements> = Omit<
  ComponentPropsWithRef<T>,
  MotionConflictingProps
>

export type MotionSpanProps = MotionElementProps<'span'>
export type MotionDivProps = MotionElementProps<'div'>
export type MotionButtonProps = MotionElementProps<'button'>
export type MotionLiProps = MotionElementProps<'li'>
export type MotionUlProps = MotionElementProps<'ul'>
