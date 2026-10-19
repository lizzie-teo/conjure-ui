'use client'

import { useEffect, useMemo, useRef, type ComponentPropsWithRef } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'motion/react'
import { duration as durations, ease } from '../../../lib/motion'
import { cn } from '../../../lib/utils'

export interface CountUpProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  /** The number to land on. Changing it animates from the current figure. */
  value: number
  /** Where the first count starts. */
  from?: number
  /** Seconds. Defaults to the `slow` token (500ms). */
  duration?: number
  /** BCP 47 locale for formatting, e.g. `en-AU`. Defaults to the browser's. */
  locale?: string
  /** `Intl.NumberFormat` options — currency, percent, decimal places. */
  format?: Intl.NumberFormatOptions
}

/**
 * Counts a figure up to its value — for a balance, total or stat the person
 * has just arrived at. Screen readers get only the final value; reduced
 * motion shows it immediately.
 */
export function CountUp({
  value,
  from = 0,
  duration = durations.slow,
  locale,
  format,
  className,
  ...props
}: CountUpProps) {
  const reduce = useReducedMotion() ?? false
  const formatKey = JSON.stringify(format ?? {})
  // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on the serialised options so an inline object does not rebuild it every render
  const formatter = useMemo(() => new Intl.NumberFormat(locale, format), [locale, formatKey])
  const displayRef = useRef<HTMLSpanElement>(null)
  const current = useMotionValue(reduce ? value : from)

  useEffect(() => {
    const write = (v: number) => {
      if (displayRef.current) displayRef.current.textContent = formatter.format(v)
    }
    const unsubscribe = current.on('change', write)
    if (reduce) {
      current.set(value)
      write(value)
      return unsubscribe
    }
    const controls = animate(current, value, { duration, ease: ease.out })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, duration, reduce, formatter, current])

  return (
    <span className={cn('tabular-nums', className)} {...props}>
      <span ref={displayRef} aria-hidden>
        {formatter.format(current.get())}
      </span>
      <span className="sr-only">{formatter.format(value)}</span>
    </span>
  )
}
