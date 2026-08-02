import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Button } from '../../ui/button'
import { ApplePaySheet } from './ApplePaySheet'
import { CreditCardGold, CreditCardSilver, CreditCardBronze } from '../../primitives/Apple-objects/CreditCardIcons'

const DEFAULTS = {
  merchantName: 'Acme Store',
  total: 3000,
  currency: 'USD',
  paymentCard: {
    name: 'Credit Card',
    lastFour: '1234',
    billingAddress: '27 Fredrick Butte Rd, Manly NSW 2095, Australia',
  },
  contact: {
    email: 'kate.williams@gmail.com',
    phone: '+61 431 223 987',
  },
  shippingAddress: {
    recipientName: 'Kate Williams',
    line1: '27 Fredrick Butte Rd',
    line2: 'Manly NSW 2095',
    country: 'Australia',
  },
}

const meta = {
  title: 'Components/ApplePaySheet',
  component: ApplePaySheet,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    ...DEFAULTS,
    open: true,
    loading: false,
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof ApplePaySheet>

export default meta
type Story = StoryObj<typeof meta>

// Interactive story — shows trigger button + live open/close/confirm flow
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleConfirm() {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setOpen(false)
      }, 2500)
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Button onClick={() => setOpen(true)}>Pay with Apple Pay</Button>
        <ApplePaySheet
          {...args}
          open={open}
          loading={loading}
          onClose={() => setOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    )
  },
}

// Static open — no trigger needed, sheet is always visible
export const Open: Story = {
  name: 'Open (static)',
  args: { open: true },
  render: (args) => (
    <div className="min-h-screen bg-background relative">
      <ApplePaySheet {...args} onClose={() => {}} onConfirm={() => {}} />
    </div>
  ),
}

export const WithChangeHandlers: Story = {
  name: 'With change handlers',
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Button onClick={() => setOpen(true)}>Pay with Apple Pay</Button>
        <ApplePaySheet
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          onChangeCard={() => alert('Change card')}
          onChangeContact={() => alert('Change contact')}
          onChangeShipping={() => alert('Change shipping')}
        />
      </div>
    )
  },
}

export const Confirming: Story = {
  name: 'Confirming (loading)',
  args: { open: true, loading: true },
  render: (args) => (
    <div className="min-h-screen bg-background relative">
      <ApplePaySheet {...args} onClose={() => {}} onConfirm={() => {}} />
    </div>
  ),
}

export const GoldCard: Story = {
  name: 'Card icon — Gold',
  args: { open: true, cardIcon: <CreditCardGold /> },
  render: (args) => (
    <div className="min-h-screen bg-background relative">
      <ApplePaySheet {...args} onClose={() => {}} onConfirm={() => {}} />
    </div>
  ),
}

export const SilverCard: Story = {
  name: 'Card icon — Silver',
  args: { open: true, cardIcon: <CreditCardSilver /> },
  render: (args) => (
    <div className="min-h-screen bg-background relative">
      <ApplePaySheet {...args} onClose={() => {}} onConfirm={() => {}} />
    </div>
  ),
}

export const BronzeCard: Story = {
  name: 'Card icon — Bronze',
  args: { open: true, cardIcon: <CreditCardBronze /> },
  render: (args) => (
    <div className="min-h-screen bg-background relative">
      <ApplePaySheet {...args} onClose={() => {}} onConfirm={() => {}} />
    </div>
  ),
}

export const LongAddress: Story = {
  name: 'Long address / truncation',
  args: {
    open: true,
    paymentCard: {
      name: 'Apple Card',
      lastFour: '9999',
      billingAddress: '1 Infinite Loop, Cupertino, California 95014, United States of America',
    },
    contact: {
      email: 'very.long.email.address.that.should.truncate@example.com',
      phone: '+1 (800) 275-2273',
    },
    shippingAddress: {
      recipientName: 'Timothy Donald Cook',
      line1: '1 Apple Park Way',
      line2: 'Cupertino, CA 95014',
      country: 'United States',
    },
  },
  render: (args) => (
    <div className="min-h-screen bg-background relative">
      <ApplePaySheet {...args} onClose={() => {}} onConfirm={() => {}} />
    </div>
  ),
}

