import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProgressStep } from './ProgressStep'

const meta = {
  title: 'Primitives/ProgressStep',
  component: ProgressStep,
  tags: ['autodocs'],
  args: { status: 'pending' },
} satisfies Meta<typeof ProgressStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { status: 'pending', label: 'Search' } }

export const Pending: Story = { args: { status: 'pending', label: 'Search' } }
export const Active: Story = { args: { status: 'active', label: 'Book' } }
export const Complete: Story = { args: { status: 'complete', label: 'Confirm' } }

export const AllStatuses: Story = {
  name: 'All statuses',
  render: () => (
    <div className="flex items-start gap-8">
      <ProgressStep status="complete" label="Search" />
      <ProgressStep status="active" label="Book" />
      <ProgressStep status="pending" label="Confirm" />
    </div>
  ),
}

export const NoLabels: Story = {
  name: 'No labels',
  render: () => (
    <div className="flex items-center gap-6">
      <ProgressStep status="complete" />
      <ProgressStep status="active" />
      <ProgressStep status="pending" />
    </div>
  ),
}
