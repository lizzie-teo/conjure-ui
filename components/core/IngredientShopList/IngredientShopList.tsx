'use client'

import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProductOption {
  id: string
  name: string
  brand: string
  imageUrl?: string
  price: number
  originalPrice?: number
  currency: string
  onSale?: boolean
}

export interface IngredientProduct {
  ingredientId: string
  ingredientName: string
  recommendedProduct: ProductOption
  alternatives?: ProductOption[]
}

export interface ResolvedItem extends IngredientProduct {
  selectedProduct: ProductOption
}

export interface IngredientShopListProps extends Omit<MotionDivProps, 'children'> {
  items: IngredientProduct[]
  onAddToCart?: (resolved: ResolvedItem[]) => void
}

// ── Context ───────────────────────────────────────────────────────────────────

interface ShopListCtx {
  selections: Record<string, ProductOption>
  openSwap: Record<string, boolean>
  selectProduct: (ingredientId: string, product: ProductOption) => void
  toggleSwap: (ingredientId: string) => void
}

const ShopListCtx = createContext<ShopListCtx | null>(null)

function useShopListCtx() {
  const ctx = useContext(ShopListCtx)
  if (!ctx) throw new Error('IngredientShopList sub-components must be used inside <IngredientShopList>')
  return ctx
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
}

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

const rowFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const } },
}

const rowFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface RowProps extends Omit<MotionDivProps, 'children'> {
  item: IngredientProduct
  isLast?: boolean
}

function Row({ item, isLast, className, ...props }: RowProps) {
  const { selections, openSwap, selectProduct, toggleSwap } = useShopListCtx()
  const shouldReduce = useReducedMotion()

  const selected = selections[item.ingredientId] ?? item.recommendedProduct
  const isSwapOpen = openSwap[item.ingredientId] ?? false
  const hasAlternatives = (item.alternatives?.length ?? 0) > 0

  return (
    <motion.div
      variants={shouldReduce ? rowFade : rowFadeUp}
      className={cn(
        'px-4 md:px-5 py-3 md:py-4',
        !isLast && 'border-b border-border',
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3 md:gap-3.5">
        {selected.imageUrl && (
          <div className="shrink-0 size-12 md:size-14 rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={selected.imageUrl}
              alt={selected.name}
              className="size-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {selected.onSale && (
            <div className="mb-1">
              <StatusBadge label="On sale" variant="success" />
            </div>
          )}

          <p className="text-xs md:text-sm text-muted-foreground mb-0.5">{item.ingredientName}</p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground leading-snug truncate">
                {selected.name}
              </p>
              <div className="mt-0.5">
                <PriceDisplay
                  amount={selected.price}
                  currency={selected.currency}
                  strikethrough={selected.onSale && selected.originalPrice !== undefined ? selected.originalPrice : undefined}
                />
              </div>
            </div>

            {hasAlternatives && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSwap(item.ingredientId)}
                className="shrink-0 h-8 md:h-7 gap-1 text-muted-foreground"
                aria-expanded={isSwapOpen}
                aria-label={`${isSwapOpen ? 'Close options' : 'Swap product'} for ${item.ingredientName}`}
              >
                {isSwapOpen ? 'Close' : 'Swap'}
                {isSwapOpen
                  ? <ChevronUp className="size-3.5" />
                  : <ChevronDown className="size-3.5" />
                }
              </Button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSwapOpen && item.alternatives && (
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="flex flex-col gap-1.5 mt-2.5">
              {item.alternatives.map(alt => {
                const isActive = selected.id === alt.id
                return (
                  <Button
                    key={alt.id}
                    variant="outline"
                    onClick={() => selectProduct(item.ingredientId, alt)}
                    className={cn(
                      'w-full h-auto py-2 md:py-1.5 px-3 flex items-center justify-between gap-2 active:scale-[0.97]',
                      isActive && 'bg-primary/5 border-primary/20'
                    )}
                  >
                    <span className="flex items-center gap-1.5 text-sm font-medium text-left min-w-0">
                      {isActive && <Check className="size-3.5 text-primary shrink-0" />}
                      <span className="truncate">{alt.name}</span>
                    </span>
                    <span className="text-sm shrink-0 tabular-nums flex items-baseline gap-1.5">
                      {alt.onSale && alt.originalPrice !== undefined && (
                        <span className="line-through text-xs text-muted-foreground">
                          {formatCurrency(alt.originalPrice, alt.currency)}
                        </span>
                      )}
                      <span className="font-semibold">{formatCurrency(alt.price, alt.currency)}</span>
                    </span>
                  </Button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface ActionsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  items: IngredientProduct[]
  onAddToCart?: () => void
}

function Actions({ items, onAddToCart, className, ...props }: ActionsProps) {
  const { selections } = useShopListCtx()
  const currency = items[0]?.recommendedProduct.currency ?? 'USD'
  const total = Object.values(selections).reduce((sum, p) => sum + p.price, 0)

  return (
    <div className={cn('px-4 md:px-5 py-3 md:py-4 border-t border-border', className)} {...props}>
      <Button
        variant="default"
        className="w-full h-12 md:h-10"
        onClick={onAddToCart}
      >
        {`Add all to cart — ${formatCurrency(total, currency)}`}
      </Button>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function IngredientShopList({
  items,
  onAddToCart,
  className,
  ...props
}: IngredientShopListProps) {
  const shouldReduce = useReducedMotion()

  const [selections, setSelections] = useState<Record<string, ProductOption>>(
    () => Object.fromEntries(items.map(i => [i.ingredientId, i.recommendedProduct]))
  )
  const [openSwap, setOpenSwap] = useState<Record<string, boolean>>({})

  const selectProduct = (ingredientId: string, product: ProductOption) => {
    setSelections(prev => ({ ...prev, [ingredientId]: product }))
    setOpenSwap(prev => ({ ...prev, [ingredientId]: false }))
  }

  const toggleSwap = (ingredientId: string) =>
    setOpenSwap(prev => ({ ...prev, [ingredientId]: !prev[ingredientId] }))

  const handleAddToCart = () => {
    const resolved: ResolvedItem[] = items.map(i => ({
      ...i,
      selectedProduct: selections[i.ingredientId] ?? i.recommendedProduct,
    }))
    onAddToCart?.(resolved)
  }

  return (
    <ShopListCtx.Provider value={{ selections, openSwap, selectProduct, toggleSwap }}>
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
        <motion.div variants={listStagger} initial="hidden" animate="show">
          {items.map((item, idx) => (
            <IngredientShopList.Row
              key={item.ingredientId}
              item={item}
              isLast={idx === items.length - 1}
            />
          ))}
        </motion.div>

        <IngredientShopList.Actions items={items} onAddToCart={handleAddToCart} />
      </motion.div>
    </ShopListCtx.Provider>
  )
}

IngredientShopList.Row = Row
IngredientShopList.Actions = Actions
