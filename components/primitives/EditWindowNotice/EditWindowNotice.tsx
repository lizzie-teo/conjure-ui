import type { ComponentPropsWithRef } from 'react'
import { PencilLine } from 'lucide-react'
import { cn } from '../../../lib/utils'

export interface EditWindowNoticeProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  editableUntil: string
}

function formatDateTime(isoString: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(isoString))
}

export function EditWindowNotice({ editableUntil, className, ...props }: EditWindowNoticeProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2.5 md:py-3',
        className
      )}
      {...props}
    >
      <PencilLine className="size-3.5 md:size-4 text-muted-foreground shrink-0 mt-0.5" />
      <p className="text-xs md:text-sm text-muted-foreground leading-snug">
        You can edit or cancel this order until{' '}
        <span className="text-foreground font-medium">{formatDateTime(editableUntil)}</span>.
      </p>
    </div>
  )
}
