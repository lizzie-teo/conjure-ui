import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AuthStatus } from './AuthStatus'

const meta = {
  title: 'Core/AuthStatus',
  component: AuthStatus,
  tags: ['autodocs'],
  args: { state: 'success' },
} satisfies Meta<typeof AuthStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = { args: { state: 'success' } }

export const Error: Story = { args: { state: 'error' } }

export const CustomMessage: Story = {
  name: 'Custom message',
  args: {
    state: 'success',
    message: 'Face ID confirmed — your order is being processed.',
  },
}

export const BothStates: Story = {
  name: 'Both states',
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <AuthStatus state="success" />
      <AuthStatus state="error" />
    </div>
  ),
}
