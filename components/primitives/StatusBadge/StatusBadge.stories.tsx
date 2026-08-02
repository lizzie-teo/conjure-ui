import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge } from './StatusBadge'

const meta = {
  title: 'Primitives/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  args: { label: 'Label', variant: 'default' },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { label: 'Default', variant: 'default' } }
export const Success: Story = { args: { label: 'Confirmed', variant: 'success' } }
export const Warning: Story = { args: { label: '2 seats left', variant: 'warning' } }
export const Error: Story = { args: { label: 'Sold out', variant: 'error' } }
export const Info: Story = { args: { label: 'New', variant: 'info' } }

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge label="Default" variant="default" />
      <StatusBadge label="Confirmed" variant="success" />
      <StatusBadge label="2 seats left" variant="warning" />
      <StatusBadge label="Sold out" variant="error" />
      <StatusBadge label="New" variant="info" />
    </div>
  ),
}
