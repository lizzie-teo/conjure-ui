import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShoppingCart, Search, CreditCard, AlertCircle } from 'lucide-react'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    heading: 'Your cart is empty',
    body: 'Add some items to get started.',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  name: 'With action',
  args: {
    heading: 'Your cart is empty',
    body: 'Browse our collection and find something you love.',
    action: { label: 'Start shopping', onClick: () => {} },
  },
}

export const NoBody: Story = {
  name: 'No body text',
  args: {
    heading: 'Nothing here yet',
    body: undefined,
    action: { label: 'Get started', onClick: () => {} },
  },
}

export const NoAction: Story = {
  name: 'No action',
  args: {
    heading: 'No results found',
    body: 'Try adjusting your search or filters.',
  },
}

export const CustomIcon: Story = {
  name: 'Custom icon',
  args: {
    icon: <Search aria-hidden />,
    heading: 'No results found',
    body: 'Try a different search term.',
    action: { label: 'Clear search', onClick: () => {} },
  },
}

export const NoPaymentMethods: Story = {
  name: 'No payment methods',
  args: {
    icon: <CreditCard aria-hidden />,
    heading: 'No payment methods saved',
    body: 'Add a card or digital wallet to speed up checkout.',
    action: { label: 'Add payment method', onClick: () => {} },
  },
}

export const FailedLoad: Story = {
  name: 'Failed to load',
  args: {
    icon: <AlertCircle aria-hidden />,
    heading: 'Something went wrong',
    body: 'We couldn\'t load your order history. Please try again.',
    action: { label: 'Retry', onClick: () => {} },
  },
}

export const EmptyCartVariant: Story = {
  name: 'Empty cart',
  args: {
    icon: <ShoppingCart aria-hidden />,
    heading: 'Your cart is empty',
    body: 'Find something you love and add it to your cart.',
    action: { label: 'Browse products', onClick: () => {} },
  },
}
