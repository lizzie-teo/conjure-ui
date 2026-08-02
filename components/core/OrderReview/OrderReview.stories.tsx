import type { Meta, StoryObj } from '@storybook/react'
import { OrderReview } from './OrderReview'

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
const SNEAKER_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'

const ADDRESS = {
  name: 'Jane Smith',
  line1: '42 Sunset Boulevard',
  city: 'Los Angeles',
  state: 'CA',
  postcode: '90028',
  country: 'United States',
}

export const SINGLE_ITEM = [
  {
    image: PLACEHOLDER_IMAGE,
    name: 'Premium Leather Watch',
    variant: '42mm / Black',
    price: 299,
    quantity: 1,
  },
]

export const MULTI_ITEMS = [
  {
    image: PLACEHOLDER_IMAGE,
    name: 'Premium Leather Watch',
    variant: '42mm / Black',
    price: 299,
    quantity: 1,
  },
  {
    image: SNEAKER_IMAGE,
    name: 'Classic Sneakers',
    variant: 'Size 10 / White',
    price: 120,
    quantity: 2,
  },
]

const meta = {
  title: 'Components/OrderReview',
  component: OrderReview,
  tags: ['autodocs'],
  // Shared fixtures — not stories.
  excludeStories: ['SINGLE_ITEM', 'MULTI_ITEMS'],
  parameters: {
    layout: 'padded',
  },
  args: {
    items: SINGLE_ITEM,
    shippingAddress: ADDRESS,
    subtotal: 299,
    shipping: 9.99,
    total: 308.99,
    currency: 'USD',
    onConfirm: () => {},
  },
} satisfies Meta<typeof OrderReview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleItems: Story = {
  name: 'Multiple items',
  args: {
    items: MULTI_ITEMS,
    subtotal: 539,
    shipping: 9.99,
    total: 548.99,
  },
}

export const FreeShipping: Story = {
  name: 'Free shipping',
  args: {
    items: MULTI_ITEMS,
    subtotal: 539,
    shipping: 0,
    total: 539,
  },
}
