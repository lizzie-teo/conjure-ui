import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Timestamp } from './Timestamp'

const meta = {
  title: 'Primitives/Timestamp',
  component: Timestamp,
  tags: ['autodocs'],
  args: { datetime: '2026-06-08T06:00:00.000Z' },
} satisfies Meta<typeof Timestamp>

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
