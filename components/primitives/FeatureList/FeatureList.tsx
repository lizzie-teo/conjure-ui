import type { ComponentPropsWithRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../../lib/utils'

export interface FeatureListProps extends Omit<ComponentPropsWithRef<'ul'>, 'children'> {
  items: string[]
  /** `inverse` for lists sitting on a bg-primary surface, where a primary check would vanish. */
  tone?: 'default' | 'inverse'
}

export function FeatureList({ items, tone = 'default', className, ...props }: FeatureListProps) {
  const inverse = tone === 'inverse'

  return (
    // role="list" restores list semantics Safari drops once list-style is removed
    <ul
      role="list"
      className={cn(
        'flex flex-col gap-1.5 @md:gap-2',
        inverse ? 'text-primary-foreground' : 'text-foreground',
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 @md:gap-3 text-sm @md:text-base">
          <Check
            aria-hidden="true"
            className={cn('mt-0.5 size-4 @md:size-5 shrink-0', inverse ? 'text-primary-foreground' : 'text-primary')}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
