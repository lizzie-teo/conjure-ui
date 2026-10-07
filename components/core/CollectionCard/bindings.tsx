'use client'

import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { CollectionCard } from './CollectionCard'
import { MediaCarousel, MediaCollage, MediaSingle, MediaSwatchStrip } from './media'
import type { MediaFrame } from './media'
import type { CollectionCardProps, CollectionItem } from './CollectionCard'

/**
 * ENTITY + BINDING layer.
 *
 * Entities are domain nouns with no React in them. Bindings map an entity onto
 * `CollectionCard`'s structural props. Vocabulary, formatting rules and
 * industry conventions live *here* — never inside the structural component.
 *
 * In the real migration these would split into:
 *   lib/entities/{recipe,look}.ts        ← types only
 *   verticals/grocery/RecipeCard.tsx     ← binding + wrapper
 *   verticals/beauty/LookCard.tsx        ← binding + wrapper
 *
 * They are colocated here so the spike touches nothing outside this folder.
 */

// ══ GROCERY ═══════════════════════════════════════════════════════════════════

export type RecipeDifficulty = 'easy' | 'medium' | 'hard'

export interface RecipeIngredient {
  id: string
  name: string
  quantity: number
  unit: string
  selected?: boolean
}

export interface ScaledRecipeIngredient extends RecipeIngredient {
  scaledQuantity: number
}

export interface Recipe {
  id: string
  name: string
  prepTime: string
  difficulty: RecipeDifficulty
  defaultServings?: number
  ingredients: RecipeIngredient[]
  image?: string
  imageAlt?: string
}

const DIFFICULTY_VARIANT = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
} as const

/** Unit formatting is domain knowledge — it belongs in the binding, not the card. */
function formatQuantity(quantity: number, unit: string): string {
  const num = Number.isInteger(quantity) ? quantity : parseFloat(quantity.toFixed(1))
  const unitTrim = unit.trim()
  const unitLower = unitTrim.toLowerCase()
  if (!unitLower || unitLower === 'whole') return String(num)
  return ['g', 'ml', 'kg', 'l'].includes(unitLower) ? `${num}${unitTrim}` : `${num} ${unitTrim}`
}

export interface RecipeCardHandlers {
  onIngredientClick?: (ingredient: RecipeIngredient) => void
  onAddToCart?: (ingredients: ScaledRecipeIngredient[], servings: number) => void
}

export function bindRecipe(recipe: Recipe, handlers: RecipeCardHandlers = {}): CollectionCardProps {
  const byId = new Map(recipe.ingredients.map(i => [i.id, i]))

  return {
    title: recipe.name,
    badges: [
      { label: recipe.prepTime, variant: 'info' },
      {
        label: recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1),
        variant: DIFFICULTY_VARIANT[recipe.difficulty],
      },
    ],
    hero: recipe.image ? <MediaSingle src={recipe.image} alt={recipe.imageAlt} /> : undefined,
    selectable: true,
    multiplier: { label: 'Servings', min: 1, max: 20, defaultValue: recipe.defaultServings ?? 2 },
    items: recipe.ingredients.map<CollectionItem>(ingredient => ({
      id: ingredient.id,
      label: ingredient.name,
      defaultSelected: ingredient.selected ?? true,
      trailing: (servings: number) => (
        <span className="text-xs @md:text-sm text-muted-foreground font-medium tabular-nums">
          {formatQuantity(ingredient.quantity * servings, ingredient.unit)}
        </span>
      ),
    })),
    onItemClick: item => {
      const ingredient = byId.get(item.id)
      if (ingredient) handlers.onIngredientClick?.({ ...ingredient })
    },
    actions: [
      {
        id: 'add-to-cart',
        disabledWhenEmpty: true,
        label: ({ selectedCount }) =>
          selectedCount === 0
            ? 'No ingredients selected'
            : `Add ${selectedCount} ingredient${selectedCount === 1 ? '' : 's'} to cart`,
        onClick: ({ selectedIds, multiplier }) =>
          handlers.onAddToCart?.(
            selectedIds
              .map(id => byId.get(id))
              .filter((i): i is RecipeIngredient => Boolean(i))
              .map(i => ({ ...i, scaledQuantity: i.quantity * multiplier })),
            multiplier
          ),
      },
    ],
  }
}

