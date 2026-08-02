import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryBookingSuccess } from './DeliveryBookingSuccess'

const slot = {
  startTime: '9:00 am',
  endTime: '1:00 pm',
  tier: 'standard' as const,
}

const meta = {
  title: 'Components/DeliveryBookingSuccess',
  component: DeliveryBookingSuccess,
  tags: ['autodocs'],
  args: {
    bookingRef: 'DEL-A4B9X2',
    method: 'home-delivery',
    scheduledDate: '2026-06-09',
    scheduledSlot: slot,
    currency: 'AUD',
    onCta: () => {},
  },
} satisfies Meta<typeof DeliveryBookingSuccess>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HomeDeliveryBooked: Story = {
  name: 'Home delivery booked',
}

export const CollectBooked: Story = {
  name: 'Click & Collect booked',
  args: { method: 'click-collect' },
}

export const WithPointsEarned: Story = {
  name: 'With points earned',
  args: { pointsEarned: 150 },
}

export const WithCalendarCta: Story = {
  name: 'With add-to-calendar CTA',
  args: {
    pointsEarned: 150,
    onAddCalendar: () => {},
  },
}

export const WithLimitedSlot: Story = {
  name: 'Limited slot booked',
  args: {
    scheduledSlot: { startTime: '10:00 am', endTime: '2:00 pm', tier: 'standard' as const },
    pointsEarned: 200,
  },
}
