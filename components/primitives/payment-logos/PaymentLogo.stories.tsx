'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { PaymentLogo } from './PaymentLogo'
import type { PaymentLogoProps } from './PaymentLogo'
import { PAYMENT_LOGOS } from './logos'

export const LOGOS: { key: keyof typeof PAYMENT_LOGOS; label: string }[] = [
  { key: 'wallets/apple-pay.svg',   label: 'Apple Pay'  },
  { key: 'wallets/google-pay.svg',  label: 'Google Pay' },
  { key: 'cards/mastercard.svg',    label: 'Mastercard' },
  { key: 'apm/paypal.svg',          label: 'PayPal'     },
  { key: 'apm/alipay.svg',          label: 'Alipay'     },
]

export function LogoGrid({ size }: { size?: PaymentLogoProps['size'] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {LOGOS.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-3 md:p-4"
        >
          <PaymentLogo src={PAYMENT_LOGOS[key]} alt={label} size={size} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Primitives/PaymentLogo',
  component: PaymentLogo,
  tags: ['autodocs'],
  // Shared fixtures and render helpers — not stories.
  excludeStories: ['LOGOS', 'LogoGrid'],
  args: {
    src: PAYMENT_LOGOS['cards/mastercard.svg'],
    alt: 'Mastercard',
    size: 'md',
  },
} satisfies Meta<typeof PaymentLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex items-center gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-3">
            <PaymentLogo src={PAYMENT_LOGOS['cards/mastercard.svg']} alt="Mastercard" size={size} />
          </div>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllLogos: Story = {
  name: 'All Logos',
  render: () => <LogoGrid />,
}
