import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PaymentConfirmSheet } from './PaymentConfirmSheet'

import { PAYMENT_LOGOS } from '../../primitives/payment-logos/logos'

const LOGOS = {
  mastercard: PAYMENT_LOGOS['cards/mastercard.svg'],
  applePay:   PAYMENT_LOGOS['wallets/apple-pay.svg'],
  googlePay:  PAYMENT_LOGOS['wallets/google-pay.svg'],
  paypal:     PAYMENT_LOGOS['apm/paypal.svg'],
  alipay:     PAYMENT_LOGOS['apm/alipay.svg'],
}

export const COMMON_NETWORKS = [
  { src: LOGOS.mastercard, alt: 'Mastercard' },
  { src: LOGOS.applePay, alt: 'Apple Pay' },
  { src: LOGOS.googlePay, alt: 'Google Pay' },
  { src: LOGOS.paypal, alt: 'PayPal' },
  { src: LOGOS.alipay, alt: 'Alipay' },
]

const wrapper = (Story: React.ComponentType) => (
  <div className="w-[360px] md:w-[400px] border border-border rounded-[calc(var(--radius)+4px)] bg-card shadow-[var(--shadow-elevated)] overflow-hidden">
    <Story />
  </div>
)

const meta = {
  title: 'Components/PaymentConfirmSheet',
  component: PaymentConfirmSheet,
  tags: ['autodocs'],
  // Shared fixture — not a story.
  excludeStories: ['COMMON_NETWORKS'],
  parameters: { layout: 'centered' },
  decorators: [wrapper],
  args: {
    total: 3000,
    currency: 'USD',
    paymentMethod: { type: 'apple-pay', label: 'Apple Pay' },
    loading: false,
    onConfirm: () => {},
  },
} satisfies Meta<typeof PaymentConfirmSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// ---------------------------------------------------------------------------
// Apple Pay
// ---------------------------------------------------------------------------

