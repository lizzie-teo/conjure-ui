import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DateSelectStep } from './DateSelectStep'

const dates = [
  { date: '2026-06-08', availability: 'available' as const, cutoffAt: '2026-06-08T11:00:00.000Z' },
  { date: '2026-06-09', availability: 'available' as const },
  { date: '2026-06-10', availability: 'limited' as const },
  { date: '2026-06-11', availability: 'available' as const },
  { date: '2026-06-12', availability: 'available' as const },
  { date: '2026-06-13', availability: 'limited' as const },
  { date: '2026-06-14', availability: 'unavailable' as const },
]

const meta = {
  title: 'Components/DateSelectStep',
  component: DateSelectStep,
  tags: ['autodocs'],
  args: {
    availableDates: dates,
    onDateSelect: () => {},
  },
} satisfies Meta<typeof DateSelectStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SevenDays: Story = {
  name: '7-day strip',
}

export const DateSelected: Story = {
  name: 'Date selected',
  args: { selectedDate: '2026-06-09' },
}

export const LimitedSelected: Story = {
  name: 'Limited date selected',
  args: { selectedDate: '2026-06-10' },
}
