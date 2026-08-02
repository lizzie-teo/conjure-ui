import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeliveryMethodIcon } from './DeliveryMethodIcon'

const meta = {
  title: 'Primitives/DeliveryMethodIcon',
  component: DeliveryMethodIcon,
  tags: ['autodocs'],
  args: { type: 'home-delivery', size: 24 },
} satisfies Meta<typeof DeliveryMethodIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HomeDelivery: Story = {
  args: { type: 'home-delivery', size: 24 },
}

export const ClickCollect: Story = {
  args: { type: 'click-collect', size: 24 },
}

export const Sizes: Story = {
  name: 'All sizes',
  args: { type: 'home-delivery' },
  render: () => (
    <div className="flex items-end gap-6">
      {([16, 24, 32, 48] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <DeliveryMethodIcon type="home-delivery" size={size} />
          <span className="text-xs text-muted-foreground">{size}px</span>
        </div>
      ))}
    </div>
  ),
}
