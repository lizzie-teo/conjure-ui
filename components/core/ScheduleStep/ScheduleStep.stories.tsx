import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ScheduleStep } from './ScheduleStep'

const availableDates = [
  { date: '2026-06-08', availability: 'available' as const, cutoffAt: '2026-06-08T11:00:00.000Z' },
  { date: '2026-06-09', availability: 'available' as const },
  { date: '2026-06-10', availability: 'limited' as const },
  { date: '2026-06-11', availability: 'available' as const },
  { date: '2026-06-12', availability: 'available' as const },
  { date: '2026-06-13', availability: 'limited' as const },
  { date: '2026-06-14', availability: 'unavailable' as const },
]

const timeSlots = [
  { id: 'e1', startTime: '9:00 am', endTime: '11:00 am', tier: 'express' as const, fee: 7.99, currency: 'AUD', availability: 'available' as const },
  { id: 's1', startTime: '9:00 am', endTime: '1:00 pm', tier: 'standard' as const, fee: 0, currency: 'AUD', availability: 'available' as const },
  { id: 's2', startTime: '1:00 pm', endTime: '5:00 pm', tier: 'standard' as const, fee: 0, currency: 'AUD', availability: 'available' as const },
  { id: 's3', startTime: '5:00 pm', endTime: '9:00 pm', tier: 'standard' as const, fee: 0, currency: 'AUD', availability: 'limited' as const },
]

const meta = {
  title: 'Components/ScheduleStep',
  component: ScheduleStep,
  tags: ['autodocs'],
  args: {
    availableDates,
    timeSlots,
    onDateSelect: () => {},
    onSlotSelect: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScheduleStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoSelection: Story = {
  name: 'No date selected — prompt shown',
}

export const DateSelected: Story = {
  name: 'Date selected — slots appear',
  args: { selectedDate: '2026-06-09' },
}

export const DateAndSlotSelected: Story = {
  name: 'Date + slot selected',
  args: { selectedDate: '2026-06-09', selectedSlotId: 's1' },
}

export const LimitedDateSelected: Story = {
  name: 'Limited date selected',
  args: { selectedDate: '2026-06-10' },
}
