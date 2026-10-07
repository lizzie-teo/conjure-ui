import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StepIndicator } from './StepIndicator'

const meta = {
  title: 'Primitives/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  args: { status: 'pending' },
} satisfies Meta<typeof StepIndicator>

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
      <StepIndicator status="complete" label="Search" />
      <StepIndicator status="active" label="Book" />
      <StepIndicator status="pending" label="Confirm" />
    </div>
  ),
}

export const NoLabels: Story = {
  name: 'No labels',
  render: () => (
    <div className="flex items-center gap-6">
      <StepIndicator status="complete" />
      <StepIndicator status="active" />
      <StepIndicator status="pending" />
    </div>
  ),
}