export interface RecipeCardProps extends RecipeCardHandlers {
  recipe: Recipe
  className?: string
}

/** Semantic wrapper — this is what a grocery journey actually calls. */
export function RecipeCard({ recipe, className, ...handlers }: RecipeCardProps) {
  return <CollectionCard {...bindRecipe(recipe, handlers)} className={className} />
}

// ══ BEAUTY ════════════════════════════════════════════════════════════════════

export type LookOccasion = 'day' | 'night'
export type LookFormat = 'individual' | 'palette'
export type LookProductType = 'eye' | 'lip' | 'cheek' | 'base' | 'palette'

export interface LookProduct {
  id: string
  type: LookProductType
  label: string
  shade: string
  /** Hex of the actual makeup shade — product colour data, not a design token. */
  swatch: { hex: string; name: string }
  image?: string
  imageAlt?: string
  isFocalPoint?: boolean
  undertoneNote?: string
}

export interface Look {
  id: string
  name: string
  occasion: LookOccasion
  format: LookFormat
  story: { harmony: string; skinTone: string }
  products: LookProduct[]
}

const OCCASION_VARIANT = { day: 'info', night: 'warning' } as const
const OCCASION_LABEL = { day: 'Day', night: 'Night out' } as const
const TYPE_LABEL: Record<LookProductType, string> = {
  eye: 'Eye',
  lip: 'Lip',
  cheek: 'Cheek',
  base: 'Base',
  palette: 'Palette',
}

export interface LookCardHandlers {
  onProductClick?: (product: LookProduct) => void
  onAddToCart?: (products: LookProduct[]) => void
  onSave?: (look: Look) => void
}

export function bindLook(
  look: Look,
  handlers: LookCardHandlers = {},
  hero: 'collage' | 'carousel' = 'collage'
): CollectionCardProps {
  const byId = new Map(look.products.map(p => [p.id, p]))

  // Focal product leads the hero, then the rest in order.
  const frames: MediaFrame[] = [
    ...look.products.filter(p => p.isFocalPoint && p.image),
    ...look.products.filter(p => !p.isFocalPoint && p.image),
  ].map(p => ({ id: p.id, src: p.image as string, alt: p.imageAlt ?? p.shade }))

  const fallback = <MediaSwatchStrip colors={look.products.map(p => p.swatch.hex)} />
  const HeroMedia = hero === 'carousel' ? MediaCarousel : MediaCollage

  return {
    title: look.name,
    badges: [
      { label: OCCASION_LABEL[look.occasion], variant: OCCASION_VARIANT[look.occasion] },
      ...(look.format === 'palette' ? ([{ label: 'Palette', variant: 'default' }] as const) : []),
    ],
    body: (
      <>
        <p className="text-foreground leading-relaxed">{look.story.harmony}</p>
        <p className="text-muted-foreground leading-relaxed mt-1">{look.story.skinTone}</p>
      </>
    ),
    hero: <HeroMedia frames={frames} fallback={fallback} />,
    selectable: false,
    items: look.products.map<CollectionItem>(product => ({
      id: product.id,
      eyebrow: TYPE_LABEL[product.type],
      label: product.shade,
      note: product.undertoneNote,
      emphasis: product.isFocalPoint,
      leading: product.image ? (
        <img
          src={product.image}
          alt={product.imageAlt ?? product.shade}
          className="size-11 @md:size-12 rounded-lg shrink-0 object-cover border border-border/40 mt-0.5"
        />
      ) : (
        <span
          aria-hidden
          className="size-11 @md:size-12 rounded-full shrink-0 border border-border shadow-[var(--shadow-sm)] mt-0.5"
          style={{ backgroundColor: product.swatch.hex }}
        />
      ),
      trailing: product.isFocalPoint ? <StatusBadge label="Focus" variant="info" /> : undefined,
    })),
    onItemClick: item => {
      const product = byId.get(item.id)
      if (product) handlers.onProductClick?.(product)
    },
    actions: [
      ...(handlers.onAddToCart
        ? [
            {
              id: 'add-to-cart',
              label: `Add ${look.products.length} product${look.products.length === 1 ? '' : 's'} to cart`,
              onClick: () => handlers.onAddToCart?.(look.products),
            },
          ]
        : []),
      ...(handlers.onSave
        ? [
            {
              id: 'save',
              label: 'Save this look',
              variant: 'ghost' as const,
              onClick: () => handlers.onSave?.(look),
            },
          ]
        : []),
    ],
  }
}

