import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SignInStatus } from './SignInStatus'

const meta = {
  title: 'Core/SignInStatus',
  component: SignInStatus,
  tags: ['autodocs'],
  args: {
    state: 'success',
    label: 'Identity verified',
    message: "You're all set — proceeding to payment.",
  },
} satisfies Meta<typeof SignInStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = { args: { state: 'success' } }

export const Error: Story = {
  args: {
    state: 'error',
    label: 'Not verified',
    message: "We couldn't verify your identity. Please try again.",
  },
}

export const LabelOnly: Story = {
  name: 'Label only',
  args: { state: 'success', label: 'Identity verified', message: undefined },
}

export const Localised: Story = {
  name: 'Localised copy',
  args: {
    state: 'success',
    label: 'Identité vérifiée',
    message: 'Tout est prêt — passage au paiement.',
  },
}

export const BothStates: Story = {
  name: 'Both states',
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm @md:max-w-md">
      <SignInStatus
        state="success"
        label="Identity verified"
        message="You're all set — proceeding to payment."
      />
      <SignInStatus
        state="error"
        label="Not verified"
        message="We couldn't verify your identity. Please try again."
      />
    </div>
  ),
}
