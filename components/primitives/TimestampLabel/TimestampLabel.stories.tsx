import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TimestampLabel } from './TimestampLabel'

const meta = {
  title: 'Primitives/TimestampLabel',
  component: TimestampLabel,
  tags: ['autodocs'],
  args: { datetime: '2026-06-08T06:00:00.000Z' },
} satisfies Meta<typeof TimestampLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { datetime: '2026-06-08T06:00:00.000Z' } }

const ago = (ms: number) => new Date(Date.now() - ms).toISOString()

export const JustNow: Story = {
  name: 'Just now (< 60s)',
  args: { datetime: ago(15_000) },
}

export const MinutesAgo: Story = {
  name: 'Minutes ago',
  args: { datetime: ago(8 * 60_000) },
}

export const HoursAgo: Story = {
  name: 'Hours ago',
  args: { datetime: ago(3 * 3600_000) },
}

export const OlderDate: Story = {
  name: 'Older date (locale format)',
  args: { datetime: ago(3 * 86400_000) },
}
