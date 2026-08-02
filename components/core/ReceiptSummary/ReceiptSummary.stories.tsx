import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ReceiptSummary } from './ReceiptSummary'

const meta = {
  title: 'Core/ReceiptSummary',
  component: ReceiptSummary,
  tags: ['autodocs'],
  args: {
    orderId: 'ORD-8821',
    paidAt: '2026-06-08T09:00:00Z',
    currency: 'USD',
  },
} satisfies Meta<typeof ReceiptSummary>

export default meta
type Story = StoryObj<typeof meta>

export const SingleItem: Story = {
  name: 'Single item',
  args: {
    items: [
      {
        name: 'Merino Wool Sweater',
        quantity: 1,
        price: 89,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=96&h=96&fit=crop',
      },
    ],
    subtotal: 89,
    shipping: 5.99,
    total: 94.99,
  },
}

export const MultipleItems: Story = {
  name: 'Multiple items',
  args: {
    items: [
      {
        name: 'Merino Wool Sweater',
        quantity: 1,
        price: 89,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=96&h=96&fit=crop',
      },
      {
        name: 'Slim Chinos',
        quantity: 2,
        price: 65,
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=96&h=96&fit=crop',
      },
      {
        name: 'Canvas Tote',
        quantity: 1,
        price: 24,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=96&h=96&fit=crop',
      },
    ],
    subtotal: 243,
    shipping: 0,
    total: 243,
  },
}

export const FreeShipping: Story = {
  name: 'Free shipping',
  args: {
    items: [
      {
        name: 'Running Shoes',
        quantity: 1,
        price: 149,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=96&h=96&fit=crop',
      },
      {
        name: 'Moisture-Wicking Socks',
        quantity: 3,
        price: 12,
        image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=96&h=96&fit=crop',
      },
    ],
    subtotal: 185,
    shipping: 0,
    total: 185,
  },
}

export const NoImages: Story = {
  name: 'No images',
  args: {
    items: [
      { name: 'Ceramic Mug', quantity: 1, price: 32 },
      { name: 'Gift Wrapping', quantity: 1, price: 5 },
    ],
    subtotal: 37,
    shipping: 4.99,
    total: 41.99,
  },
}

export const NoPaidAt: Story = {
  name: 'No paid timestamp',
  args: {
    paidAt: undefined,
    items: [
      {
        name: 'Ceramic Mug',
        quantity: 1,
        price: 32,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=96&h=96&fit=crop',
      },
    ],
    subtotal: 32,
    shipping: 4.99,
    total: 36.99,
  },
}
