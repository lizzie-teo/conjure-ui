'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps, MotionUlProps } from '../../../lib/prop-types'

// ── Types ──────────────────────────────────────────────────────────────────────

export type MakeupOccasion = 'day' | 'night'
export type MakeupUndertone = 'warm' | 'cool' | 'neutral' | 'olive-warm'
export type MakeupDepth = 'fair' | 'light' | 'medium' | 'deep'
export type MakeupProductType = 'eye' | 'lip' | 'cheek' | 'base' | 'palette'
export type MakeupRecipeFormat = 'individual' | 'palette'

export interface MakeupSwatch {
  /** Hex of the actual makeup shade — this is product colour data, not a design token */
  hex: string
  name: string
}

export interface MakeupProduct {
  id: string
  type: MakeupProductType
  label: string
  shade: string
  swatch: MakeupSwatch
  image?: string
  imageAlt?: string
  isFocalPoint?: boolean
  undertoneNote?: string
}

export interface MakeupRecipeStory {
  harmony: string
  skinTone: string
}

export interface MakeupRecipe {
  id: string
  occasion: MakeupOccasion
  format: MakeupRecipeFormat
  lookName: string
  story: MakeupRecipeStory
  products: MakeupProduct[]
  undertone: MakeupUndertone
  depth?: MakeupDepth
}

export type MakeupHeroVariant = 'collage' | 'carousel'

export interface MakeupRecipeCardProps extends Omit<MotionDivProps, 'children'> {
  recipe: MakeupRecipe
  hero?: MakeupHeroVariant
  onProductClick?: (product: MakeupProduct) => void
  onAddToCart?: (products: MakeupProduct[]) => void
  onSave?: (recipe: MakeupRecipe) => void
}

/** Hero, Story and Actions all render a plain `<div>` root. */
type SectionProps = Omit<ComponentPropsWithRef<'div'>, 'children'>

// ── Context ───────────────────────────────────────────────────────────────────

interface MakeupCtx {
  recipe: MakeupRecipe
  hero: MakeupHeroVariant
  onProductClick?: (product: MakeupProduct) => void
  onAddToCart?: (products: MakeupProduct[]) => void
  onSave?: (recipe: MakeupRecipe) => void
}

const MakeupCtx = createContext<MakeupCtx | null>(null)

function useMakeupCtx() {
  const ctx = useContext(MakeupCtx)
  if (!ctx) throw new Error('MakeupRecipeCard sub-components must be used inside <MakeupRecipeCard>')
  return ctx
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const OCCASION_VARIANT: Record<MakeupOccasion, 'info' | 'warning'> = {
  day: 'info',
  night: 'warning',
}

const OCCASION_LABEL: Record<MakeupOccasion, string> = {
  day: 'Day',
  night: 'Night out',
}

const TYPE_LABEL: Record<MakeupProductType, string> = {
  eye: 'Eye',
  lip: 'Lip',
  cheek: 'Cheek',
  base: 'Base',
  palette: 'Palette',
}

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const } },
}

const itemFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

// ── Sub-components ─────────────────────────────────────────────────────────────

// Shared swatch strip — thin colour accent used as fallback when no images are present
function SwatchStrip({ className, ...props }: SectionProps) {
  const { recipe } = useMakeupCtx()
  return (
    <div className={cn('flex h-2 overflow-hidden', className)} {...props}>
      {recipe.products.map(p => (
        <div key={p.id} className="flex-1" style={{ backgroundColor: p.swatch.hex }} />
      ))}
    </div>
  )
}

