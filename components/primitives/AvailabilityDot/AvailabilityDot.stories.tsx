import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AvailabilityDot } from './AvailabilityDot'

const meta = {
  title: 'Primitives/AvailabilityDot',
  component: AvailabilityDot,
  tags: ['autodocs'],
  args: { level: 'available', showLabel: true },
} satisfies Meta<typeof AvailabilityDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Available: Story = {
  args: { level: 'available', showLabel: true },
}

export const Limited: Story = {
  args: { level: 'limited', showLabel: true },
}

export const Unavailable: Story = {
  args: { level: 'unavailable', showLabel: true },
}

export const AllLevels: Story = {
  name: 'All levels',
  args: { level: 'available' },
  render: () => (
    <div className="flex items-center gap-4">
      <AvailabilityDot level="available" showLabel />
      <AvailabilityDot level="limited" showLabel />
      <AvailabilityDot level="unavailable" showLabel />
    </div>
  ),
}

export const IconsOnly: Story = {
  name: 'Icons without label',
  args: { level: 'available' },
  render: () => (
    <div className="flex items-center gap-3">
      <AvailabilityDot level="available" />
      <AvailabilityDot level="limited" />
      <AvailabilityDot level="unavailable" />
    </div>
  ),
}
