import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryMethodStep } from './DeliveryMethodStep'

const address = {
  name: 'Alex Kim',
  line1: '42 George Street',
  city: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  country: 'Australia',
}

const meta = {
  title: 'Components/DeliveryMethodStep',
  component: DeliveryMethodStep,
  tags: ['autodocs'],
  args: {
    onMethodChange: () => {},
    onAddressEdit: () => {},
  },
} satisfies Meta<typeof DeliveryMethodStep>

export default meta
type Story = StoryObj<typeof meta>

export const Unselected: Story = {
  name: 'No selection',
}

export const HomeDeliverySelected: Story = {
  name: 'Home delivery — with address',
  args: {
    value: 'home-delivery',
    homeAddress: address,
  },
}

export const HomeDeliveryNoAddress: Story = {
  name: 'Home delivery — no address',
  args: {
    value: 'home-delivery',
  },
}

export const ClickCollectSelected: Story = {
  name: 'Click & Collect selected',
  args: {
    value: 'click-collect',
  },
}