export const ApplePay: Story = {
  name: 'Apple Pay — idle',
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

export const ApplePayWithDescription: Story = {
  name: 'Apple Pay — with description',
  args: {
    description: 'Summer Photography Package',
    acceptedNetworks: COMMON_NETWORKS,
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

export const ApplePayWaiting: Story = {
  name: 'Apple Pay — waiting for side button',
  args: {
    paymentMethod: { type: 'apple-pay', label: 'Apple Pay' },
    loading: true,
  },
}

// ---------------------------------------------------------------------------
// Google Pay
// ---------------------------------------------------------------------------

export const GooglePay: Story = {
  name: 'Google Pay',
  args: {
    paymentMethod: { type: 'google-pay', label: 'Google Pay' },
    description: 'Order #28401',
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

export const GooglePayLoading: Story = {
  name: 'Google Pay — processing',
  args: {
    paymentMethod: { type: 'google-pay', label: 'Google Pay' },
    loading: true,
  },
}

// ---------------------------------------------------------------------------
// Card payments
// ---------------------------------------------------------------------------

export const MastercardCard: Story = {
  name: 'Mastercard',
  args: {
    paymentMethod: {
      type: 'card',
      label: 'Mastercard •••• 5555',
      networkLogoSrc: LOGOS.mastercard,
    },
    description: 'Annual membership',
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

export const CardProcessing: Story = {
  name: 'Card — processing',
  args: {
    paymentMethod: {
      type: 'card',
      label: 'Mastercard •••• 5555',
      networkLogoSrc: LOGOS.mastercard,
    },
    loading: true,
  },
}

// ---------------------------------------------------------------------------
// With accepted networks
// ---------------------------------------------------------------------------

export const WithAcceptedNetworks: Story = {
  name: 'With accepted networks strip',
  args: {
    paymentMethod: {
      type: 'card',
      label: 'Mastercard •••• 5555',
      networkLogoSrc: LOGOS.mastercard,
    },
    description: 'Checkout',
    acceptedNetworks: COMMON_NETWORKS,
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

// ---------------------------------------------------------------------------
// Summary rows — cross-industry
// ---------------------------------------------------------------------------

export const FlightSummary: Story = {
  name: 'Flight — with summary rows',
  args: {
    paymentMethod: {
      type: 'card',
      label: 'Mastercard •••• 5555',
      networkLogoSrc: LOGOS.mastercard,
    },
    total: 68000,
    currency: 'USD',
    description: 'London → New York',
    summaryRows: [
      { label: 'Route', value: 'LHR → JFK' },
      { label: 'Date', value: '12 Jun 2026 · 09:45' },
      { label: 'Passengers', value: '2 adults' },
      { label: 'Class', value: 'Economy' },
    ],
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

export const InsuranceSummary: Story = {
  name: 'Insurance — with summary rows',
  args: {
    paymentMethod: {
      type: 'card',
      label: 'Mastercard •••• 5555',
      networkLogoSrc: LOGOS.mastercard,
    },
    total: 24900,
    currency: 'CHF',
    summaryRows: [
      { label: 'Policy', value: 'Comprehensive Travel' },
      { label: 'Coverage', value: '12 months' },
      { label: 'Starts', value: '15 Jun 2026' },
    ],
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

export const SupermarketSummary: Story = {
  name: 'Supermarket — with summary rows',
  args: {
    paymentMethod: { type: 'apple-pay', label: 'Apple Pay' },
    total: 5490,
    currency: 'CHF',
    summaryRows: [
      { label: 'Items', value: '6 items' },
      { label: 'Delivery', value: 'Tue 10 Jun, 2–4 pm' },
      { label: 'Discount', value: '−CHF 8.00' },
    ],
  },
  render: (args) => {
    const [loading, setLoading] = useState(false)
    return (
      <PaymentConfirmSheet
        {...args}
        loading={loading}
        onConfirm={() => setLoading(true)}
        onChangeMethod={() => {}}
      />
    )
  },
}

// ---------------------------------------------------------------------------
// All states overview
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  name: 'All states',
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-6 w-[360px] py-4">
      {[
        {
          label: 'Apple Pay — idle',
          props: {
            paymentMethod: { type: 'apple-pay' as const, label: 'Apple Pay' },
            description: 'Summer Package',
          },
        },
        {
          label: 'Apple Pay — waiting for side button',
          props: {
            paymentMethod: { type: 'apple-pay' as const, label: 'Apple Pay' },
            loading: true,
          },
        },
        {
          label: 'Google Pay — idle',
          props: {
            paymentMethod: { type: 'google-pay' as const, label: 'Google Pay' },
          },
        },
        {
          label: 'Mastercard — idle',
          props: {
            paymentMethod: {
              type: 'card' as const,
              label: 'Mastercard •••• 5555',
              networkLogoSrc: LOGOS.mastercard,
            },
          },
        },
        {
          label: 'Mastercard — processing',
          props: {
            paymentMethod: {
              type: 'card' as const,
              label: 'Mastercard •••• 5555',
              networkLogoSrc: LOGOS.mastercard,
            },
            loading: true,
          },
        },
        {
          label: 'With accepted networks',
          props: {
            paymentMethod: {
              type: 'card' as const,
              label: 'Mastercard •••• 5555',
              networkLogoSrc: LOGOS.mastercard,
            },
            description: 'Order total',
            acceptedNetworks: COMMON_NETWORKS,
          },
        },
      ].map(({ label, props }) => (
        <div key={label}>
          <p className="text-xs text-muted-foreground mb-2 px-1">{label}</p>
          <div className="border border-border rounded-[calc(var(--radius)+4px)] bg-card shadow-[var(--shadow-elevated)] overflow-hidden">
            <PaymentConfirmSheet
              total={3000}
              currency="USD"
              onConfirm={() => {}}
              onChangeMethod={() => {}}
              {...props}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}