function CollageHero({ className, ...props }: SectionProps) {
  const { recipe } = useMakeupCtx()

  const withImages = [
    ...recipe.products.filter(p => p.isFocalPoint && p.image),
    ...recipe.products.filter(p => !p.isFocalPoint && p.image),
  ]

  if (withImages.length === 0) return <SwatchStrip className={className} {...props} />

  const [focal, ...rest] = withImages

  if (withImages.length === 1) {
    return (
      <div className={cn('h-40 md:h-44 overflow-hidden', className)} {...props}>
        <img src={focal.image} alt={focal.imageAlt ?? focal.shade} className="w-full h-full object-cover" />
      </div>
    )
  }

  if (withImages.length === 2) {
    return (
      <div className={cn('flex h-40 md:h-44 overflow-hidden gap-px bg-border', className)} {...props}>
        <img src={focal.image} alt={focal.imageAlt ?? focal.shade} className="flex-1 h-full object-cover min-w-0" />
        <img src={rest[0].image} alt={rest[0].imageAlt ?? rest[0].shade} className="flex-1 h-full object-cover min-w-0" />
      </div>
    )
  }

  // Three+ — focal 2/3, supporting stacked 1/3
  return (
    <div className={cn('flex h-40 md:h-44 overflow-hidden gap-px bg-border', className)} {...props}>
      <img src={focal.image} alt={focal.imageAlt ?? focal.shade} className="w-2/3 h-full object-cover shrink-0" />
      <div className="flex flex-col flex-1 gap-px min-w-0">
        {rest.slice(0, 2).map(p => (
          <img key={p.id} src={p.image} alt={p.imageAlt ?? p.shade} className="flex-1 w-full object-cover" />
        ))}
      </div>
    </div>
  )
}

function CarouselHero({ className, ...props }: SectionProps) {
  const { recipe } = useMakeupCtx()
  const shouldReduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)

  const slides = [
    ...recipe.products.filter(p => p.isFocalPoint && p.image),
    ...recipe.products.filter(p => !p.isFocalPoint && p.image),
  ]

  if (slides.length === 0) return <SwatchStrip className={className} {...props} />
  if (slides.length === 1) {
    return (
      <div className={cn('h-40 md:h-44 overflow-hidden', className)} {...props}>
        <img src={slides[0].image} alt={slides[0].imageAlt ?? slides[0].shade} className="w-full h-full object-cover" />
      </div>
    )
  }

  const navigate = (newDir: number) => {
    setDir(newDir)
    setIndex(i => (i + newDir + slides.length) % slides.length)
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
  }

  return (
    <div className={cn('relative h-40 md:h-44 overflow-hidden bg-muted', className)} {...props}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: shouldReduce ? 0.01 : 0.3, ease: [0, 0, 0.2, 1] }}
          src={slides[index].image}
          alt={slides[index].imageAlt ?? slides[index].shade}
          className="absolute inset-0 w-full h-full object-cover"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40) navigate(1)
            else if (info.offset.x > 40) navigate(-1)
          }}
        />
      </AnimatePresence>

      {/* Gradient scrim behind dots */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Pagination dots */}
      <div className="absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <Button
            key={i}
            variant="ghost"
            aria-label={`View ${slides[i].label}`}
            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
            className={cn(
              'p-0 min-w-0 h-auto rounded-full transition-all duration-200 hover:bg-transparent',
              i === index ? 'size-2 bg-white' : 'size-1.5 bg-white/50 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  )
}

function Hero({ className, ...props }: SectionProps) {
  const { hero } = useMakeupCtx()
  return hero === 'carousel'
    ? <CarouselHero className={className} {...props} />
    : <CollageHero className={className} {...props} />
}

function Story({ className, ...props }: SectionProps) {
  const { recipe } = useMakeupCtx()

  return (
    <div className={cn('px-4 md:px-5 pt-4 md:pt-5 pb-3 md:pb-4', className)} {...props}>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <StatusBadge label={OCCASION_LABEL[recipe.occasion]} variant={OCCASION_VARIANT[recipe.occasion]} />
        {recipe.format === 'palette' && <StatusBadge label="Palette" variant="default" />}
      </div>
      <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug mb-2">
        {recipe.lookName}
      </h3>
      <p className="text-sm md:text-base text-foreground leading-relaxed">
        {recipe.story.harmony}
      </p>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-1">
        {recipe.story.skinTone}
      </p>
    </div>
  )
}

function ProductList({ className, ...props }: Omit<MotionUlProps, 'children'>) {
  const { recipe, onProductClick } = useMakeupCtx()
  const shouldReduce = useReducedMotion()

  return (
    <motion.ul
      role="list"
      variants={listStagger}
      initial="hidden"
      animate="show"
      className={cn('flex flex-col gap-2 md:gap-2.5 list-none p-0 m-0', className)}
      {...props}
    >
      {recipe.products.map(product => (
        <motion.li key={product.id} variants={shouldReduce ? itemFade : itemFadeUp}>
          <Button
            variant="ghost"
            aria-label={`${product.label}, ${product.shade}${product.isFocalPoint ? ', featured colour' : ''}`}
            onClick={() => onProductClick?.(product)}
            className={cn(
              'w-full h-auto flex items-start gap-3 px-3 py-2.5 md:py-3 rounded-xl border justify-start whitespace-normal',
              'transition-all duration-150',
              product.isFocalPoint
                ? 'bg-primary/5 border-primary/20 hover:bg-primary/[0.08]'
                : 'bg-transparent border-border hover:bg-muted/60'
            )}
          >
            {/* Product image when available, swatch colour circle as fallback */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.imageAlt ?? product.shade}
                className="size-11 md:size-12 rounded-lg shrink-0 object-cover border border-border/40 mt-0.5"
              />
            ) : (
              <span
                className="size-11 md:size-12 rounded-full shrink-0 border border-black/10 shadow-sm mt-0.5"
                style={{ backgroundColor: product.swatch.hex }}
                aria-hidden
              />
            )}

            <span className="flex-1 flex flex-col items-start gap-0.5 min-w-0 pt-0.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground leading-none">
                {TYPE_LABEL[product.type]}
              </span>
              <span className={cn(
                'text-sm md:text-base text-left leading-snug',
                product.isFocalPoint ? 'font-semibold text-foreground' : 'font-medium text-foreground'
              )}>
                {product.shade}
              </span>
              {product.undertoneNote && (
                <span className="text-xs text-left text-muted-foreground leading-snug mt-0.5">
                  {product.undertoneNote}
                </span>
              )}
            </span>

            {product.isFocalPoint && (
              <div className="shrink-0 mt-0.5">
                <StatusBadge label="Focus" variant="info" />
              </div>
            )}
          </Button>
        </motion.li>
      ))}
    </motion.ul>
  )
}

