import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RotateCcw } from 'lucide-react'
import { expect } from 'storybook/test'
import { Stagger } from './Stagger'
import { Button } from '../../ui/button'

const meta = {
  title: 'Primitives/Stagger',
  component: Stagger,
  tags: ['autodocs'],
} satisfies Meta<typeof Stagger>

export default meta
type Story = StoryObj<typeof meta>

const results = ['Paracetamol 500mg', 'Ibuprofen 200mg', 'Cold & flu day/night', 'Throat lozenges']

function StaggerDemo(args: React.ComponentProps<typeof Stagger>) {
  const [run, setRun] = useState(0)
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <Stagger key={run} role="list" className="flex flex-col gap-2" {...args}>
        {results.map((name) => (
          <Stagger.Item
            key={name}
            role="listitem"
            className="rounded-[var(--radius)] border border-border bg-card px-4 py-3 text-sm @md:text-base text-card-foreground"
          >
            {name}
          </Stagger.Item>
        ))}
      </Stagger>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setRun((n) => n + 1)}>
        <RotateCcw aria-hidden /> Replay
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <StaggerDemo {...args} />,
  play: async ({ canvas }) => {
    // Decorative only: every item is in the tree and reachable from the first frame.
    await expect(canvas.getAllByRole('listitem')).toHaveLength(results.length)
  },
}

export const Slower: Story = {
  name: 'Slower interval',
  args: { interval: 0.08 },
  render: (args) => <StaggerDemo {...args} />,
}
