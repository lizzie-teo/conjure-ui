import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { CheckoutBar, type CheckoutBarProps } from './CheckoutBar'
import { PriceDisplay } from '@/components/primitives/PriceDisplay/PriceDisplay'

type CheckoutBarStoryArgs = CheckoutBarProps & { amount: number; unit: string; actionLabel: string; onAction: () => void }

const meta = {
  title: 'Layouts/CheckoutBar',
  component: CheckoutBar,
  tags: ['autodocs'],
  args: { amount: 50, unit: 'guest', actionLabel: 'Reserve', onAction: fn() },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="flex h-72 flex-col justify-end bg-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CheckoutBarStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <CheckoutBar>
      <CheckoutBar.Summary>
        <PriceDisplay amount={args.amount} currency="AUD" locale="en-AU" prefix="From" unit={args.unit} />
      </CheckoutBar.Summary>
      <CheckoutBar.Action onClick={args.onAction}>{args.actionLabel}</CheckoutBar.Action>
    </CheckoutBar>
  ),
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Reserve' }))
    await expect(args.onAction).toHaveBeenCalledOnce()
  },
}

export const WithDates: Story = {
  name: 'With dates',
  render: (args) => (
    <CheckoutBar>
      <CheckoutBar.Summary>
        <PriceDisplay amount={420} currency="AUD" locale="en-AU" unit="2 nights" />
        <span className="truncate text-xs @md:text-sm text-muted-foreground underline underline-offset-2">18 – 20 May</span>
      </CheckoutBar.Summary>
      <CheckoutBar.Action onClick={args.onAction}>Reserve</CheckoutBar.Action>
    </CheckoutBar>
  ),
}