function Actions({ className, ...props }: SectionProps) {
  const { recipe, onAddToCart, onSave } = useMakeupCtx()
  const count = recipe.products.length

  return (
    <div className={cn('flex flex-col gap-2 md:gap-3', className)} {...props}>
      {onAddToCart && (
        <Button
          variant="default"
          className="w-full h-12 md:h-10"
          onClick={() => onAddToCart(recipe.products)}
        >
          Add {count} product{count !== 1 ? 's' : ''} to cart
        </Button>
      )}
      {onSave && (
        <Button
          variant="ghost"
          className="w-full h-12 md:h-10 text-muted-foreground"
          onClick={() => onSave(recipe)}
        >
          Save this look
        </Button>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function MakeupRecipeCard({
  recipe,
  hero = 'collage',
  onProductClick,
  onAddToCart,
  onSave,
  className,
  ...props
}: MakeupRecipeCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <MakeupCtx.Provider value={{ recipe, hero, onProductClick, onAddToCart, onSave }}>
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
        <MakeupRecipeCard.Hero />
        <MakeupRecipeCard.Story />
        <div className="px-4 md:px-5 py-3 border-t border-border">
          <MakeupRecipeCard.ProductList />
        </div>
        <div className="px-4 md:px-5 py-3 md:py-4 border-t border-border">
          <MakeupRecipeCard.Actions />
        </div>
      </motion.div>
    </MakeupCtx.Provider>
  )
}

MakeupRecipeCard.Hero = Hero
MakeupRecipeCard.Story = Story
MakeupRecipeCard.ProductList = ProductList
MakeupRecipeCard.Actions = Actions
