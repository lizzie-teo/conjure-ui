'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export type MediaCardProps = MotionDivProps

interface MediaProps {
  src: string
  alt: string
  className?: string
}

interface TitleProps {
  children: React.ReactNode
  className?: string
}

interface SubtitleProps {
  children: React.ReactNode
  className?: string
}

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

interface MetaProps {
  children: React.ReactNode
  className?: string
}

interface BodyProps {
  children: React.ReactNode
  className?: string
}

function Media({ src, alt, className }: MediaProps) {
  return (
    <div className={cn('overflow-hidden rounded-t-xl', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-40 md:h-48 object-cover"
      />
    </div>
  )
}

function Body({ children, className }: BodyProps) {
  return (
    <div className={cn('p-4 md:p-5 flex flex-col gap-2', className)}>
      {children}
    </div>
  )
}

function Title({ children, className }: TitleProps) {
  return (
    <h3 className={cn('font-semibold text-sm md:text-base text-foreground leading-snug', className)}>
      {children}
    </h3>
  )
}

function Subtitle({ children, className }: SubtitleProps) {
  return (
    <p className={cn('text-xs md:text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}

function Badge({ children, className }: BadgeProps) {
  return <div className={cn('flex', className)}>{children}</div>
}

function Meta({ children, className }: MetaProps) {
  return (
    <div className={cn('flex items-center gap-1.5 text-xs md:text-sm', className)}>
      {children}
    </div>
  )
}

export function MediaCard({ className, children, ...props }: MediaCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      whileHover={{ y: shouldReduce ? 0 : -3, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] } }}
      className={cn(
        'rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]',
        'transition-shadow duration-200 hover:shadow-[var(--shadow-elevated)] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

MediaCard.Media = Media
MediaCard.Body = Body
MediaCard.Title = Title
MediaCard.Subtitle = Subtitle
MediaCard.Badge = Badge
MediaCard.Meta = Meta
