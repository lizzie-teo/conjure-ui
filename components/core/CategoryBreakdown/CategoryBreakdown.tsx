'use client'

import type { ComponentPropsWithRef, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { CurrencyAmount } from '../../primitives/CurrencyAmount/CurrencyAmount'
import { cn } from '../../../lib/utils'

// "Where did it go?" answered the way banking apps answer it: a ranked list. Each row carries the
// category, its figure, a bar for its share and — when it links — a chevron to drill in.
// Horizontal rows beat vertical bars for categories: names never truncate, eight categories fit
// as easily as three, the largest is always on top, and each row is a tap target.

export interface CategoryBreakdownItem {
  id: string
  label: string
  value: number
  /** Optional icon or logo, shown in a muted disc before the label. */
  icon?: ReactNode
  /** A second line, e.g. "4 offers used". */
  meta?: string
  /** Makes the row a link to that category's detail. */
  href?: string
}

export interface CategoryBreakdownProps extends Omit<ComponentPropsWithRef<'ul'>, 'children'> {
  items: CategoryBreakdownItem[]
  currency: string
  locale?: string
  /** Keep the order given instead of ranking largest first. */
  preserveOrder?: boolean
  /** Bars measure each row against the largest (`max`) or against the total (`total`). */
  scale?: 'max' | 'total'
}

const ease = [0, 0, 0.2, 1] as const

export function CategoryBreakdown({
  items,
  currency,
  locale,
  preserveOrder = false,
  scale = 'max',
  className,
  ...props
}: CategoryBreakdownProps) {
  const shouldReduce = useReducedMotion()
  const rows = preserveOrder ? items : [...items].sort((a, b) => b.value - a.value)
  const total = items.reduce((sum, i) => sum + i.value, 0)
  const base = scale === 'total' ? total : Math.max(...items.map((i) => i.value), 0)

  return (
    <ul role="list" className={cn('flex flex-col', className)} {...props}>
      {rows.map((item, i) => {
        const width = base > 0 ? (item.value / base) * 100 : 0
        const share = total > 0 ? Math.round((item.value / total) * 100) : 0
        return (
          <li
            key={item.id}
            className={cn(
              'relative flex items-center gap-3 py-3 @md:py-4',
              i > 0 && 'border-t border-border',
              item.href && 'group/cat'
            )}
          >
            {item.icon && (
              <span
                aria-hidden="true"
                className="flex size-9 @md:size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground [&_svg]:size-4 @md:[&_svg]:size-5"
              >
                {item.icon}
              </span>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="line-clamp-2 text-sm @md:text-base font-medium text-foreground outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <p className="line-clamp-2 text-sm @md:text-base font-medium text-foreground">{item.label}</p>
                  )}
                  {item.meta && <p className="truncate text-xs @md:text-sm text-muted-foreground">{item.meta}</p>}
                </div>
                <CurrencyAmount value={item.value} currency={currency} locale={locale} size="sm" className="shrink-0" />
              </div>
              {/* Share bar. The bar shows the share; the percentage is spoken instead of printed. */}
              <div>
                <div aria-hidden="true" className="h-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full origin-left rounded-full bg-primary"
                    style={{ width: `${width}%` }}
                    initial={{ scaleX: shouldReduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: shouldReduce ? 0 : 0.3, ease, delay: shouldReduce ? 0 : i * 0.04 }}
                  />
                </div>
                <span className="sr-only">{share}% of total</span>
              </div>
            </div>
            {item.href && (
              <ChevronRight
                aria-hidden="true"
                className="size-4 @md:size-5 shrink-0 text-muted-foreground/60 transition-transform duration-200 ease-out group-hover/cat:translate-x-0.5 motion-reduce:transition-none"
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
