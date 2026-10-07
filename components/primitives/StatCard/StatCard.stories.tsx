import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatCard } from './StatCard'

const meta = {
  title: 'Primitives/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Value', amount: 200, currency: 'AUD', variant: 'default' },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Highlight: Story = {
  args: { label: 'Annually', variant: 'highlight', badge: 'Best value' },
  decorators: [(Story) => <div className="pt-3"><Story /></div>],
}

export const Estimated: Story = {
  name: 'Estimated value',
  args: { label: 'Estimated value', amount: 300, orMore: true },
}

export const ValueVsPrice: Story = {
  name: 'Value vs price pair',
  render: () => (
    <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-sm">
      <StatCard label="Estimated value" amount={300} currency="AUD" orMore variant="highlight" />
      <StatCard label="You pay" amount={150} currency="AUD" />
    </div>
  ),
}

export const BillingPair: Story = {
  name: 'Monthly vs yearly',
  render: () => (
    <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-sm pt-3">
      <StatCard label="Monthly" amount={14.99} currency="AUD" />
      <StatCard label="Yearly" amount={129.99} currency="AUD" variant="highlight" badge="Save $49.90" />
    </div>
  ),
}

export const Inverse: Story = {
  name: 'Inverse (on a primary surface)',
  render: () => (
    <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-sm rounded-xl bg-primary p-4 pt-7 md:p-6 md:pt-9">
      <StatCard label="Monthly" amount={14.99} currency="AUD" tone="inverse" />
      <StatCard label="Yearly" amount={129.99} currency="AUD" tone="inverse" variant="highlight" badge="Save $49.90" />
    </div>
  ),
}
