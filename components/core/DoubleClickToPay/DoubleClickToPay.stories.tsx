import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DoubleClickToPay } from './DoubleClickToPay'

const meta = {
  title: 'Components/DoubleClickToPay',
  component: DoubleClickToPay,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DoubleClickToPay>

export default meta
type Story = StoryObj<typeof meta>

// Interactive story — click the prompt to see the Face ID animation play
export const Default: Story = {
  name: 'Interactive (click to activate)',
  render: () => {
    const [activated, setActivated] = useState(false)

    return (
      <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-6 p-8">
        <DoubleClickToPay
          onActivate={() => setActivated(true)}
        />
        {activated && (
          <p className="text-white/60 text-sm">onActivate fired — payment confirmed</p>
        )}
      </div>
    )
  },
}

// Right-aligned in a sheet footer context
export const SheetFooter: Story = {
  name: 'In payment sheet footer',
  render: () => (
    <div className="min-h-screen bg-zinc-900 flex items-end justify-center p-0">
      <div className="w-full max-w-sm bg-zinc-800/90 backdrop-blur rounded-t-3xl px-4 pt-4 pb-8 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-white/60 text-xs">Pay Acme Store</span>
          <span className="text-white text-3xl font-semibold">$49.99</span>
        </div>
        <DoubleClickToPay />
      </div>
    </div>
  ),
}

export const Mobile: Story = {
  name: 'Mobile viewport',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-end p-4">
      <DoubleClickToPay />
    </div>
  ),
}
