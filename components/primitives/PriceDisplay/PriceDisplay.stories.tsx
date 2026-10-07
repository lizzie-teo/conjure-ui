import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PriceDisplay } from './PriceDisplay'

const meta = {
  title: 'Primitives/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  args: { amount: 299, currency: 'AUD' },
} satisfies Meta<typeof PriceDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithStrikethrough: Story = {
  name: 'With strikethrough',
  args: { amount: 199, currency: 'AUD', strikethrough: 299 },
}

export const USD: Story = {
  args: { amount: 149.99, currency: 'USD' },
}

export const GBP: Story = {
  args: { amount: 89.5, currency: 'GBP', strikethrough: 120 },
}

export const FromPerUnit: Story = {
  name: 'From, per unit',
  args: { amount: 50, currency: 'AUD', locale: 'en-AU', prefix: 'From', unit: 'guest' },
}
