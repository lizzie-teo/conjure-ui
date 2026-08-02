'use client'

import { useMemo, type ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface TimestampLabelProps
  extends Omit<ComponentPropsWithRef<'time'>, 'children' | 'dateTime'> {
  datetime: string
}

function formatRelative(datetime: string): string {
  const date = new Date(datetime)
  const now = Date.now()
  const diffMs = now - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) return 'just now'
  if (diffSec < 3600) {
    const mins = Math.floor(diffSec / 60)
    return `${mins} min ago`
  }
  if (diffSec < 86400) {
    const hrs = Math.floor(diffSec / 3600)
    return `${hrs} hr ago`
  }
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  if (date.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric'
  return new Intl.DateTimeFormat(undefined, opts).format(date)
}

export function TimestampLabel({ datetime, className, ...props }: TimestampLabelProps) {
  const label = useMemo(() => formatRelative(datetime), [datetime])

  return (
    <time
      dateTime={datetime}
      className={cn('text-muted-foreground text-xs md:text-sm', className)}
      {...props}
    >
      {label}
    </time>
  )
}
