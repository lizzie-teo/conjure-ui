import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RotateCcw } from 'lucide-react'
import { Reveal } from './Reveal'
import { Button } from '../../ui/button'
import { revealPresetNames } from '../../../lib/motion'

const meta = {
  title: 'Primitives/Reveal',
  component: Reveal,
  tags: ['autodocs'],
  args: { preset: 'fade-up' },
  argTypes: {
    preset: { control: 'select', options: [...revealPresetNames] },
  },
} satisfies Meta<typeof Reveal>

export default meta
type Story = StoryObj<typeof meta>

function SampleCard({ label }: { label: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-border bg-card p-4 @md:p-6 text-card-foreground">
      <p className="text-sm @md:text-base font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">Your order is on its way.</p>
    </div>
  )
}

/** Remounts its child on click so an entrance can be watched again. */
function Replayable({ children }: { children: (key: number) => React.ReactNode }) {
  const [run, setRun] = useState(0)
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      {children(run)}
      <Button variant="outline" size="sm" className="self-start" onClick={() => setRun((n) => n + 1)}>
        <RotateCcw aria-hidden /> Replay
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <Replayable>
      {(key) => (
        <Reveal key={key} {...args}>
          <SampleCard label={args.preset ?? 'fade-up'} />
        </Reveal>
      )}
    </Replayable>
  ),
}

export const ScaleIn: Story = {
  name: 'Scale in',
  args: { preset: 'scale-in' },
  render: Default.render,
}

export const SlideFromBottom: Story = {
  name: 'Slide from bottom',
  args: { preset: 'slide-from-bottom' },
  render: (args) => (
    <Replayable>
      {(key) => (
        <div className="overflow-hidden rounded-[var(--radius)]">
          <Reveal key={key} {...args}>
            <SampleCard label="slide-from-bottom" />
          </Reveal>
        </div>
      )}
    </Replayable>
  ),
}

export const HandSequenced: Story = {
  name: 'Hand-sequenced with delay',
  render: () => (
    <Replayable>
      {(key) => (
        <div key={key} className="flex flex-col gap-3">
          <Reveal>
            <SampleCard label="First" />
          </Reveal>
          <Reveal delay={0.08}>
            <SampleCard label="Then this" />
          </Reveal>
        </div>
      )}
    </Replayable>
  ),
}
