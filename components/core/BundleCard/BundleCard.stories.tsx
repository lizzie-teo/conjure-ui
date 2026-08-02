import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { BundleCard } from './BundleCard'
import { LookCard, RecipeCard, ShopList } from './bindings'
import type { Look, Recipe, ShopLine } from './bindings'

/**
 * One structural component behind every "composed thing" in the library —
 * a recipe, a makeup look, a shopping list, a camping kit. Domain vocabulary
 * lives in a binding (`bindings.tsx`), never in a branch inside the card.
 */

// ── Fixtures (module-local — never exported, or CSF renders them as stories) ──

const CARBONARA: Recipe = {
  id: 'carbonara',
  name: 'Spaghetti Carbonara',
  prepTime: '25 min',
  difficulty: 'easy',
  defaultServings: 2,
  image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
  imageAlt: 'Spaghetti Carbonara',
  ingredients: [
    { id: '1', name: 'Spaghetti', quantity: 200, unit: 'g' },
    { id: '2', name: 'Eggs', quantity: 2, unit: 'whole' },
    { id: '3', name: 'Pancetta', quantity: 100, unit: 'g' },
    { id: '4', name: 'Pecorino Romano', quantity: 50, unit: 'g' },
    { id: '5', name: 'Black pepper', quantity: 1, unit: 'tsp' },
  ],
}

const WARM_DAY_LOOK: Look = {
  id: 'warm-day-1',
  name: 'Rested and together',
  occasion: 'day',
  format: 'individual',
  story: {
    harmony: 'Bronze eye, barely-there lip — warm tones that stay in the same family.',
    skinTone: 'Sits right with golden-olive skin without fighting it.',
  },
  products: [
    {
      id: 'p1',
      type: 'eye',
      label: 'Eyeshadow',
      shade: 'Warm Bronze',
      swatch: { hex: '#c8864a', name: 'warm bronze' },
      image: 'https://picsum.photos/seed/bronze-eye/400/300',
      imageAlt: 'Warm bronze eyeshadow palette',
      isFocalPoint: true,
      undertoneNote: 'Good for golden-olive undertones',
    },
    {
      id: 'p2',
      type: 'lip',
      label: 'Lip Colour',
      shade: 'Nude Peach',
      swatch: { hex: '#d4957a', name: 'nude peach' },
      image: 'https://picsum.photos/seed/peach-lip/400/300',
      imageAlt: 'Nude peach lip colour',
    },
    {
      id: 'p3',
      type: 'cheek',
      label: 'Blush',
      shade: 'Sun Bronze',
      swatch: { hex: '#c47848', name: 'sun bronze' },
      image: 'https://picsum.photos/seed/bronze-blush/400/300',
      imageAlt: 'Sun bronze blush',
    },
  ],
}

const PANTRY_LINES: ShopLine[] = [
  {
    id: 'pasta',
    label: 'Spaghetti, 200g',
    recommended: {
      id: 'pasta-barilla',
      name: 'Barilla Spaghetti No.5 500g',
      brand: 'Barilla',
      price: 3.5,
      currency: 'AUD',
    },
    alternatives: [
      { id: 'pasta-home', name: 'Home Brand Spaghetti 500g', price: 1.2, currency: 'AUD' },
      {
        id: 'pasta-san',
        name: 'San Remo Spaghetti 500g',
        price: 2.8,
        originalPrice: 3.6,
        currency: 'AUD',
        onSale: true,
      },
    ],
  },
  {
    id: 'pancetta',
    label: 'Pancetta, 100g',
    recommended: {
      id: 'pancetta-deli',
      name: 'Deli Pancetta Sliced 100g',
      brand: 'Primo',
      price: 6.0,
      currency: 'AUD',
    },
    alternatives: [{ id: 'pancetta-bacon', name: 'Streaky Bacon 200g', price: 4.5, currency: 'AUD' }],
  },
  {
    id: 'pecorino',
    label: 'Pecorino Romano, 50g',
    recommended: {
      id: 'pecorino-wedge',
      name: 'Pecorino Romano Wedge 200g',
      brand: 'Locatelli',
      price: 11.0,
      currency: 'AUD',
    },
  },
]

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 w-[340px] md:w-[380px]">
      <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  )
}

