import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryTracker } from './DeliveryTracker'
import type { OrderStatusStep } from '../../core/OrderStatusCard/OrderStatusCard'

const meta = {
  title: 'Layouts/DeliveryTracker',
  component: DeliveryTracker,
  tags: ['autodocs'],
  args: {
    orderId: 'ORD-8821',
    eta: 'Today by 6pm',
  },
} satisfies Meta<typeof DeliveryTracker>

export default meta
type Story = StoryObj<typeof meta>

const outForDeliverySteps: OrderStatusStep[] = [
  { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
  { label: 'Processing', status: 'complete', timestamp: '2026-06-08T09:15:00Z' },
  { label: 'In transit', status: 'complete', timestamp: '2026-06-08T14:00:00Z' },
  { label: 'Out for delivery', status: 'active' },
  { label: 'Delivered', status: 'pending' },
]

const deliveredSteps: OrderStatusStep[] = [
  { label: 'Order placed', status: 'complete', timestamp: '2026-06-08T09:00:00Z' },
  { label: 'Processing', status: 'complete', timestamp: '2026-06-08T09:15:00Z' },
  { label: 'In transit', status: 'complete', timestamp: '2026-06-08T14:00:00Z' },
  { label: 'Out for delivery', status: 'complete', timestamp: '2026-06-08T16:30:00Z' },
  { label: 'Delivered', status: 'complete', timestamp: '2026-06-08T17:45:00Z' },
]

export const WithPlaceholderMap: Story = {
  name: 'Placeholder map',
  args: {
    steps: outForDeliverySteps,
  },
}

export const WithMockMap: Story = {
  name: 'With mock map node',
  args: {
    steps: outForDeliverySteps,
    mapSlot: (
      <div
        style={{
          height: '100%',
          background: 'linear-gradient(135deg, var(--color-muted) 0%, var(--color-accent) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-muted-foreground)',
          fontSize: '0.75rem',
        }}
      >
        Consumer-provided map embed
      </div>
    ),
  },
}

export const AllStepsComplete: Story = {
  name: 'Delivered',
  args: {
    eta: undefined,
    steps: deliveredSteps,
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
