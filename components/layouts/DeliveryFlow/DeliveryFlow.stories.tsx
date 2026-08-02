import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryFlow } from './DeliveryFlow'

const branches = [
  { id: 'b1', name: 'Surry Hills', distanceKm: 0.8, address: '123 Crown St, Surry Hills NSW', availableSlots: 6 },
  { id: 'b2', name: 'Bondi Junction', distanceKm: 3.2, address: '500 Oxford St, Bondi Junction NSW', availableSlots: 2 },
  { id: 'b3', name: 'Newtown', distanceKm: 4.1, address: '280 King St, Newtown NSW', availableSlots: 0 },
]

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

const rewards = {
  programName: 'Everyday Rewards',
  currentPoints: 1200,
  pointsEarned: 150,
  bonusPointsAvailable: 500,
  bonusPrompt: 'Add $5 more to earn 500 bonus points',
  pointsValue: 6.0,
  currency: 'AUD',
}

const homeAddress = {
  name: 'Alex Kim',
  line1: '42 George Street',
  city: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  country: 'Australia',
}

const meta = {
  title: 'Layouts/DeliveryFlow',
  component: DeliveryFlow,
  tags: ['autodocs'],
  args: {
    availableDates,
    timeSlots,
    branches,
    rewards,
    homeAddress,
    editableUntil: '2026-06-09T07:00:00.000Z',
    onComplete: () => {},
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DeliveryFlow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HomeDeliveryFlow: Story = {
  name: 'Home delivery — start',
}

export const ClickCollectFlow: Story = {
  name: 'Click & Collect — start',
  args: {
    initialData: { method: 'click-collect' },
    initialStep: 'branch',
  },
}

export const StepMethod: Story = {
  name: 'Step: Method',
  args: { initialStep: 'method' },
}

export const StepSchedule: Story = {
  name: 'Step: Schedule',
  args: {
    initialStep: 'schedule',
    initialData: { method: 'home-delivery' },
  },
}

export const StepScheduleWithDate: Story = {
  name: 'Step: Schedule — date pre-selected',
  args: {
    initialStep: 'schedule',
    initialData: { method: 'home-delivery', selectedDate: '2026-06-09' },
  },
}

export const StepRewards: Story = {
  name: 'Step: Rewards',
  args: {
    initialStep: 'rewards',
    initialData: {
      method: 'home-delivery',
      selectedDate: '2026-06-09',
      selectedSlotId: 's1',
    },
  },
}

export const StepConfirm: Story = {
  name: 'Step: Confirm',
  args: {
    initialStep: 'confirm',
    initialData: {
      method: 'home-delivery',
      selectedDate: '2026-06-09',
      selectedSlotId: 's1',
    },
  },
}

export const NoRewardsFlow: Story = {
  name: 'Without rewards program',
  args: { rewards: undefined },
}
