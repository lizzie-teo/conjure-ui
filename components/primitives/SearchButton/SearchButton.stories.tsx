import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { SearchButton } from './SearchButton'

const meta = {
  title: 'Primitives/SearchButton',
  component: SearchButton,
  tags: ['autodocs'],
  args: { label: 'Start your search', onClick: fn() },
  decorators: [(Story) => <div className="max-w-sm p-2"><Story /></div>],
} satisfies Meta<typeof SearchButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Start your search' }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const CustomLabel: Story = {
  name: 'Custom label',
  args: { label: 'Search offers near you' },
}
