import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { CartItem } from './CartItem'

export const PLACEHOLDER_IMAGE ='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'

const meta = {
  title: 'Components/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  // Shared fixture — not a story.
  excludeStories: ['PLACEHOLDER_IMAGE'],
  args: {
    image: PLACEHOLDER_IMAGE,
    name: 'Premium Leather Watch',
    price: 299,
    currency: 'USD',
    quantity: 1,
  },
} satisfies Meta<typeof CartItem>

export default meta
type Story = StoryObj<typeof meta>

function Interactive(props: Partial<React.ComponentProps<typeof CartItem>>) {
  const [qty, setQty] = useState(props.quantity ?? 1)
  const [removed, setRemoved] = useState(false)

  if (removed) {
    return <p className="text-sm text-muted-foreground">Item removed</p>
  }

  return (
    <CartItem
      image={PLACEHOLDER_IMAGE}
      name="Premium Leather Watch"
      price={299}
      currency="USD"
      {...props}
      quantity={qty}
      onQuantityChange={setQty}
      onRemove={() => setRemoved(true)}
    />
  )
}

export const Default: Story = {
  render: () => <Interactive quantity={1} />,
}

export const WithVariant: Story = {
  name: 'With variant',
  render: () => (
    <Interactive
      quantity={2}
      name="Classic Sneakers"
      price={120}
      variant="Size 10 / White"
    />
  ),
}

export const AtMaxQuantity: Story = {
  name: 'At max quantity',
  render: () => (
    <Interactive
      quantity={5}
      name="Limited Edition Cap"
      price={45}
      variant="One size"
    />
  ),
}

export const ReadOnly: Story = {
  name: 'Read-only (order review)',
  render: () => (
    <CartItem
      image={PLACEHOLDER_IMAGE}
      name="Premium Leather Watch"
      variant="42mm / Black"
      price={299}
      currency="USD"
      quantity={2}
    />
  ),
}

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Interactive quantity={1} name="Watch" price={299} />
      <Interactive quantity={2} name="Classic Sneakers" price={120} variant="Size 10 / White" />
      <CartItem
        image={PLACEHOLDER_IMAGE}
        name="Read-only item"
        price={45}
        currency="USD"
        quantity={3}
      />
    </div>
  ),
}
