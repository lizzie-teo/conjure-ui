import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { CurrencyAmount } from './CurrencyAmount'

const meta = {
  title: 'Primitives/CurrencyAmount',
  component: CurrencyAmount,
  tags: ['autodocs'],
  args: { value: 160, currency: 'AUD', locale: 'en-AU', size: 'lg' },
} satisfies Meta<typeof CurrencyAmount>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Screen readers get the whole figure once, not "$", "160" as separate pieces
    await expect(within(canvasElement).getByText('$160')).toHaveClass('sr-only')
  },
}

export const WithCents: Story = {
  name: 'With cents',
  args: { value: 6750.45 },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-6">
      <CurrencyAmount {...args} size="sm" />
      <CurrencyAmount {...args} size="md" />
      <CurrencyAmount {...args} size="lg" />
      <CurrencyAmount {...args} size="xl" />
    </div>
  ),
}

export const Primary: Story = {
  args: { tone: 'primary', value: 1204.1 },
}

export const OtherLocales: Story = {
  name: 'Other locales',
  render: () => (
    <div className="flex flex-col gap-3">
      <CurrencyAmount value={1204.1} currency="EUR" locale="de-DE" size="lg" />
      <CurrencyAmount value={1204.1} currency="GBP" locale="en-GB" size="lg" />
      <CurrencyAmount value={1204} currency="JPY" locale="ja-JP" size="lg" />
    </div>
  ),
}
