import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AddressCard } from './AddressCard'

const meta = {
  title: 'Primitives/AddressCard',
  component: AddressCard,
  tags: ['autodocs'],
  args: {
    name: 'Jane Smith',
    line1: '42 Sunset Boulevard',
    city: 'Los Angeles',
    state: 'CA',
    postcode: '90028',
    country: 'United States',
  },
} satisfies Meta<typeof AddressCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLine2: Story = {
  name: 'With line 2',
  args: {
    line2: 'Apt 7B',
  },
}

export const WithoutState: Story = {
  name: 'Without state (international)',
  args: {
    name: 'Hiroshi Tanaka',
    line1: '3-1 Marunouchi',
    line2: 'Chiyoda-ku',
    city: 'Tokyo',
    state: undefined,
    postcode: '100-0005',
    country: 'Japan',
  },
}

export const MinimalAddress: Story = {
  name: 'Minimal (no line2, no state)',
  args: {
    name: 'Alex Morgan',
    line1: '10 Downing Street',
    city: 'London',
    state: undefined,
    postcode: 'SW1A 2AA',
    country: 'United Kingdom',
  },
}
