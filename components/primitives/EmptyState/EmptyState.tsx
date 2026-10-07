'use client'

import type { ComponentPropsWithRef } from 'react'
import { Package } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'

export interface EmptyStateProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  icon?: React.ReactNode
  heading: string
  body?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon, heading, body, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 @md:gap-4',
        'px-4 @md:px-6 py-8 @md:py-12 text-center',
        className
      )}
      {...props}
    >
      <div className="text-muted-foreground/50 [&_svg]:size-10 @md:[&_svg]:size-12">
        {icon ?? <Package aria-hidden />}
      </div>
      <div className="flex flex-col gap-1 @md:gap-1.5 max-w-xs">
        <p className="font-heading text-sm @md:text-base font-semibold text-foreground">{heading}</p>
        {body && (
          <p className="text-xs @md:text-sm text-muted-foreground leading-relaxed">{body}</p>
        )}
      </div>
      {action && (
        <Button
          variant="outline"
          onClick={action.onClick}
          className="h-12 @md:h-10 pointer-coarse:min-h-11 mt-1"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