const meta: Meta<typeof BundleCard> = {
  title: 'Components/BundleCard',
  component: BundleCard,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof BundleCard>

// ── Bindings ──────────────────────────────────────────────────────────────────

export const Recipe_: Story = {
  name: 'Grocery — RecipeCard binding',
  render: () => (
    <Column label="selectable + servings multiplier">
      <RecipeCard recipe={CARBONARA} />
    </Column>
  ),
}

export const Look_: Story = {
  name: 'Beauty — LookCard binding',
  render: () => (
    <Column label="navigable + collage hero">
      <LookCard look={WARM_DAY_LOOK} onAddToCart={() => {}} onSave={() => {}} />
    </Column>
  ),
}

export const CarouselHero: Story = {
  name: 'Beauty — carousel hero variant',
  render: () => (
    <Column label="hero=carousel — swipeable, same card">
      <LookCard look={WARM_DAY_LOOK} hero="carousel" onAddToCart={() => {}} />
    </Column>
  ),
}

export const ShopList_: Story = {
  name: 'Grocery — ShopList binding (swappable products)',
  render: () => (
    <Column label="each line swaps for a stocked alternative">
      <ShopList title="Your carbonara list" lines={PANTRY_LINES} onAddToCart={() => {}} />
    </Column>
  ),
}

export const BothVerticals: Story = {
  name: 'One component, two industries',
  render: () => (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
      <Column label="Grocery — selectable + servings multiplier">
        <RecipeCard recipe={CARBONARA} />
      </Column>
      <Column label="Beauty — navigable + collage hero">
        <LookCard look={WARM_DAY_LOOK} onAddToCart={() => {}} onSave={() => {}} />
      </Column>
    </div>
  ),
}

// ── Structural layer ──────────────────────────────────────────────────────────

export const Structural: Story = {
  name: 'Structural layer — no domain at all',
  render: () => (
    <Column label="BundleCard with raw props">
      <BundleCard
        title="Weekend camping kit"
        badges={[{ label: '2 nights', variant: 'info' }]}
        body={<p className="text-muted-foreground">Everything for two people, packed into one bag.</p>}
        selectable
        multiplier={{ label: 'People', min: 1, max: 8, defaultValue: 2 }}
        items={[
          { id: 'a', label: 'Sleeping bag', trailing: n => <span className="text-sm text-muted-foreground tabular-nums">{n}</span> },
          { id: 'b', label: 'Head torch', trailing: n => <span className="text-sm text-muted-foreground tabular-nums">{n}</span> },
          { id: 'c', label: 'Gas canister', trailing: () => <span className="text-sm text-muted-foreground tabular-nums">1</span> },
        ]}
        actions={[
          {
            id: 'add',
            disabledWhenEmpty: true,
            label: ({ selectedCount }) => `Add ${selectedCount} item${selectedCount === 1 ? '' : 's'} to cart`,
          },
        ]}
      />
    </Column>
  ),
}

// ── Interaction ───────────────────────────────────────────────────────────────

export const SwapChangesRowIdentity: Story = {
  name: 'Swap replaces the row it belongs to',
  render: () => <ShopList title="Your carbonara list" lines={PANTRY_LINES} onAddToCart={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // The row leads with its recommended product.
    await expect(
      canvas.getByRole('button', { name: /^Spaghetti, 200g, Barilla Spaghetti No\.5 500g/ })
    ).toBeInTheDocument()

    const swap = canvas.getByRole('button', { name: 'Swap: Barilla Spaghetti No.5 500g' })
    await expect(swap).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(swap)
    await expect(swap).toHaveAttribute('aria-expanded', 'true')

    // The row's own identity leads the options, marked as the current choice.
    const original = canvas.getByRole('button', { name: /^Barilla Spaghetti No\.5 500g/ })
    await expect(original).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(canvas.getByRole('button', { name: /Home Brand Spaghetti 500g/ }))

    // Both the row and its swap control now name the chosen alternative, and
    // once the drawer has finished closing nothing still refers to the default.
    await expect(
      canvas.getByRole('button', { name: /^Spaghetti, 200g, Home Brand Spaghetti 500g/ })
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole('button', { name: 'Swap: Home Brand Spaghetti 500g' })
    ).toBeInTheDocument()
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: /Barilla Spaghetti No\.5 500g/ })
      ).not.toBeInTheDocument()
    )
  },
}

export const SwapIsReversible: Story = {
  name: 'A swapped row can go back to its default',
  render: () => <ShopList title="Your carbonara list" lines={PANTRY_LINES} onAddToCart={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Swap: Barilla Spaghetti No.5 500g' }))
    await userEvent.click(canvas.getByRole('button', { name: /Home Brand Spaghetti 500g/ }))
    await waitFor(() =>
      expect(
        canvas.queryByRole('button', { name: /Barilla Spaghetti No\.5 500g/ })
      ).not.toBeInTheDocument()
    )

    // Reopening offers the default again — a swap is not a one-way door.
    await userEvent.click(canvas.getByRole('button', { name: 'Swap: Home Brand Spaghetti 500g' }))
    await userEvent.click(canvas.getByRole('button', { name: /^Barilla Spaghetti No\.5 500g/ }))

    await expect(
      canvas.getByRole('button', { name: /^Spaghetti, 200g, Barilla Spaghetti No\.5 500g/ })
    ).toBeInTheDocument()
  },
}

export const SelectionGatesTheAction: Story = {
  name: 'Deselecting every row disables the CTA',
  render: () => <RecipeCard recipe={CARBONARA} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const cta = canvas.getByRole('button', { name: /Add 5 ingredients to cart/ })
    await expect(cta).toBeEnabled()

    for (const name of ['Spaghetti', 'Eggs', 'Pancetta', 'Pecorino Romano', 'Black pepper']) {
      await userEvent.click(canvas.getByRole('button', { name: new RegExp(`^${name},`) }))
    }

    await expect(canvas.getByRole('button', { name: 'No ingredients selected' })).toBeDisabled()
  },
}
