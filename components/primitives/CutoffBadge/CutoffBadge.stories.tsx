import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CutoffBadge } from './CutoffBadge'

const meta = {
  title: 'Primitives/CutoffBadge',
  component: CutoffBadge,
  tags: ['autodocs'],
  args: { cutoffAt: '2026-06-08T11:00:00.000Z' },
} satisfies Meta<typeof CutoffBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SameDay: Story = {
  name: 'Same-day cutoff',
  args: { cutoffAt: '2026-06-08T11:00:00.000Z' },
}

export const Missed: Story = {
  name: 'Cutoff missed',
  args: { cutoffAt: '2026-06-08T09:00:00.000Z', missed: true },
}
