import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ActionStrip } from './ActionStrip'

const meta = {
  title: 'Components/ActionStrip',
  component: ActionStrip,
  tags: ['autodocs'],
} satisfies Meta<typeof ActionStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ActionStrip>
      <ActionStrip.Primary onClick={() => {}}>Book now</ActionStrip.Primary>
      <ActionStrip.Secondary onClick={() => {}}>View details</ActionStrip.Secondary>
    </ActionStrip>
  ),
}

export const PrimaryOnly: Story = {
  name: 'Primary only',
  render: () => (
    <ActionStrip>
      <ActionStrip.Primary onClick={() => {}}>Book now</ActionStrip.Primary>
    </ActionStrip>
  ),
}

export const PrimaryAndSecondary: Story = {
  name: 'Primary + secondary',
  render: () => (
    <ActionStrip>
      <ActionStrip.Primary onClick={() => {}}>Book now</ActionStrip.Primary>
      <ActionStrip.Secondary onClick={() => {}}>View details</ActionStrip.Secondary>
    </ActionStrip>
  ),
}

export const ThreeCTAs: Story = {
  name: 'Three CTAs',
  render: () => (
    <ActionStrip>
      <ActionStrip.Primary onClick={() => {}}>Select plan</ActionStrip.Primary>
      <ActionStrip.Secondary onClick={() => {}}>Compare</ActionStrip.Secondary>
      <ActionStrip.Secondary onClick={() => {}}>Get quote</ActionStrip.Secondary>
    </ActionStrip>
  ),
}

export const Disabled: Story = {
  name: 'Disabled state',
  render: () => (
    <ActionStrip>
      <ActionStrip.Primary disabled>Sold out</ActionStrip.Primary>
      <ActionStrip.Secondary onClick={() => {}}>View alternatives</ActionStrip.Secondary>
    </ActionStrip>
  ),
}
