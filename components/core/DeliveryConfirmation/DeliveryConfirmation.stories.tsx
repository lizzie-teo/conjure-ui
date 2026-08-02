import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryConfirmation } from './DeliveryConfirmation'

const homeAddress = {
  name: 'Alex Kim',
  line1: '42 George Street',
  city: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  country: 'Australia',
}

const slot = {
  id: 's1',
  startTime: '9:00 am',
  endTime: '1:00 pm',
  tier: 'standard' as const,
  fee: 0,
  currency: 'AUD',
  availability: 'available' as const,
}


const rewards = {
  programName: 'Everyday Rewards',
  currentPoints: 1200,
  pointsEarned: 150,
  pointsValue: 6.0,
  currency: 'AUD',
}

const branch = { name: 'Surry Hills', address: '123 Crown St, Surry Hills NSW' }

const meta = {
  title: 'Components/DeliveryConfirmation',
  component: DeliveryConfirmation,
  tags: ['autodocs'],
  args: {
    method: 'home-delivery',
    deliveryAddress: homeAddress,
    selectedDate: '2026-06-09',
    selectedSlot: slot,
    substitution: 'allow',
    editableUntil: '2026-06-09T07:00:00.000Z',
    onConfirm: () => {},
    onEdit: () => {},
  },
} satisfies Meta<typeof DeliveryConfirmation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HomeDelivery: Story = {
  name: 'Home delivery',
}

export const ClickCollect: Story = {
  name: 'Click & Collect',
  args: {
    method: 'click-collect',
    deliveryAddress: undefined,
    branch,
  },
}

export const WithRedemption: Story = {
  name: 'With points redeemed',
  args: {
    rewards,
    redeemPoints: true,
  },
}

export const WithRecurringHook: Story = {
  name: 'With recurring CTA',
  args: {
    rewards,
    onSetupRecurring: () => {},
  },
}
