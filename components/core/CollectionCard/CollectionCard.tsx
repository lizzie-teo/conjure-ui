'use client'

import { createContext, useContext, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { ArrowLeftRight } from 'lucide-react'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { QuantityStepper } from '../../primitives/QuantityStepper/QuantityStepper'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { ReactNode, ComponentPropsWithRef } from 'react'
import type { MotionDivProps, MotionUlProps } from '../../../lib/prop-types'

/**
 * STRUCTURAL component — knows nothing about any domain.
 *
 * Presents one composed thing (a recipe, a look, an outfit, a bundle) as:
 *   hero → header → reviewable item list → collective action
 *
 * Domain meaning arrives through a *binding* (see `bindings.ts`), never through
 * a branch inside this file. If this component ever needs to know what industry
 * it is rendering, the abstraction is wrong.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type CollectionBadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface CollectionBadge {
  label: string
  variant?: CollectionBadgeVariant
}

export interface CollectionAlternative {
  id: string
  /** Replaces the row's label once chosen. */
  label: string
  /** Replaces the row's trailing content once chosen — a different price, size, shade. */
  trailing?: ReactNode
}

export interface CollectionItem {
  id: string
  /** Primary line — ingredient name, product shade, garment name. */
  label: string
  /** Small uppercase line above the label — category, type, step number. */
  eyebrow?: string
  /** Secondary line below the label. */
  note?: string
  /** Leading visual. Ignored when `selectable` — the card renders its own checkbox. */
  leading?: ReactNode
  /** Trailing content. Pass a function to react to the multiplier (e.g. scaled quantities). */
  trailing?: ReactNode | ((multiplier: number) => ReactNode)
  /** Tints the row with the brand colour — a focal product, a hero ingredient. */
  emphasis?: boolean
  /** Only meaningful when `selectable`. Defaults to true. */
  defaultSelected?: boolean
  /**
   * Stand-ins the user can swap this row for — a cheaper brand, another shade,
   * a different size. Adds a disclosure that replaces the row's label and
   * trailing content. The row keeps its own `id`; what changed is reported
   * through `selections` on the action context.
   */
  alternatives?: CollectionAlternative[]
}

export interface CollectionActionContext {
  selectedIds: string[]
  selectedCount: number
  multiplier: number
  /**
   * Item id → chosen alternative id, for every row that has been swapped.
   * Rows left on their original choice are absent.
   */
  selections: Record<string, string>
}

export interface CollectionAction {
  id: string
  label: string | ((ctx: CollectionActionContext) => string)
  variant?: 'default' | 'ghost'
  /** Disable while nothing is selected. Only meaningful when `selectable`. */
  disabledWhenEmpty?: boolean
  onClick?: (ctx: CollectionActionContext) => void
}

export interface CollectionMultiplier {
  /** Row label — "Servings", "Guests", "Sets", "Nights". */
  label: string
  min?: number
  max?: number
  defaultValue?: number
}

export interface CollectionCardProps extends Omit<MotionDivProps, 'children' | 'title'> {
  /** Overrides the DOM `title` attribute — the bundle's name. */
  title: string
  badges?: CollectionBadge[]
  /** Free-form copy under the title — narrative, rationale, description. */
  body?: ReactNode
  /** Any media treatment: a single image, a collage, a carousel, a colour strip. */
  hero?: ReactNode
  items: CollectionItem[]
  /** Turns rows into multi-select toggles and exposes selection to actions. */
  selectable?: boolean
  /** Adds a stepper that scales the bundle. */
  multiplier?: CollectionMultiplier
  actions?: CollectionAction[]
  onItemClick?: (item: CollectionItem) => void
  /**
   * Fires when a row is swapped for one of its `alternatives`, and again with
   * `null` when the row is put back to what it started as.
   */
  onAlternativeSelect?: (item: CollectionItem, alternative: CollectionAlternative | null) => void
  /** Copy for the swap disclosure. Override to localise or match brand voice. */
  swapLabels?: { open?: string; close?: string }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface CollectionCtx {
  selectable: boolean
  selectedState: Record<string, boolean>
  toggleItem: (id: string) => void
  multiplier: number
  setMultiplier: (n: number) => void
  onItemClick?: (item: CollectionItem) => void
  selections: Record<string, string>
  openSwap: Record<string, boolean>
  toggleSwap: (id: string) => void
  chooseAlternative: (item: CollectionItem, alternative: CollectionAlternative | null) => void
  swapLabels: { open: string; close: string }
}

const CollectionCtx = createContext<CollectionCtx | null>(null)

function useBundleCtx() {
  const ctx = useContext(CollectionCtx)
  if (!ctx) throw new Error('CollectionCard sub-components must be used inside <CollectionCard>')
  return ctx
}

// ── Motion ────────────────────────────────────────────────────────────────────

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const } },
}

const itemFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface HeroProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  children: ReactNode
}

function Hero({ children, className, ...props }: HeroProps) {
  return (
    <div className={cn('overflow-hidden', className)} {...props}>
      {children}
    </div>
  )
}

interface HeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'title'> {
  /** Overrides the DOM `title` attribute — the bundle's name. */
  title: string
  badges?: CollectionBadge[]
  body?: ReactNode
}

function Header({ title, badges, body, className, ...props }: HeaderProps) {
  return (
    <div className={cn('px-4 @md:px-5 pt-4 @md:pt-5 pb-3 @md:pb-4', className)} {...props}>
      {badges && badges.length > 0 && (
        <div className="flex items-center gap-2 @md:gap-3 mb-2 @md:mb-3 flex-wrap">
          {badges.map(badge => (
            <StatusBadge key={badge.label} label={badge.label} variant={badge.variant ?? 'default'} />
          ))}
        </div>
      )}
      <h3 className="font-heading text-base @md:text-lg font-semibold text-foreground leading-snug">{title}</h3>
      {body && <div className="mt-2 text-sm @md:text-base leading-relaxed">{body}</div>}
    </div>
  )
}

interface ItemListProps extends Omit<MotionUlProps, 'children'> {
  items: CollectionItem[]
}

/**
 * The swap toggle is a fixed column, not a button that grows the row. Every row
 * in a list where *anything* is swappable reserves it, so trailing content
 * (prices, quantities) lines up in one straight column down the card.
 *
 * Options inside a drawer do *not* reserve it: the row hides its own trailing
 * content while open, so there is nothing left up there to align to, and the
 * 44px would come straight out of the label's width.
 */
const SWAP_GUTTER = 'w-11'

/** Neutral overlay — reads the same over a plain row and a brand-tinted one. */
const OVERLAY_HOVER = 'hover:bg-foreground/[0.04] dark:hover:bg-foreground/[0.06]'

