import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { IngredientShopList, type ResolvedItem } from './IngredientShopList'

const ITEMS_WITH_SALES = [
  {
    ingredientId: '1',
    ingredientName: 'Spaghetti',
    recommendedProduct: {
      id: 'p1',
      name: 'Barilla Spaghetti 500g',
      brand: 'Barilla',
      imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=112&h=112&fit=crop',
      price: 1.49,
      originalPrice: 2.10,
      currency: 'USD',
      onSale: true,
    },
    alternatives: [
      { id: 'p1', name: 'Barilla Spaghetti 500g', brand: 'Barilla', imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=112&h=112&fit=crop', price: 1.49, originalPrice: 2.10, currency: 'USD', onSale: true },
      { id: 'p2', name: 'De Cecco Spaghetti 500g', brand: 'De Cecco', price: 2.30, currency: 'USD' },
      { id: 'p3', name: 'Store Brand Spaghetti 500g', brand: 'Store Brand', price: 0.99, currency: 'USD' },
    ],
  },
  {
    ingredientId: '2',
    ingredientName: 'Eggs',
    recommendedProduct: {
      id: 'p4',
      name: 'Free Range Eggs 12pk',
      brand: 'Happy Hen',
      imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=112&h=112&fit=crop',
      price: 4.20,
      currency: 'USD',
    },
    alternatives: [
      { id: 'p4', name: 'Free Range Eggs 12pk', brand: 'Happy Hen', imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=112&h=112&fit=crop', price: 4.20, currency: 'USD' },
      { id: 'p5', name: 'Cage Free Eggs 12pk', brand: 'Country Farm', price: 3.80, currency: 'USD' },
    ],
  },
  {
    ingredientId: '3',
    ingredientName: 'Pancetta',
    recommendedProduct: {
      id: 'p6',
      name: 'Primo Pancetta Cubetti 200g',
      brand: 'Primo',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=112&h=112&fit=crop',
      price: 3.80,
      originalPrice: 5.00,
      currency: 'USD',
      onSale: true,
    },
    alternatives: [
      { id: 'p6', name: 'Primo Pancetta Cubetti 200g', brand: 'Primo', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=112&h=112&fit=crop', price: 3.80, originalPrice: 5.00, currency: 'USD', onSale: true },
      { id: 'p7', name: 'Don Smallgoods Pancetta 150g', brand: 'Don', price: 4.50, currency: 'USD' },
    ],
  },
  {
    ingredientId: '4',
    ingredientName: 'Pecorino Romano',
    recommendedProduct: {
      id: 'p8',
      name: 'Locatelli Pecorino Romano 150g',
      brand: 'Locatelli',
      imageUrl: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=112&h=112&fit=crop',
      price: 6.99,
      currency: 'USD',
    },
    alternatives: [
      { id: 'p8', name: 'Locatelli Pecorino Romano 150g', brand: 'Locatelli', imageUrl: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=112&h=112&fit=crop', price: 6.99, currency: 'USD' },
      { id: 'p9', name: 'Store Brand Pecorino 100g', brand: 'Store Brand', price: 3.50, currency: 'USD' },
    ],
  },
]

const ITEMS_NO_SALES = [
  {
    ingredientId: '1',
    ingredientName: 'Ramen noodles',
    recommendedProduct: { id: 'p1', name: 'Hakubaku Ramen Noodles 270g', brand: 'Hakubaku', imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=112&h=112&fit=crop', price: 3.20, currency: 'USD' },
    alternatives: [
      { id: 'p1', name: 'Hakubaku Ramen Noodles 270g', brand: 'Hakubaku', imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=112&h=112&fit=crop', price: 3.20, currency: 'USD' },
      { id: 'p2', name: 'Nissin Ramen Noodles 300g', brand: 'Nissin', price: 2.80, currency: 'USD' },
    ],
  },
  {
    ingredientId: '2',
    ingredientName: 'Soy sauce',
    recommendedProduct: { id: 'p3', name: 'Kikkoman Soy Sauce 150ml', brand: 'Kikkoman', imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=112&h=112&fit=crop', price: 2.50, currency: 'USD' },
    alternatives: [
      { id: 'p3', name: 'Kikkoman Soy Sauce 150ml', brand: 'Kikkoman', imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=112&h=112&fit=crop', price: 2.50, currency: 'USD' },
      { id: 'p4', name: 'Lee Kum Kee Soy Sauce 150ml', brand: 'Lee Kum Kee', price: 2.20, currency: 'USD' },
    ],
  },
  {
    ingredientId: '3',
    ingredientName: 'Sesame oil',
    recommendedProduct: { id: 'p5', name: 'Kadoya Sesame Oil 163ml', brand: 'Kadoya', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=112&h=112&fit=crop', price: 4.80, currency: 'USD' },
  },
]

const meta = {
  title: 'Core/IngredientShopList',
  component: IngredientShopList,
  tags: ['autodocs'],
  args: {
    items: ITEMS_WITH_SALES,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-[340px] md:w-[380px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IngredientShopList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoSales: Story = {
  name: 'No sale items',
  args: { items: ITEMS_NO_SALES },
}

export const Interactive: Story = {
  name: 'Interactive — live cart preview',
  render: args => {
    const [cartPayload, setCartPayload] = useState<ResolvedItem[] | null>(null)

    const total = cartPayload?.reduce((sum, i) => sum + i.selectedProduct.price, 0)

    return (
      <div className="flex flex-col gap-4 w-[340px] md:w-[380px]">
        <IngredientShopList
          {...args}
          onAddToCart={resolved => setCartPayload(resolved)}
        />

        {cartPayload && (
          <div className="bg-muted rounded-xl p-3 md:p-4 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Cart payload
            </p>
            {cartPayload.map(i => (
              <div key={i.ingredientId} className="flex justify-between text-xs md:text-sm text-foreground">
                <span className="text-muted-foreground">{i.ingredientName}</span>
                <span className="font-medium">{i.selectedProduct.name}</span>
              </div>
            ))}
            {total !== undefined && (
              <p className="text-sm font-semibold text-foreground pt-1 border-t border-border">
                Total: {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(total)}
              </p>
            )}
          </div>
        )}
      </div>
    )
  },
}
