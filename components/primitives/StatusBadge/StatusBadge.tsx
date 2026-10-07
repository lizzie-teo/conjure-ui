import type { ComponentPropsWithRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

export const statusBadgeBase = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs @md:text-sm font-medium'

export const statusBadgeVariantClasses = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-destructive/10 text-destructive',
  info: 'bg-primary/10 text-primary',
}

const statusBadgeVariants = cva(statusBadgeBase, {
    variants: {
      variant: statusBadgeVariantClasses,
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface StatusBadgeProps
  extends Omit<ComponentPropsWithRef<'span'>, 'children'>,
    VariantProps<typeof statusBadgeVariants> {
  label: string
}

export function StatusBadge({ label, variant, className, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {label}
    </span>
  )
}
