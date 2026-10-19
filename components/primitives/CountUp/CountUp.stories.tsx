import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor } from 'storybook/test'
import { CountUp } from './CountUp'
import { Button } from '../../ui/button'

const meta = {
  title: 'Primitives/CountUp',
  component: CountUp,
  tags: ['autodocs'],
  args: {
    value: 1284.5,
    locale: 'en-AU',
    format: { style: 'currency', currency: 'AUD' },
    className: 'text-3xl @md:text-4xl font-semibold text-foreground',
  },
} satisfies Meta<typeof CountUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    // Screen-reader copy is the final figure from the start; the visible one lands on it.
    await expect(canvas.getByText('$1,284.50', { selector: '.sr-only' })).toBeInTheDocument()
    await waitFor(() => expect(canvas.getAllByText('$1,284.50')).toHaveLength(2), { timeout: 2000 })
  },
}

export const Percent: Story = {
  args: {
    value: 0.82,
    format: { style: 'percent' },
  },
}

export const Plain: Story = {
  name: 'Plain number',
  args: { value: 12480, format: undefined },
}

function ChangingValue() {
  const [value, setValue] = useState(240)
  return (
    <div className="flex flex-col items-start gap-3">
      <CountUp
        value={value}
        locale="en-AU"
        format={{ style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }}
        className="text-3xl font-semibold text-foreground"
      />
      <Button variant="outline" size="sm" onClick={() => setValue((v) => v + 85)}>
        Add item ($85)
      </Button>
    </div>
  )
}

export const AnimatesFromCurrent: Story = {
  name: 'Animates from the current figure',
  render: () => <ChangingValue />,
}
