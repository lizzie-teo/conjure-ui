import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CompareTable } from './CompareTable'
import type { CompareColumn } from './CompareTable'

const meta = {
  title: 'Core/CompareTable',
  component: CompareTable,
  tags: ['autodocs'],
} satisfies Meta<typeof CompareTable>

export default meta
type Story = StoryObj<typeof meta>

const attributeLabels = {
  material: 'Material',
  fit: 'Fit',
  waterproof: 'Waterproof',
  packable: 'Packable',
  warranty: 'Warranty',
}

const twoProducts: CompareColumn[] = [
  {
    id: 'jacket-a',
    label: 'Trail Jacket Pro',
    image: 'https://picsum.photos/seed/jacket-a/128/128',
    price: 189,
    currency: 'USD',
    attributes: {
      material: '3-layer GORE-TEX',
      fit: 'Athletic',
      waterproof: true,
      packable: true,
      warranty: 'Lifetime',
    },
  },
  {
    id: 'jacket-b',
    label: 'Urban Shell',
    image: 'https://picsum.photos/seed/jacket-b/128/128',
    price: 129,
    currency: 'USD',
    attributes: {
      material: '2-layer nylon',
      fit: 'Regular',
      waterproof: false,
      packable: true,
      warranty: '2 years',
    },
  },
]

const fourProducts: CompareColumn[] = [
  ...twoProducts,
  {
    id: 'jacket-c',
    label: 'Summit Hardshell',
    image: 'https://picsum.photos/seed/jacket-c/128/128',
    price: 299,
    currency: 'USD',
    attributes: {
      material: '3-layer eVent',
      fit: 'Slim',
      waterproof: true,
      packable: false,
      warranty: 'Lifetime',
    },
  },
  {
    id: 'jacket-d',
    label: 'City Rain Coat',
    image: 'https://picsum.photos/seed/jacket-d/128/128',
    price: 89,
    currency: 'USD',
    attributes: {
      material: 'Polyester blend',
      fit: 'Relaxed',
      waterproof: false,
      packable: false,
      warranty: '1 year',
    },
  },
]

export const TwoProducts: Story = {
  name: '2 products',
  args: {
    columns: twoProducts,
    attributeLabels,
  },
}

export const TwoProductsWithCta: Story = {
  name: '2 products with CTA',
  args: {
    columns: twoProducts,
    attributeLabels,
    onSelect: (id) => console.log('Selected:', id),
  },
}

export const FourProducts: Story = {
  name: '4 products',
  args: {
    columns: fourProducts,
    attributeLabels,
    onSelect: (id) => console.log('Selected:', id),
  },
}

export const NoCta: Story = {
  name: 'No CTA',
  args: {
    columns: twoProducts,
    attributeLabels,
    onSelect: undefined,
  },
}
