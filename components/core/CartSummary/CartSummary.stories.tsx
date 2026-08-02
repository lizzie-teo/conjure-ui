import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { CartSummary } from './CartSummary'

const meta = {
  title: 'Components/CartSummary',
  component: CartSummary,
  tags: ['autodocs'],
  args: {
    items: [
      { name: 'Premium Leather Watch', price: 299, quantity: 1 },
      { name: 'Classic Sneakers', price: 120, quantity: 2 },
    ],
    currency: 'USD',
    onCheckout: () => {},
  },
} satisfies Meta<typeof CartSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const SAMPLE_ITEMS = [
  { name: 'Premium Leather Watch', price: 299, quantity: 1 },
  { name: 'Classic Sneakers', price: 120, quantity: 2 },
]

export const NoPromo: Story = {
  name: 'No promo',
  render: () => (
    <div className="max-w-xs">
      <CartSummary
        items={SAMPLE_ITEMS}
        currency="USD"
        onCheckout={() => alert('Proceeding to review…')}
      />
    </div>
  ),
}

export const WithPromoApplied: Story = {
  name: 'With promo code applied',
  render: () => {
    function Demo() {
      const [promoCode, setPromoCode] = useState<string | undefined>(undefined)
      const [discount, setDiscount] = useState<number | undefined>(undefined)

      function handlePromoApply(code: string) {
        setPromoCode(code)
        setDiscount(53.9)
      }

      return (
        <div className="max-w-xs">
          <CartSummary
            items={SAMPLE_ITEMS}
            currency="USD"
            promoCode={promoCode}
            discount={discount}
            onPromoApply={handlePromoApply}
            onCheckout={() => alert('Proceeding to review…')}
          />
        </div>
      )
    }
    return <Demo />
  },
}

export const ZeroItems: Story = {
  name: 'Empty cart',
  render: () => (
    <div className="max-w-xs">
      <CartSummary
        items={[]}
        currency="USD"
        onCheckout={() => {}}
      />
    </div>
  ),
}

export const MultipleItems: Story = {
  name: 'Multiple items',
  render: () => (
    <div className="max-w-xs">
      <CartSummary
        items={[
          { name: 'Premium Leather Watch', price: 299, quantity: 1 },
          { name: 'Classic Sneakers', price: 120, quantity: 2 },
          { name: 'Canvas Tote Bag', price: 35, quantity: 1 },
          { name: 'Silk Scarf', price: 89, quantity: 1 },
        ]}
        currency="USD"
        discount={50}
        promoCode="SAVE50"
        onCheckout={() => alert('Proceeding to review…')}
      />
    </div>
  ),
}

export const SubComponents: Story = {
  name: 'Sub-components (LineItem · PromoField · Total)',
  render: () => (
    <div className="max-w-xs space-y-4">
      <div className="bg-card border border-border rounded-xl shadow-[var(--shadow-card)] px-4 md:px-5 py-3 md:py-4">
        <CartSummary.LineItem name="Premium Leather Watch" quantity={1} price={299} currency="USD" />
        <CartSummary.LineItem name="Classic Sneakers" quantity={2} price={120} currency="USD" />
      </div>
      <CartSummary.Total subtotal={539} discount={50} total={489} currency="USD" />
      <CartSummary.PromoField onApply={(c) => alert(`Applied: ${c}`)} appliedCode="SAVE50" />
    </div>
  ),
}
