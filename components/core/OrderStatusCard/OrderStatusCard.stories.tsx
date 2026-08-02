import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { OrderStatusCard } from './OrderStatusCard'
import type { OrderStatusStep } from './OrderStatusCard'

const meta = {
  title: 'Core/OrderStatusCard',
  component: OrderStatusCard,
  tags: ['autodocs'],
  args: {
    orderId: 'ORD-8821',
    eta: 'Arrives Thu, 11 Jun',
  },
} satisfies Meta<typeof OrderStatusCard>

export default meta
type Story = StoryObj<typeof meta>

const allSteps: OrderStatusStep[] = [
  { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
  { label: 'Processing', status: 'complete', timestamp: '2026-06-08T09:15:00Z' },
  { label: 'In transit', status: 'complete', timestamp: '2026-06-08T14:00:00Z' },
  { label: 'Out for delivery', status: 'complete', timestamp: '2026-06-08T16:30:00Z' },
  { label: 'Delivered', status: 'complete', timestamp: '2026-06-08T17:45:00Z' },
]

export const Placed: Story = {
  args: {
    eta: 'Arrives Thu, 11 Jun',
    steps: [
      { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
      { label: 'Processing', status: 'active' },
      { label: 'In transit', status: 'pending' },
      { label: 'Out for delivery', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
}

export const InTransit: Story = {
  name: 'In transit',
  args: {
    eta: 'Arrives Thu, 11 Jun',
    steps: [
      { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
      { label: 'Processing', status: 'complete', timestamp: '2026-06-08T09:15:00Z' },
      { label: 'In transit', status: 'active' },
      { label: 'Out for delivery', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
}

export const OutForDelivery: Story = {
  name: 'Out for delivery',
  args: {
    eta: 'Today by 6pm',
    steps: [
      { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
      { label: 'Processing', status: 'complete', timestamp: '2026-06-08T09:15:00Z' },
      { label: 'In transit', status: 'complete', timestamp: '2026-06-08T14:00:00Z' },
      { label: 'Out for delivery', status: 'active' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
}

export const Delivered: Story = {
  args: {
    eta: undefined,
    steps: allSteps,
  },
}

export const NoEta: Story = {
  name: 'No ETA',
  args: {
    eta: undefined,
    steps: [
      { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
      { label: 'Processing', status: 'active' },
      { label: 'In transit', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
}
