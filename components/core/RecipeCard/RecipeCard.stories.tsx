import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RecipeCard, type ScaledIngredient } from './RecipeCard'

const CARBONARA_INGREDIENTS = [
  { id: '1', name: 'Spaghetti', quantity: 200, unit: 'g' },
  { id: '2', name: 'Eggs', quantity: 2, unit: 'whole' },
  { id: '3', name: 'Pancetta', quantity: 100, unit: 'g' },
  { id: '4', name: 'Pecorino Romano', quantity: 50, unit: 'g' },
  { id: '5', name: 'Black pepper', quantity: 1, unit: 'tsp' },
]

const RAMEN_INGREDIENTS = [
  { id: '1', name: 'Ramen noodles', quantity: 150, unit: 'g' },
  { id: '2', name: 'Chicken broth', quantity: 600, unit: 'ml' },
  { id: '3', name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
  { id: '4', name: 'Mirin', quantity: 1, unit: 'tbsp' },
  { id: '5', name: 'Soft boiled egg', quantity: 1, unit: 'whole' },
  { id: '6', name: 'Nori', quantity: 2, unit: 'whole' },
  { id: '7', name: 'Green onion', quantity: 2, unit: 'whole' },
  { id: '8', name: 'Sesame oil', quantity: 1, unit: 'tsp' },
  { id: '9', name: 'Bamboo shoots', quantity: 40, unit: 'g' },
  { id: '10', name: 'Bean sprouts', quantity: 50, unit: 'g' },
]

const meta = {
  title: 'Core/RecipeCard',
  component: RecipeCard,
  tags: ['autodocs'],
  args: {
    title: 'Spaghetti Carbonara',
    prepTime: '25 min',
    difficulty: 'easy',
    defaultServings: 2,
    ingredients: CARBONARA_INGREDIENTS,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-[340px] md:w-[380px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecipeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithImage: Story = {
  name: 'With hero image',
  args: {
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    imageAlt: 'Spaghetti Carbonara',
  },
}

export const SomeExcluded: Story = {
  name: 'Some ingredients excluded',
  args: {
    ingredients: CARBONARA_INGREDIENTS.map((i, idx) =>
      idx === 1 || idx === 3 ? { ...i, selected: false } : i
    ),
  },
}

export const HardRecipe: Story = {
  name: 'Hard recipe — long list',
  args: {
    title: 'Tonkotsu Ramen',
    prepTime: '3 hr',
    difficulty: 'hard',
    defaultServings: 1,
    ingredients: RAMEN_INGREDIENTS,
  },
}

export const Medium: Story = {
  name: 'Medium difficulty',
  args: {
    title: 'Shakshuka',
    prepTime: '35 min',
    difficulty: 'medium',
    defaultServings: 2,
    ingredients: [
      { id: '1', name: 'Eggs', quantity: 3, unit: 'whole' },
      { id: '2', name: 'Crushed tomatoes', quantity: 400, unit: 'g' },
      { id: '3', name: 'Red bell pepper', quantity: 1, unit: 'whole' },
      { id: '4', name: 'Onion', quantity: 1, unit: 'whole' },
      { id: '5', name: 'Cumin', quantity: 1, unit: 'tsp' },
      { id: '6', name: 'Paprika', quantity: 1, unit: 'tsp' },
      { id: '7', name: 'Feta cheese', quantity: 60, unit: 'g' },
    ],
  },
}

export const Interactive: Story = {
  name: 'Interactive — live cart preview',
  render: args => {
    const [cartPayload, setCartPayload] = useState<{
      items: ScaledIngredient[]
      servings: number
    } | null>(null)
    const [lastClicked, setLastClicked] = useState<string | null>(null)

    return (
      <div className="flex flex-col gap-4 w-[340px] md:w-[380px]">
        <RecipeCard
          {...args}
          onIngredientClick={i => setLastClicked(i.name)}
          onAddToCart={(items, servings) => setCartPayload({ items, servings })}
        />

        {lastClicked && (
          <p className="text-xs text-muted-foreground text-center">
            Last clicked: <span className="font-medium text-foreground">{lastClicked}</span>
          </p>
        )}

        {cartPayload && (
          <div className="bg-muted rounded-xl p-3 md:p-4 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Cart payload · {cartPayload.servings} servings
            </p>
            {cartPayload.items.map(i => (
              <div key={i.id} className="flex justify-between text-xs md:text-sm text-foreground">
                <span>{i.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {i.scaledQuantity % 1 === 0
                    ? i.scaledQuantity
                    : parseFloat(i.scaledQuantity.toFixed(1))}
                  {i.unit.toLowerCase() === 'whole' ? '' : ` ${i.unit}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}
