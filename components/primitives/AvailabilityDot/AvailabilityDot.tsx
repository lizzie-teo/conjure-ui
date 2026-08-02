import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export type AvailabilityLevel = 'available' | 'limited' | 'unavailable'

// Semantic icon colors — used by the SVG (decorative, non-text)
export const availabilityColorClasses: Record<AvailabilityLevel, string> = {
  available: 'text-success',
  limited: 'text-warning',
  unavailable: 'text-muted-foreground/50',
}

// Always high-contrast for text labels — never inherit the icon color
export const availabilityLabelColorClasses: Record<AvailabilityLevel, string> = {
  available: 'text-foreground',
  limited: 'text-foreground',
  unavailable: 'text-muted-foreground',
}

const availabilityLabels: Record<AvailabilityLevel, string> = {
  available: 'Available',
  limited: 'Limited availability',
  unavailable: 'Unavailable',
}

function AvailableIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={className}>
      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function LimitedIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={className}>
      <path d="M 5 1 A 4 4 0 0 1 5 9 Z" fill="currentColor" />
      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function UnavailableIcon({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={className}>
      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2.17" y1="2.17" x2="7.83" y2="7.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const icons = {
  available: AvailableIcon,
  limited: LimitedIcon,
  unavailable: UnavailableIcon,
}

export interface AvailabilityDotProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  level: AvailabilityLevel
  showLabel?: boolean
}

export function AvailabilityDot({
  level,
  showLabel = false,
  className,
  'aria-hidden': ariaHidden,
  ...props
}: AvailabilityDotProps) {
  const Icon = icons[level]
  return (
    <span
      className={cn('inline-flex items-center gap-1.5', className)}
      aria-label={ariaHidden ? undefined : availabilityLabels[level]}
      aria-hidden={ariaHidden}
      {...props}
    >
      {/* Icon gets the semantic color; label text is always high-contrast */}
      <Icon className={availabilityColorClasses[level]} />
      {showLabel && (
        <span className={cn('text-xs', availabilityLabelColorClasses[level])}>
          {availabilityLabels[level]}
        </span>
      )}
    </span>
  )
}
