'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { QuickReplies } from './QuickReplies'

const meta = {
  title: 'Components/QuickReplies',
  component: QuickReplies,
  tags: ['autodocs'],
  args: {
    options: ['Book flight', 'Change date', 'Cancel booking', 'Add baggage'],
    onSelect: () => {},
  },
} satisfies Meta<typeof QuickReplies>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCallback: Story = {
  name: 'With selection feedback',
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)
    return (
      <div className="flex flex-col gap-3">
        <QuickReplies
          options={['Book flight', 'Change date', 'Cancel booking', 'Add baggage', 'Seat upgrade']}
          onSelect={setSelected}
        />
        {selected && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong className="text-foreground">{selected}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const Pharmacy: Story = {
  name: 'Pharmacy context',
  args: {
    options: ['Refill prescription', 'Check interactions', 'Generic alternatives', 'Dosage info'],
  },
}

export const ManyOptions: Story = {
  name: 'Many options (scrollable)',
  args: {
    options: ['Economy', 'Premium economy', 'Business', 'First class', 'Any class', 'Points only'],
  },
}
