import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TimeSlotStep } from './TimeSlotStep'

const allSlots = [
  { id: 'e1', startTime: '9:00 am', endTime: '11:00 am', tier: 'express' as const, fee: 7.99, currency: 'AUD', availability: 'available' as const },
  { id: 'e2', startTime: '12:00 pm', endTime: '2:00 pm', tier: 'express' as const, fee: 7.99, currency: 'AUD', availability: 'limited' as const },
  { id: 's1', startTime: '9:00 am', endTime: '1:00 pm', tier: 'standard' as const, fee: 0, currency: 'AUD', availability: 'available' as const },
  { id: 's2', startTime: '1:00 pm', endTime: '5:00 pm', tier: 'standard' as const, fee: 0, currency: 'AUD', availability: 'available' as const },
  { id: 's3', startTime: '5:00 pm', endTime: '9:00 pm', tier: 'standard' as const, fee: 0, currency: 'AUD', availability: 'limited' as const },
]

const meta = {
  title: 'Components/TimeSlotStep',
  component: TimeSlotStep,
  tags: ['autodocs'],
  args: {
    slots: allSlots,
    onSlotSelect: () => {},
  },
} satisfies Meta<typeof TimeSlotStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSlots: Story = {
  name: 'All slots',
}

export const MorningOnly: Story = {
  name: 'Morning only',
  args: { slots: allSlots.filter((s) => s.id.startsWith('e') || s.id === 's1') },
}

export const SlotSelected: Story = {
  name: 'Slot selected',
  args: { selectedSlotId: 's1' },
}

export const MixedAvailability: Story = {
  name: 'Mixed availability',
  args: {
    slots: allSlots.map((s, i) => ({
      ...s,
      availability: i % 3 === 0 ? 'limited' as const : i % 5 === 0 ? 'unavailable' as const : 'available' as const,
    })),
  },
}
