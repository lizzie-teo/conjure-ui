import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BranchSelectStep } from './BranchSelectStep'

const branches = [
  { id: 'b1', name: 'Surry Hills', distanceKm: 0.8, address: '123 Crown St, Surry Hills NSW', availableSlots: 6 },
  { id: 'b2', name: 'Bondi Junction', distanceKm: 3.2, address: '500 Oxford St, Bondi Junction NSW', availableSlots: 2 },
  { id: 'b3', name: 'Newtown', distanceKm: 4.1, address: '280 King St, Newtown NSW', availableSlots: 0 },
]

const meta = {
  title: 'Components/BranchSelectStep',
  component: BranchSelectStep,
  tags: ['autodocs'],
  args: {
    branches,
    onBranchSelect: () => {},
    onCarBootChange: () => {},
  },
} satisfies Meta<typeof BranchSelectStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BranchList: Story = {
  name: 'Branch list — none selected',
}

export const BranchSelected: Story = {
  name: 'Branch selected — car boot form slides in',
  args: {
    selectedBranchId: 'b1',
    carBootDetails: {
      vehicleColour: '',
      vehicleMake: '',
      registrationPlate: '',
      arrivalNotification: true,
    },
  },
}

export const FormFilled: Story = {
  name: 'All fields filled',
  args: {
    selectedBranchId: 'b2',
    carBootDetails: {
      vehicleColour: 'Silver',
      vehicleMake: 'Toyota RAV4',
      registrationPlate: 'ABC 123',
      arrivalNotification: true,
    },
  },
}
