import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Button } from '@/components/ui/button'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { label: 'Savings this year', value: 120, max: 200, valueText: '$120 of $200' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Percentage: Story = {
  args: { label: 'Profile complete', value: 64, max: 100, valueText: undefined },
}

export const BarOnly: Story = {
  name: 'Bar only',
  args: { hideLabel: true },
}

export const Complete: Story = {
  args: { label: 'Goal reached', value: 4, max: 4, valueText: '4 of 4 vouchers' },
}

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(40)
    return (
      <div className="flex flex-col gap-4">
        <ProgressBar {...args} value={value} max={200} valueText={`$${value} of $200`} />
        <Button
          variant="outline"
          className="h-12 @md:h-10 pointer-coarse:min-h-11"
          onClick={() => setValue((v) => (v >= 200 ? 0 : v + 40))}
        >
          Add $40
        </Button>
      </div>
    )
  },
}

export const ClampsAndReports: Story = {
  name: 'Clamps value and reports it',
  args: { label: 'Overspent', value: 260, max: 200, valueText: undefined },
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar', { name: 'Overspent' })
    await expect(bar).toHaveAttribute('aria-valuenow', '200')
    await expect(bar).toHaveAttribute('aria-valuemax', '200')
    await expect(bar).toHaveAttribute('aria-valuetext', '100%')
  },
}
