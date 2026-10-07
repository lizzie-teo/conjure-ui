import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StepList } from './StepList'

const PURCHASE_STEPS = [
  { title: 'Choose a plan', description: 'Pick the option that suits you and check out.' },
  { title: 'Get your confirmation', description: 'Your receipt and booking details arrive by email.' },
  { title: 'Use it when you’re ready', description: 'Show the code in-store, or enter it when you check out online.' },
]

const REDEEM_STEPS = [
  { title: 'Copy the code, or show the QR code at the counter' },
  { title: 'Enjoy your visit' },
]

const meta = {
  title: 'Primitives/StepList',
  component: StepList,
  tags: ['autodocs'],
  args: { steps: PURCHASE_STEPS },
} satisfies Meta<typeof StepList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TitlesOnly: Story = {
  name: 'Titles only',
  args: { steps: REDEEM_STEPS },
}
