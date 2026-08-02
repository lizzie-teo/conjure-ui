'use client'

import { createContext, useContext, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { QuantityStepper } from '../../primitives/QuantityStepper/QuantityStepper'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'medium' | 'hard'

export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: string
  selected?: boolean
}

export interface ScaledIngredient extends Ingredient {
  scaledQuantity: number
}

export interface RecipeCardProps {
  title: string
  prepTime: string
  difficulty: Difficulty
  defaultServings?: number
  ingredients: Ingredient[]
  image?: string
  imageAlt?: string
  onIngredientClick?: (ingredient: Ingredient) => void
  onAddToCart?: (ingredients: ScaledIngredient[], servings: number) => void
  className?: string
}

// ── Context ───────────────────────────────────────────────────────────────────

interface RecipeCtx {
  servings: number
  setServings: (n: number) => void
  ingredientState: Record<string, boolean>
  toggleIngredient: (id: string) => void
  onIngredientClick?: (ingredient: Ingredient) => void
}

const RecipeCtx = createContext<RecipeCtx | null>(null)

function useRecipeCtx() {
  const ctx = useContext(RecipeCtx)
  if (!ctx) throw new Error('RecipeCard sub-components must be used inside <RecipeCard>')
  return ctx
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const DIFFICULTY_VARIANT: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
}

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

const chipFadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const } },
}

const chipFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

function formatQuantity(quantity: number, unit: string): string {
  const num = Number.isInteger(quantity) ? quantity : parseFloat(quantity.toFixed(1))
  const unitTrim = unit.trim()
  const unitLower = unitTrim.toLowerCase()
  if (!unitLower || unitLower === 'whole') return String(num)
  return ['g', 'ml', 'kg', 'l'].includes(unitLower)
    ? `${num}${unitTrim}`
    : `${num} ${unitTrim}`
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface ImageProps {
  src: string
  alt?: string
  className?: string
}

function Image({ src, alt = '', className }: ImageProps) {
  return (
    <div className={cn('overflow-hidden rounded-t-xl', className)}>
      <img src={src} alt={alt} className="w-full h-40 md:h-48 object-cover" />
    </div>
  )
}

interface HeaderProps {
  title: string
  prepTime: string
  difficulty: Difficulty
  className?: string
}

function Header({ title, prepTime, difficulty, className }: HeaderProps) {
  return (
    <div className={cn('px-4 md:px-5 pt-4 md:pt-5 pb-3', className)}>
      <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug">{title}</h3>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <StatusBadge label={prepTime} variant="info" />
        <StatusBadge
          label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          variant={DIFFICULTY_VARIANT[difficulty]}
        />
      </div>
    </div>
  )
}

interface IngredientListProps {
  ingredients: Ingredient[]
  className?: string
}

function IngredientList({ ingredients, className }: IngredientListProps) {
  const { servings, ingredientState, toggleIngredient, onIngredientClick } = useRecipeCtx()
  const shouldReduce = useReducedMotion()

  return (
    <motion.ul
      role="list"
      variants={listStagger}
      initial="hidden"
      animate="show"
      className={cn('flex flex-col gap-1.5 md:gap-2 list-none p-0 m-0', className)}
    >
      {ingredients.map(ingredient => {
        const isSelected = ingredientState[ingredient.id] ?? true
        const displayQty = formatQuantity(ingredient.quantity * servings, ingredient.unit)

        return (
          <motion.li key={ingredient.id} variants={shouldReduce ? chipFade : chipFadeUp}>
            <Button
              variant="ghost"
              aria-pressed={isSelected}
              aria-label={`${ingredient.name}, ${displayQty}, ${isSelected ? 'included' : 'excluded'}`}
              onClick={() => {
                toggleIngredient(ingredient.id)
                onIngredientClick?.({ ...ingredient })
              }}
              className={cn(
                'w-full h-auto flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-lg border justify-start',
                'transition-all duration-150 active:scale-[0.97]',
                isSelected
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-transparent border-border opacity-50'
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'size-4 md:size-5 rounded-full shrink-0 border-2 flex items-center justify-center transition-colors duration-150',
                  isSelected ? 'bg-primary border-primary' : 'bg-transparent border-muted-foreground/30'
                )}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.svg
                      key="check"
                      viewBox="0 0 10 8"
                      fill="none"
                      initial={shouldReduce ? false : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
                      className="size-2.5 md:size-3"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </span>
              <span
                className={cn(
                  'flex-1 text-sm md:text-base font-medium text-left transition-all duration-150',
                  isSelected ? 'text-foreground' : 'text-muted-foreground line-through'
                )}
              >
                {ingredient.name}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground font-medium shrink-0 tabular-nums">
                {displayQty}
              </span>
            </Button>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

interface ActionsProps {
  selectedCount: number
  onAddToCart?: () => void
  className?: string
}

function Actions({ selectedCount, onAddToCart, className }: ActionsProps) {
  const { servings, setServings } = useRecipeCtx()

  return (
    <div className={cn('flex flex-col gap-3 md:gap-4', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs md:text-sm font-medium text-muted-foreground">Servings</span>
        <QuantityStepper value={servings} min={1} max={20} onChange={setServings} />
      </div>
      <Button
        variant="default"
        className="w-full h-12 md:h-10"
        disabled={selectedCount === 0}
        onClick={onAddToCart}
      >
        {selectedCount === 0
          ? 'No ingredients selected'
          : `Add ${selectedCount} ingredient${selectedCount === 1 ? '' : 's'} to cart`}
      </Button>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function RecipeCard({
  title,
  prepTime,
  difficulty,
  defaultServings = 2,
  ingredients,
  image,
  imageAlt,
  onIngredientClick,
  onAddToCart,
  className,
}: RecipeCardProps) {
  const shouldReduce = useReducedMotion()

  const [servings, setServings] = useState(defaultServings)
  const [ingredientState, setIngredientState] = useState<Record<string, boolean>>(
    () => Object.fromEntries(ingredients.map(i => [i.id, i.selected ?? true]))
  )

  const toggleIngredient = (id: string) =>
    setIngredientState(prev => ({ ...prev, [id]: !prev[id] }))

  const selectedCount = Object.values(ingredientState).filter(Boolean).length

  const handleAddToCart = () => {
    const selected: ScaledIngredient[] = ingredients
      .filter(i => ingredientState[i.id])
      .map(i => ({ ...i, scaledQuantity: i.quantity * servings }))
    onAddToCart?.(selected, servings)
  }

  return (
    <RecipeCtx.Provider value={{ servings, setServings, ingredientState, toggleIngredient, onIngredientClick }}>
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        className={cn(
          'bg-card border border-border rounded-xl shadow-[var(--shadow-card)] overflow-hidden',
          className
        )}
      >
        {image && <RecipeCard.Image src={image} alt={imageAlt} />}
        <RecipeCard.Header title={title} prepTime={prepTime} difficulty={difficulty} />

        <div className="px-4 md:px-5 py-3 border-t border-border">
          <RecipeCard.IngredientList ingredients={ingredients} />
        </div>

        <div className="px-4 md:px-5 py-3 md:py-4 border-t border-border">
          <RecipeCard.Actions selectedCount={selectedCount} onAddToCart={handleAddToCart} />
        </div>
      </motion.div>
    </RecipeCtx.Provider>
  )
}

RecipeCard.Image = Image
RecipeCard.Header = Header
RecipeCard.IngredientList = IngredientList
RecipeCard.Actions = Actions
