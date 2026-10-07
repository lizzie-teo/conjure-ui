import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { FavoriteButton } from './FavoriteButton'

const PHOTO = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop'

const meta = {
  title: 'Primitives/FavoriteButton',
  component: FavoriteButton,
  tags: ['autodocs'],
  args: { itemName: 'Chef’s tasting menu', onPressedChange: fn() },
  decorators: [
    (Story, { args }) =>
      args.appearance === 'surface' ? (
        <Story />
      ) : (
        <div className="relative size-48 overflow-hidden rounded-xl">
          <img src={PHOTO} alt="" className="size-full object-cover" />
          <div className="absolute top-2 right-2"><Story /></div>
        </div>
      ),
  ],
} satisfies Meta<typeof FavoriteButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const heart = within(canvasElement).getByRole('button', { name: 'Save Chef’s tasting menu' })
    await expect(heart).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(heart)
    await expect(heart).toHaveAttribute('aria-pressed', 'true')
    await expect(args.onPressedChange).toHaveBeenCalledWith(true)
  },
}

export const Saved: Story = {
  args: { defaultPressed: true },
}

export const Surface: Story = {
  args: { appearance: 'surface' },
}
