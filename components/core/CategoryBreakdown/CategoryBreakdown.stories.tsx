import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { Clapperboard, Plane, ShoppingBasket, Utensils } from 'lucide-react'
import { CategoryBreakdown } from './CategoryBreakdown'
import { CurrencyAmount } from '@/components/primitives/CurrencyAmount/CurrencyAmount'

// Deliberately out of order: the component ranks them
const SAVINGS_BY_CATEGORY = [
  { id: 'dining', label: 'Dining', value: 101, icon: <Utensils />, meta: '3 offers used', href: '#dining' },
  { id: 'travel', label: 'Travel', value: 91, icon: <Plane />, meta: '1 offer used', href: '#travel' },
  { id: 'entertainment', label: 'Entertainment', value: 160, icon: <Clapperboard />, meta: '4 offers used', href: '#entertainment' },
  { id: 'everyday', label: 'Everyday essentials and groceries', value: 120, icon: <ShoppingBasket />, meta: '6 offers used', href: '#everyday' },
]

const meta = {
  title: 'Components/CategoryBreakdown',
  component: CategoryBreakdown,
  tags: ['autodocs'],
  args: { items: SAVINGS_BY_CATEGORY, currency: 'AUD', locale: 'en-AU', 'aria-label': 'Savings by category' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof CategoryBreakdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const rows = within(canvasElement).getAllByRole('listitem')
    // Ranked largest first, whatever order the data arrived in
    await expect(rows[0]).toHaveTextContent('Entertainment')
    await expect(rows[3]).toHaveTextContent('Travel')
    // Each row is one link, named by its category
    await expect(within(rows[0]).getByRole('link')).toHaveAccessibleName('Entertainment')
  },
}

export const WithTotal: Story = {
  name: 'With total and comparison',
  render: (args) => (
    <section aria-labelledby="saved-heading" className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 @md:p-5 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-1.5">
        <h2 id="saved-heading" className="text-sm @md:text-base text-muted-foreground">Saved in September</h2>
        <CurrencyAmount value={472} currency="AUD" locale="en-AU" size="xl" />
        <p className="text-sm text-foreground">
          <span className="font-semibold">$64 more</span> <span className="text-muted-foreground">than August</span>
        </p>
      </div>
      <CategoryBreakdown {...args} />
    </section>
  ),
}

export const NoLinksNoIcons: Story = {
  name: 'No links or icons',
  args: {
    items: SAVINGS_BY_CATEGORY.map(({ id, label, value }) => ({ id, label, value })),
    scale: 'total',
  },
}
