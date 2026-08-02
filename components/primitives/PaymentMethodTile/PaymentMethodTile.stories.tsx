import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { PaymentMethodTile } from './PaymentMethodTile'
import { PAYMENT_LOGOS } from '../payment-logos/logos'

const meta = {
  title: 'Primitives/PaymentMethodTile',
  component: PaymentMethodTile,
  tags: ['autodocs'],
  args: {
    type: 'card',
    label: '•••• 4242',
    selected: false,
  },
} satisfies Meta<typeof PaymentMethodTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Card: Story = {
  args: { type: 'card', label: '•••• 4242' },
}

export const ApplePay: Story = {
  args: { type: 'apple-pay', label: 'Apple Pay' },
}

export const GooglePay: Story = {
  args: { type: 'google-pay', label: 'Google Pay' },
}

export const Bank: Story = {
  args: { type: 'bank', label: 'ANZ Savings •••• 8810' },
}

export const Selected: Story = {
  args: { type: 'apple-pay', label: 'Apple Pay', selected: true },
}

export const Interactive: Story = {
  name: 'Interactive (selection group)',
  render: () => {
    const [selected, setSelected] = useState<string>('apple-pay')
    const methods = [
      { type: 'apple-pay' as const, label: 'Apple Pay' },
      { type: 'card' as const, label: '•••• 4242' },
      { type: 'google-pay' as const, label: 'Google Pay' },
    ]
    return (
      <div className="flex flex-col gap-2 max-w-sm">
        {methods.map((m) => (
          <PaymentMethodTile
            key={m.type}
            type={m.type}
            label={m.label}
            selected={selected === m.type}
            onClick={() => setSelected(m.type)}
          />
        ))}
      </div>
    )
  },
}

export const AllTypes: Story = {
  name: 'All types',
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <PaymentMethodTile type="card" label="•••• 4242" />
      <PaymentMethodTile type="apple-pay" label="Apple Pay" selected />
      <PaymentMethodTile type="google-pay" label="Google Pay" />
      <PaymentMethodTile type="bank" label="ANZ Savings •••• 8810" />
    </div>
  ),
}

export const WithNetworkLogos: Story = {
  name: 'Card — with network logo',
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <PaymentMethodTile
        type="card"
        label="Mastercard •••• 5555"
        networkLogoSrc={PAYMENT_LOGOS['cards/mastercard.svg']}
        selected
      />
      <PaymentMethodTile
        type="card"
        label="•••• 4242"
      />
    </div>
  ),
}
