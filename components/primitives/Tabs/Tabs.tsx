'use client'

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface TabsItem {
  value: string
  label: string
  /** A small down-chevron beside the label, before or after it. Turns over when the tab is active. */
  chevron?: 'start' | 'end'
  /** An icon or small illustration above the label. When any tab has one, all tabs stack. */
  icon?: ReactNode
  /** A short flag on the icon's corner, e.g. "New". */
  badge?: string
}

interface TabsContextValue {
  baseId: string
  selected: string | undefined
}

const TabsCtx = createContext<TabsContextValue>({ baseId: '', selected: undefined })

const tabId = (base: string, value: string) => `${base}-tab-${value}`
const panelId = (base: string, value: string) => `${base}-panel-${value}`

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'onChange'> {
  items: TabsItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Accessible name for the tab row — "Offer categories". */
  label: string
}

function Chevron({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="flex"
      animate={{ rotate: active && !reduce ? 180 : 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <ChevronDown className="size-4 @md:size-5" />
    </motion.span>
  )
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  label,
  className,
  children,
  ...props
}: TabsProps) {
  const shouldReduce = useReducedMotion() ?? false
  const baseId = useId()
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value)
  const selected = value ?? internal
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  // Icon tabs are category switchers (Homes / Experiences / Services): they share the width
  // evenly instead of scrolling, and stack the icon over the label
  const stacked = items.some((t) => t.icon)

  function select(next: string) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  // Tab-list keyboard contract with automatic activation: arrows move and select
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = items.findIndex((t) => t.value === selected)
    const next =
      e.key === 'ArrowRight' ? (i + 1) % items.length
      : e.key === 'ArrowLeft' ? (i - 1 + items.length) % items.length
      : e.key === 'Home' ? 0
      : e.key === 'End' ? items.length - 1
      : null
    if (next === null) return
    e.preventDefault()
    select(items[next].value)
    tabs.current[next]?.focus()
    tabs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  // Only the active Tabs.Panel renders, inside AnimatePresence so the swap can exit
  const all = Children.toArray(children)
  const isPanel = (c: unknown) => isValidElement<TabsPanelProps>(c) && c.type === Panel
  const activePanel = all.find((c) => isPanel(c) && (c as { props: TabsPanelProps }).props.value === selected)
  const rest = all.filter((c) => !isPanel(c))

  return (
    <TabsCtx.Provider value={{ baseId, selected }}>
      <div className={cn('flex flex-col gap-4 @md:gap-6', className)} {...props}>
        {/* Scrolls sideways when the tabs outgrow a narrow container instead of wrapping */}
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className={cn(
            'flex border-b border-border',
            stacked ? 'justify-around' : 'gap-1 @md:gap-2 overflow-x-auto [scrollbar-width:none]'
          )}
        >
          {items.map((item, i) => {
            const isSelected = item.value === selected
            return (
              <Button
                key={item.value}
                ref={(el) => { tabs.current[i] = el }}
                variant="ghost"
                role="tab"
                id={tabId(baseId, item.value)}
                aria-selected={isSelected}
                aria-controls={panelId(baseId, item.value)}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => select(item.value)}
                className={cn(
                  'relative shrink-0 h-10 @md:h-11 pointer-coarse:min-h-11 rounded-none px-3 @md:px-4 gap-1',
                  'text-sm @md:text-base font-medium transition-colors duration-100 hover:bg-transparent',
                  stacked && 'h-auto @md:h-auto flex-1 flex-col gap-1.5 pt-1 pb-3 text-xs @md:text-sm',
                  isSelected
                    ? stacked ? 'text-foreground hover:text-foreground' : 'text-primary hover:text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.icon && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'relative flex size-9 @md:size-10 items-center justify-center transition-opacity duration-150',
                      // `!` beats Button's own default icon size, which targets the same svg
                      '[&_svg]:size-6! @md:[&_svg]:size-7! [&_img]:size-full [&_img]:object-contain',
                      !isSelected && 'opacity-70'
                    )}
                  >
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-1 left-2/3 rounded-full bg-primary px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase leading-none tracking-wide text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
                {item.chevron === 'start' && <Chevron active={isSelected} reduce={shouldReduce} />}
                {item.label}
                {/* Icon tabs draw the badge on the icon (hidden there), so speak it once here */}
                {item.badge && item.icon && <span className="sr-only">, {item.badge}</span>}
                {item.badge && !item.icon && (
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase leading-none tracking-wide text-primary">
                    {item.badge}
                  </span>
                )}
                {item.chevron === 'end' && <Chevron active={isSelected} reduce={shouldReduce} />}
                {isSelected && (
                  <motion.span
                    layoutId={`${baseId}-underline`}
                    aria-hidden="true"
                    className={cn('absolute -bottom-px h-0.5', stacked ? 'inset-x-4 bg-foreground' : 'inset-x-0 bg-primary')}
                    transition={{ duration: shouldReduce ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </Button>
            )
          })}
        </div>
        {rest}
        {/* mode="wait": the old panel fades out before the new one fades in, so they never stack */}
        <AnimatePresence mode="wait" initial={false}>
          {activePanel}
        </AnimatePresence>
      </div>
    </TabsCtx.Provider>
  )
}

export interface TabsPanelProps extends MotionDivProps {
  /** The `value` of the tab this panel belongs to. */
  value: string
}

function Panel({ value, className, children, ...props }: TabsPanelProps) {
  const { baseId } = useContext(TabsCtx)
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      {...props}
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      tabIndex={0}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] } }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : 4, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
      className={cn('outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-md', className)}
    >
      {children}
    </motion.div>
  )
}

Tabs.Panel = Panel
