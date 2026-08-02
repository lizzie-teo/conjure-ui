import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ApplePayButton } from './ApplePayButton'

const wrapper = (Story: React.ComponentType) => (
  <div className="w-[360px] p-4 bg-card border border-border rounded-xl">
    <Story />
  </div>
)

const meta = {
  title: 'Primitives/ApplePayButton',
  component: ApplePayButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [wrapper],
  args: { label: 'Pay with', onClick: () => {} },
} satisfies Meta<typeof ApplePayButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PayWith: Story = {
  name: 'Pay with  Pay',
  args: { label: 'Pay with', onClick: () => {} },
}

export const BuyWith: Story = {
  name: 'Buy with  Pay',
  args: { label: 'Buy with', onClick: () => {} },
}

export const BookWith: Story = {
  name: 'Book with  Pay',
  args: { label: 'Book with', onClick: () => {} },
}

export const MarkOnly: Story = {
  name: ' Pay (mark only)',
  args: { label: '', onClick: () => {} },
}

export const Disabled: Story = {
  args: { label: 'Pay with', disabled: true },
}

export const AllVariants: Story = {
  name: 'All label variants',
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-3 w-[360px] p-4">
      {['Pay with', 'Buy with', 'Book with', 'Subscribe with', 'Donate with', 'Check out with', ''].map((label) => (
        <ApplePayButton key={label || 'mark-only'} label={label} onClick={() => {}} />
      ))}
    </div>
  ),
}
