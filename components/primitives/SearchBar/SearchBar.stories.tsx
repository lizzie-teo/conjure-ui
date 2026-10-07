import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Primitives/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: { placeholder: 'Search products and places', onVoiceSearch: fn(), onClear: fn() },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox', { name: 'Search products and places' })

    // Empty: the microphone is offered
    await userEvent.click(canvas.getByRole('button', { name: 'Search by voice' }))
    await expect(args.onVoiceSearch).toHaveBeenCalledOnce()

    // Typing swaps it for a clear button
    await userEvent.type(input, 'cinema')
    await expect(canvas.queryByRole('button', { name: 'Search by voice' })).not.toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: 'Clear search' }))
    await expect(input).toHaveValue('')
    await expect(input).toHaveFocus()

    // Escape clears as well
    await userEvent.type(input, 'museum{Escape}')
    await expect(input).toHaveValue('')
    await expect(args.onClear).toHaveBeenCalledTimes(2)
  },
}

export const Controlled: Story = {
  render: function Render(args) {
    const [query, setQuery] = useState('museum')
    return <SearchBar {...args} value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery('')} />
  },
}

export const WithoutVoice: Story = {
  name: 'Without voice',
  args: { onVoiceSearch: undefined },
}
