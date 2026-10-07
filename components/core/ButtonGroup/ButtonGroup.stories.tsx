import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ButtonGroup } from './ButtonGroup'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup.Primary onClick={() => {}}>Book now</ButtonGroup.Primary>
      <ButtonGroup.Secondary onClick={() => {}}>View details</ButtonGroup.Secondary>
    </ButtonGroup>
  ),
}

export const PrimaryOnly: Story = {
  name: 'Primary only',
  render: () => (
    <ButtonGroup>
      <ButtonGroup.Primary onClick={() => {}}>Book now</ButtonGroup.Primary>
    </ButtonGroup>
  ),
}

export const PrimaryAndSecondary: Story = {
  name: 'Primary + secondary',
  render: () => (
    <ButtonGroup>
      <ButtonGroup.Primary onClick={() => {}}>Book now</ButtonGroup.Primary>
      <ButtonGroup.Secondary onClick={() => {}}>View details</ButtonGroup.Secondary>
    </ButtonGroup>
  ),
}

export const ThreeCTAs: Story = {
  name: 'Three CTAs',
  render: () => (
    <ButtonGroup>
      <ButtonGroup.Primary onClick={() => {}}>Select plan</ButtonGroup.Primary>
      <ButtonGroup.Secondary onClick={() => {}}>Compare</ButtonGroup.Secondary>
      <ButtonGroup.Secondary onClick={() => {}}>Get quote</ButtonGroup.Secondary>
    </ButtonGroup>
  ),
}

export const Disabled: Story = {
  name: 'Disabled state',
  render: () => (
    <ButtonGroup>
      <ButtonGroup.Primary disabled>Sold out</ButtonGroup.Primary>
      <ButtonGroup.Secondary onClick={() => {}}>View alternatives</ButtonGroup.Secondary>
    </ButtonGroup>
  ),
}
