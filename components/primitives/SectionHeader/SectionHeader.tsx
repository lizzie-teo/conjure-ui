import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

export interface SectionHeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'title' | 'children'> {
  title: ReactNode
  /** Makes the title itself a link with a chevron ("Chefs ›"), the compact alternative to a
   *  separate "View all" action. */
  titleHref?: string
  /** Heading level, so the header slots into the page outline it sits in. */
  as?: 'h2' | 'h3' | 'h4'
  /** Text for the right-hand action, e.g. "View all". Omit for a title-only header. */
  actionLabel?: string
  /** Renders the action as a link. Takes precedence over `onAction`. */
  actionHref?: string
  onAction?: MouseEventHandler<HTMLButtonElement>
}

const actionClasses =
  'group/action inline-flex shrink-0 items-center gap-1 text-sm @md:text-base font-medium text-primary tap-target rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50'

// The arrow, not an underline, answers "where does this go?" — and nudges toward it on hover
const arrow = (
  <ArrowRight
    aria-hidden="true"
    className="size-3.5 @md:size-4 transition-transform duration-200 ease-out group-hover/action:translate-x-0.5 motion-reduce:transition-none"
  />
)

export function SectionHeader({
  title,
  titleHref,
  as: Heading = 'h2',
  actionLabel,
  actionHref,
  onAction,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)} {...props}>
      <Heading className="min-w-0 truncate text-base @md:text-lg font-semibold tracking-tight text-foreground">
        {titleHref ? (
          <a
            href={titleHref}
            className="group/title inline-flex items-center gap-0.5 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {title}
            <ChevronRight
              aria-hidden="true"
              className="size-4 @md:size-5 transition-transform duration-200 ease-out group-hover/title:translate-x-0.5 motion-reduce:transition-none"
            />
          </a>
        ) : (
          title
        )}
      </Heading>
      {actionLabel && actionHref && (
        <a href={actionHref} className={actionClasses}>
          {actionLabel}
          {arrow}
        </a>
      )}
      {actionLabel && !actionHref && onAction && (
        <Button variant="link" onClick={onAction} className={cn(actionClasses, 'h-auto p-0 tap-target hover:no-underline')}>
          {actionLabel}
          {arrow}
        </Button>
      )}
    </div>
  )
}
