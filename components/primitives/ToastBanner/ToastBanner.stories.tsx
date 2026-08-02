import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ToastBanner } from './ToastBanner'

const meta = {
  title: 'Primitives/ToastBanner',
  component: ToastBanner,
  tags: ['autodocs'],
  args: {
    message: 'Your cart has been updated.',
    variant: 'info',
    duration: 0,
  },
} satisfies Meta<typeof ToastBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Info: Story = {
  args: { variant: 'info', message: 'Checking availability for your items.' },
}

export const Success: Story = {
  args: { variant: 'success', message: 'Order confirmed! You\'ll receive a confirmation email shortly.' },
}

export const Warning: Story = {
  args: { variant: 'warning', message: 'Only 2 left in stock — grab yours before it sells out.' },
}

export const Error: Story = {
  args: { variant: 'error', message: 'Payment failed. Please check your card details and try again.' },
}

export const WithDismiss: Story = {
  name: 'With dismiss button',
  args: {
    variant: 'success',
    message: 'Item added to your cart.',
    onDismiss: () => {},
  },
}

export const Persistent: Story = {
  name: 'Persistent (no auto-dismiss)',
  args: {
    variant: 'warning',
    message: 'Your session will expire in 5 minutes.',
    duration: 0,
    onDismiss: () => {},
  },
}

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <ToastBanner variant="info" message="Checking availability for your items." duration={0} />
      <ToastBanner variant="success" message="Order confirmed!" duration={0} />
      <ToastBanner variant="warning" message="Only 2 left in stock." duration={0} />
      <ToastBanner variant="error" message="Payment failed. Please try again." duration={0} />
    </div>
  ),
}
