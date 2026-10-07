'use client'

import { createContext, useContext, useId, type ComponentPropsWithRef, type MouseEventHandler, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// A tab bar for the bottom of a phone screen: up to five icon + label items. The bar does not fix
// itself to the viewport — the app shell decides that — but it does pad for the home indicator
// with safe-area-inset-bottom, which is 0 everywhere except a notched phone.

export type BottomNavProps = ComponentPropsWithRef<'nav'>

// One shared layoutId per bar, so the current-item pill slides between items
const IndicatorContext = createContext<string | null>(null)

interface ItemProps extends Omit<ComponentPropsWithRef<'li'>, 'onClick' | 'children'> {
  icon: ReactNode
  label: string
  /** Renders the item as a link. Without it, the item is a button that calls `onClick`. */
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  current?: boolean
  /** `true` for a dot ("something new"), a number for a count. 0 or undefined shows nothing. */
  badge?: boolean | number
  /** Spoken with the label, e.g. (n) => `${n} new`. */
  badgeLabel?: (count: number | true) => string
}

function ItemInner({ icon, label, current, badge }: Pick<ItemProps, 'icon' | 'label' | 'current' | 'badge'>) {
  const indicatorId = useContext(IndicatorContext)
  const shouldReduce = useReducedMotion()
  return (
    <>
      <span className="relative flex h-7 w-12 @md:w-14 items-center justify-center">
        {current && (
          <motion.span
            layoutId={indicatorId ?? undefined}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary/10"
            transition={{ duration: shouldReduce ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
        <span className="relative [&_svg]:size-5 @md:[&_svg]:size-6">
          {icon}
          {/* Spoken through the item's aria-label, so the visual is hidden */}
          {badge === true && (
            <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
          )}
          {typeof badge === 'number' && badge > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[0.625rem] font-semibold leading-none tabular-nums text-destructive-foreground ring-2 ring-card"
            >
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </span>
      </span>
      <span className="max-w-full truncate text-xs leading-tight">{label}</span>
    </>
  )
}

const itemClasses = (current?: boolean) =>
  cn(
    'flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1.5',
    'min-h-14 outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    'transition-colors duration-100',
    current ? 'font-semibold text-primary' : 'font-normal text-muted-foreground hover:text-foreground'
  )

// ref and rest props land on the <li>; className styles the control inside it
function Item({
  icon,
  label,
  href,
  onClick,
  current,
  badge,
  badgeLabel = (n) => (n === true ? 'new' : `${n} new`),
  className,
  ...props
}: ItemProps) {
  const hasBadge = badge === true || (typeof badge === 'number' && badge > 0)
  const name = hasBadge ? `${label}, ${badgeLabel(badge as number | true)}` : undefined
  if (href) {
    return (
      <li className="flex flex-1" {...props}>
        <a
          href={href}
          onClick={onClick}
          aria-current={current ? 'page' : undefined}
          aria-label={name}
          className={cn(itemClasses(current), className)}
        >
          <ItemInner icon={icon} label={label} current={current} badge={badge} />
        </a>
      </li>
    )
  }
  return (
    <li className="flex flex-1" {...props}>
      <Button
        variant="ghost"
        onClick={onClick}
        aria-current={current ? 'page' : undefined}
        aria-label={name}
        className={cn(itemClasses(current), 'h-auto min-h-14 hover:bg-transparent', className)}
      >
        <ItemInner icon={icon} label={label} current={current} badge={badge} />
      </Button>
    </li>
  )
}

export function BottomNav({ children, className, 'aria-label': ariaLabel = 'Main', ...props }: BottomNavProps) {
  const indicatorId = useId()
  return (
    <IndicatorContext.Provider value={indicatorId}>
      <nav
        aria-label={ariaLabel}
        className={cn(
          'w-full border-t border-border bg-card/90 backdrop-blur-md shadow-[var(--shadow-elevated)]',
          'px-1 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]',
          className
        )}
        {...props}
      >
        <ul role="list" className="mx-auto flex max-w-md items-stretch">
          {children}
        </ul>
      </nav>
    </IndicatorContext.Provider>
  )
}

BottomNav.Item = Item
