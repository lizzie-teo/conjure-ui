import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface StepListItem {
  title: string
  description?: string
}

export interface StepListProps extends Omit<ComponentPropsWithRef<'ol'>, 'children'> {
  steps: StepListItem[]
}

export function StepList({ steps, className, ...props }: StepListProps) {
  return (
    // role="list" restores list semantics Safari drops once list-style is removed
    <ol role="list" className={cn('flex flex-col gap-3 @md:gap-4', className)} {...props}>
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 @md:gap-4">
          <span
            aria-hidden="true"
            className="flex size-6 @md:size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs @md:text-sm font-semibold tabular-nums text-primary-foreground"
          >
            {i + 1}
          </span>
          <div className="flex flex-col gap-0.5 pt-0.5">
            <span className="text-sm @md:text-base font-semibold text-foreground">{step.title}</span>
            {step.description && (
              <span className="text-xs @md:text-sm text-muted-foreground">{step.description}</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
