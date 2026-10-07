import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FeatureList } from './FeatureList'

const INCLUDED = [
  '$100 arcade voucher',
  '4 cinema tickets',
  '$50 toy store gift card',
  '12-month dining membership',
]

const meta = {
  title: 'Primitives/FeatureList',
  component: FeatureList,
  tags: ['autodocs'],
  args: { items: INCLUDED },
} satisfies Meta<typeof FeatureList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inverse: Story = {
  name: 'Inverse (on a primary surface)',
  args: { tone: 'inverse' },
  decorators: [(Story) => <div className="rounded-xl bg-primary p-4 md:p-6"><Story /></div>],
}