export interface LookCardProps extends LookCardHandlers {
  look: Look
  hero?: 'collage' | 'carousel'
  className?: string
}

/** Semantic wrapper — this is what a beauty journey actually calls. */
export function LookCard({ look, hero = 'collage', className, ...handlers }: LookCardProps) {
  return <CollectionCard {...bindLook(look, handlers, hero)} className={className} />
}

// ══ SHOPPING LIST ═════════════════════════════════════════════════════════════
// Turning an abstract list (ingredients, a packing list, a parts list) into
// real purchasable products, each swappable for a stocked alternative.

export interface ShopProduct {
  id: string
  name: string
  brand?: string
  imageUrl?: string
  price: number
  originalPrice?: number
  currency: string
  onSale?: boolean
}

export interface ShopLine {
  /** The abstract thing being resolved — "plain flour", "USB-C cable". */
  id: string
  label: string
  recommended: ShopProduct
  alternatives?: ShopProduct[]
}

export interface ResolvedShopLine extends ShopLine {
  chosen: ShopProduct
}

function productPrice(product: ShopProduct) {
  return (
    <PriceDisplay
      amount={product.price}
      currency={product.currency}
      strikethrough={product.onSale ? product.originalPrice : undefined}
    />
  )
}

export interface ShopListHandlers {
  onLineClick?: (line: ShopLine) => void
  onProductSwap?: (line: ShopLine, product: ShopProduct) => void
  onAddToCart?: (resolved: ResolvedShopLine[]) => void
}

export function bindShopList(
  title: string,
  lines: ShopLine[],
  handlers: ShopListHandlers = {}
): CollectionCardProps {
  const byId = new Map(lines.map(line => [line.id, line]))

  /** `selections` only records swapped rows — everything else keeps its recommendation. */
  const resolve = (selections: Record<string, string>): ResolvedShopLine[] =>
    lines.map(line => {
      const swapped = line.alternatives?.find(alt => alt.id === selections[line.id])
      return { ...line, chosen: swapped ?? line.recommended }
    })

  return {
    title,
    selectable: true,
    items: lines.map<CollectionItem>(line => ({
      id: line.id,
      eyebrow: line.label,
      label: line.recommended.name,
      // No `note` for the brand: a swap replaces the row's label and trailing
      // content but cannot reach the note, so it would sit there naming the
      // product the user just swapped away from.
      leading: line.recommended.imageUrl ? (
        <img
          src={line.recommended.imageUrl}
          alt={line.recommended.name}
          className="size-11 @md:size-12 rounded-lg shrink-0 object-cover border border-border/40 mt-0.5"
        />
      ) : undefined,
      trailing: productPrice(line.recommended),
      alternatives: line.alternatives?.map(alt => ({
        id: alt.id,
        label: alt.name,
        trailing: productPrice(alt),
      })),
    })),
    onItemClick: item => {
      const line = byId.get(item.id)
      if (line) handlers.onLineClick?.(line)
    },
    onAlternativeSelect: (item, alternative) => {
      const line = byId.get(item.id)
      if (!line) return
      // `null` means the row went back to what it started as — for a shop line
      // that is the recommendation, which is still a swap worth reporting.
      const product = alternative
        ? line.alternatives?.find(alt => alt.id === alternative.id)
        : line.recommended
      if (product) handlers.onProductSwap?.(line, product)
    },
    actions: [
      {
        id: 'add-to-cart',
        disabledWhenEmpty: true,
        label: ({ selectedCount }) =>
          selectedCount === 0
            ? 'No items selected'
            : `Add ${selectedCount} item${selectedCount === 1 ? '' : 's'} to cart`,
        onClick: ({ selectedIds, selections }) => {
          const included = new Set(selectedIds)
          handlers.onAddToCart?.(resolve(selections).filter(line => included.has(line.id)))
        },
      },
    ],
  }
}

export interface ShopListProps extends ShopListHandlers {
  title: string
  lines: ShopLine[]
  className?: string
}

/** Semantic wrapper — the "resolve a list into products" step of a shopping journey. */
export function ShopList({ title, lines, className, ...handlers }: ShopListProps) {
  return <CollectionCard {...bindShopList(title, lines, handlers)} className={className} />
}