function ItemList({ items, className, ...props }: ItemListProps) {
  const {
    selectable,
    selectedState,
    toggleItem,
    multiplier,
    onItemClick,
    selections,
    openSwap,
    toggleSwap,
    chooseAlternative,
    swapLabels,
  } = useBundleCtx()
  const shouldReduce = useReducedMotion()

  // One swappable row makes the gutter a column, not a bump on a single row.
  const reserveGutter = items.some(item => (item.alternatives?.length ?? 0) > 0)

  return (
    <motion.ul
      role="list"
      variants={listStagger}
      initial="hidden"
      animate="show"
      className={cn('flex flex-col gap-1.5 @md:gap-2 list-none p-0 m-0', className)}
      {...props}
    >
      {items.map(item => {
        const isSelected = selectable ? (selectedState[item.id] ?? true) : true
        const tinted = selectable ? isSelected : item.emphasis
        const edge = tinted ? 'border-primary/20' : 'border-border'

        // A swapped row shows its stand-in's identity; the multiplier only
        // applies to the row's own trailing content, which the swap replaced.
        const chosen = item.alternatives?.find(alt => alt.id === selections[item.id])
        const label = chosen?.label ?? item.label
        const ownTrailing =
          typeof item.trailing === 'function' ? item.trailing(multiplier) : item.trailing
        const trailing = chosen ? chosen.trailing : ownTrailing

        const alternatives = item.alternatives ?? []
        const swappable = alternatives.length > 0
        const isSwapOpen = swappable && (openSwap[item.id] ?? false)

        // While the options are open the row states only the thing being
        // resolved, and the drawer states the answers. Otherwise the current
        // choice would print twice, one line above itself. Needs an eyebrow to
        // fall back on — without one the row would go blank.
        const asHeader = isSwapOpen && Boolean(item.eyebrow)

        return (
          <motion.li key={item.id} variants={shouldReduce ? itemFade : itemFadeUp}>
            {/* The border lives on the wrapper, never on the controls inside it —
                that is what keeps a row with a swap toggle reading as one object
                rather than two boxes shoved together. */}
            <motion.div
              whileTap={shouldReduce ? undefined : { scale: 0.985 }}
              transition={{ duration: 0.1 }}
              className={cn(
                'rounded-lg border overflow-hidden transition-colors duration-150',
                edge,
                tinted ? 'bg-primary/5' : 'bg-transparent',
                selectable && !isSelected && 'opacity-50'
              )}
            >
              {/* The swap toggle is a sibling of the row button, never a child of
                  it — a button inside a button collapses to one control. */}
              <div className="flex items-stretch">
                <Button
                  variant="ghost"
                  aria-pressed={selectable ? isSelected : undefined}
                  aria-label={[
                    item.eyebrow,
                    label,
                    item.note,
                    selectable ? (isSelected ? 'included' : 'excluded') : undefined,
                    !selectable && item.emphasis ? 'featured' : undefined,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                  onClick={() => {
                    if (selectable) toggleItem(item.id)
                    onItemClick?.(item)
                  }}
                  className={cn(
                    'flex-1 min-w-0 h-auto flex items-start gap-3 @md:gap-4 px-3 @md:px-4 py-2.5 @md:py-3 justify-start whitespace-normal',
                    // Rounding and the focus ring both belong to the wrapper's
                    // shape now; an outset ring would be clipped by it.
                    'rounded-none focus-visible:ring-inset',
                    OVERLAY_HOVER
                  )}
                >
                  {selectable ? <SelectionMark selected={isSelected} /> : item.leading}

                  <span className="flex-1 flex flex-col items-start gap-0.5 min-w-0 text-left">
                    {item.eyebrow && (
                      <span
                        className={cn(
                          'text-xs @md:text-sm font-medium uppercase tracking-wide leading-none transition-colors duration-150',
                          asHeader ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {item.eyebrow}
                      </span>
                    )}
                    {/* Folds away with the same curve the drawer opens on, so the
                        identity reads as moving into the list rather than blinking out. */}
                    <AnimatePresence initial={false}>
                      {!asHeader && (
                        <motion.span
                          key="identity"
                          initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={shouldReduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                          exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                          style={{ overflow: 'hidden' }}
                          className="block w-full"
                        >
                          <span
                            className={cn(
                              'block text-sm @md:text-base leading-snug transition-colors duration-150',
                              item.emphasis ? 'font-semibold' : 'font-medium',
                              selectable && !isSelected
                                ? 'text-muted-foreground line-through'
                                : 'text-foreground'
                            )}
                          >
                            {label}
                          </span>
                          {item.note && (
                            <span className="block text-xs @md:text-sm text-muted-foreground leading-snug mt-0.5">
                              {item.note}
                            </span>
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>

                  {trailing && (
                    <span
                      // Stays in the layout while hidden so the trailing column
                      // never shifts as rows open and close.
                      className={cn(
                        'shrink-0 self-center transition-opacity duration-150',
                        asHeader && 'opacity-0'
                      )}
                    >
                      {trailing}
                    </span>
                  )}
                </Button>

                {swappable ? (
                  <Button
                    variant="ghost"
                    onClick={() => toggleSwap(item.id)}
                    aria-expanded={isSwapOpen}
                    // `label`, not `item.label` — once swapped, the control has to
                    // name what the row shows now, not what it started as.
                    aria-label={`${isSwapOpen ? swapLabels.close : swapLabels.open}: ${label}`}
                    className={cn(
                      SWAP_GUTTER,
                      // Stretches to the row's height; `min-h-11` states the
                      // floor for a row short enough not to reach 44px on its own.
                      // No divider — the row is one object, and a rule here would
                      // draw a box around the icon that means nothing.
                      'shrink-0 h-auto min-h-11 px-0 rounded-none focus-visible:ring-inset',
                      OVERLAY_HOVER,
                      // Ghost's default expanded fill would box the icon in. The
                      // open drawer is the state; the icon only has to darken.
                      'aria-expanded:bg-transparent aria-expanded:text-foreground',
                      // A row sitting on a stand-in rather than its default is
                      // worth one quiet mark, not a badge.
                      chosen ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <ArrowLeftRight className="size-4 @md:size-5" />
                  </Button>
                ) : (
                  reserveGutter && <span aria-hidden className={cn(SWAP_GUTTER, 'shrink-0')} />
                )}
              </div>

              <AnimatePresence initial={false}>
                {isSwapOpen && (
                  <motion.div
                    key="swap-drawer"
                    initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={shouldReduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                    exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className={cn('flex flex-col gap-0.5 py-2 @md:py-2.5 border-t bg-muted/50', edge)}>
                      {/* The row's own identity leads the list — without it a swap
                          is a one-way door. */}
                      <SwapOption
                        active={!chosen}
                        label={item.label}
                        trailing={ownTrailing}
                        onClick={() => chooseAlternative(item, null)}
                      />
                      {alternatives.map(alt => (
                        <SwapOption
                          key={alt.id}
                          active={chosen?.id === alt.id}
                          label={alt.label}
                          trailing={alt.trailing}
                          onClick={() => chooseAlternative(item, alt)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

interface SwapOptionProps {
  active: boolean
  label: string
  trailing?: ReactNode
  onClick: () => void
}

/**
 * A child of the row it belongs to, and styled to say so: no border of its own,
 * recessed surface, muted until chosen. Its mark shares the parent's footprint
 * (`size-4 @md:size-5` + `gap-3 @md:gap-4`) so labels sit on the same left edge.
 */
function SwapOption({ active, label, trailing, onClick }: SwapOptionProps) {
  return (
    <Button
      variant="ghost"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'w-full h-auto min-h-11 flex items-center gap-3 @md:gap-4 justify-start whitespace-normal text-left',
        'px-3 @md:px-4 py-2.5 @md:py-3 rounded-none focus-visible:ring-inset',
        OVERLAY_HOVER
      )}
    >
      <ChoiceMark active={active} />
      <span
        className={cn(
          // A step down from the row's `text-sm @md:text-base`: an option is
          // subordinate to the line it answers, and the smaller size stops long
          // product names wrapping the panel into a wall of text.
          'flex-1 min-w-0 text-sm leading-snug',
          active ? 'text-foreground font-medium' : 'text-muted-foreground font-normal'
        )}
      >
        {label}
      </span>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </Button>
  )
}

function ChoiceMark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'size-4 @md:size-5 rounded-full shrink-0 border flex items-center justify-center',
        'transition-colors duration-150',
        active ? 'border-primary' : 'border-muted-foreground/30'
      )}
    >
      <span
        className={cn(
          'size-1.5 @md:size-2 rounded-full bg-primary transition-transform duration-150',
          active ? 'scale-100' : 'scale-0'
        )}
      />
    </span>
  )
}

function SelectionMark({ selected }: { selected: boolean }) {
  const shouldReduce = useReducedMotion()

  return (
    <span
      aria-hidden
      className={cn(
        'size-4 @md:size-5 rounded-full shrink-0 border-2 flex items-center justify-center mt-0.5',
        'transition-colors duration-150',
        selected
          ? 'bg-primary border-primary text-primary-foreground'
          : 'bg-transparent border-muted-foreground/30'
      )}
    >
      <AnimatePresence>
        {selected && (
          <motion.svg
            key="check"
            viewBox="0 0 10 8"
            fill="none"
            initial={shouldReduce ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
            className="size-2.5 @md:size-3"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </span>
  )
}

interface ActionsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  actions?: CollectionAction[]
  multiplier?: CollectionMultiplier
}

function Actions({ actions, multiplier, className, ...props }: ActionsProps) {
  const { selectedState, selectable, multiplier: value, setMultiplier, selections } = useBundleCtx()

  const selectedIds = selectable
    ? Object.entries(selectedState)
        .filter(([, on]) => on)
        .map(([id]) => id)
    : []
  const ctx: CollectionActionContext = {
    selectedIds,
    selectedCount: selectedIds.length,
    multiplier: value,
    selections,
  }

  return (
    <div className={cn('flex flex-col gap-3 @md:gap-4', className)} {...props}>
      {multiplier && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs @md:text-sm font-medium text-muted-foreground">{multiplier.label}</span>
          <QuantityStepper
            value={value}
            min={multiplier.min ?? 1}
            max={multiplier.max ?? 20}
            onChange={setMultiplier}
          />
        </div>
      )}

      {actions?.map(action => (
        <Button
          key={action.id}
          variant={action.variant ?? 'default'}
          className={cn('w-full h-12 @md:h-10 pointer-coarse:min-h-11', action.variant === 'ghost' && 'text-muted-foreground')}
          disabled={action.disabledWhenEmpty && selectable && ctx.selectedCount === 0}
          onClick={() => action.onClick?.(ctx)}
        >
          {typeof action.label === 'function' ? action.label(ctx) : action.label}
        </Button>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function CollectionCard({
  title,
  badges,
  body,
  hero,
  items,
  selectable = false,
  multiplier,
  actions,
  onItemClick,
  onAlternativeSelect,
  swapLabels,
  className,
  ...props
}: CollectionCardProps) {
  const shouldReduce = useReducedMotion()

  const [multiplierValue, setMultiplier] = useState(multiplier?.defaultValue ?? 1)
  const [selectedState, setSelectedState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map(item => [item.id, item.defaultSelected ?? true]))
  )
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [openSwap, setOpenSwap] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => setSelectedState(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSwap = (id: string) => setOpenSwap(prev => ({ ...prev, [id]: !prev[id] }))

  /** `null` puts the row back to its own identity — `selections` only ever
      records rows that deviate from it. */
  const chooseAlternative = (item: CollectionItem, alternative: CollectionAlternative | null) => {
    setSelections(prev => {
      if (alternative) return { ...prev, [item.id]: alternative.id }
      const next = { ...prev }
      delete next[item.id]
      return next
    })
    setOpenSwap(prev => ({ ...prev, [item.id]: false }))
    onAlternativeSelect?.(item, alternative)
  }

  return (
    <CollectionCtx.Provider
      value={{
        selectable,
        selectedState,
        toggleItem,
        multiplier: multiplierValue,
        setMultiplier,
        onItemClick,
        selections,
        openSwap,
        toggleSwap,
        chooseAlternative,
        swapLabels: { open: swapLabels?.open ?? 'Swap', close: swapLabels?.close ?? 'Close' },
      }}
    >
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        className={cn(
          'bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden',
          className
        )}
        {...props}
      >
        {hero && <CollectionCard.Hero>{hero}</CollectionCard.Hero>}
        <CollectionCard.Header title={title} badges={badges} body={body} />

        <div className="px-4 @md:px-5 py-3 border-t border-border">
          <CollectionCard.ItemList items={items} />
        </div>

        {(actions?.length || multiplier) && (
          <div className="px-4 @md:px-5 py-3 @md:py-4 border-t border-border">
            <CollectionCard.Actions actions={actions} multiplier={multiplier} />
          </div>
        )}
      </motion.div>
    </CollectionCtx.Provider>
  )
}

CollectionCard.Hero = Hero
CollectionCard.Header = Header
CollectionCard.ItemList = ItemList
CollectionCard.Actions = Actions
