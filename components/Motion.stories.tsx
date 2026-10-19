import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { Reveal } from './primitives/Reveal/Reveal'
import { Stagger } from './primitives/Stagger/Stagger'
import { CountUp } from './primitives/CountUp/CountUp'
import { duration, ease, spring, stagger, revealPresetNames } from '../lib/motion'

/**
 * Every motion primitive on one screen. Tokens at the top, presets below,
 * then the composed pieces. Hit Replay to watch everything enter again.
 */
const meta = {
  title: 'Foundations/Motion',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function TokenTable() {
  const rows: [string, string][] = [
    ...Object.entries(duration).map(([k, v]): [string, string] => [`duration.${k}`, `${v * 1000}ms`]),
    ...Object.entries(ease).map(([k, v]): [string, string] => [`ease.${k}`, `[${v.join(', ')}]`]),
    ...Object.entries(spring).map(([k, v]): [string, string] => [
      `spring.${k}`,
      `stiffness ${v.stiffness}, damping ${v.damping}`,
    ]),
    ['stagger.children', `${stagger.children * 1000}ms`],
  ]
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
      {rows.map(([name, value]) => (
        <div key={name} className="contents">
          <dt className="font-mono text-foreground">{name}</dt>
          <dd className="font-mono text-muted-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Tile({ label }: { label: string }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-[var(--radius)] border border-border bg-card text-sm font-medium text-card-foreground">
      {label}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Showcase() {
  const [run, setRun] = useState(0)
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-foreground">Motion</h1>
        <Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>
          <RotateCcw aria-hidden /> Replay
        </Button>
      </div>

      <Section title="Tokens — lib/motion.ts">
        <TokenTable />
      </Section>

      <Section title="Reveal presets — <Reveal preset=…>">
        <div key={run} className="grid grid-cols-2 gap-3 @md:grid-cols-4">
          {revealPresetNames.map((name) => (
            <div key={name} className="overflow-hidden rounded-[var(--radius)]">
              <Reveal preset={name}>
                <Tile label={name} />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Stagger — <Stagger><Stagger.Item>">
        <Stagger key={run} className="grid grid-cols-3 gap-3 @md:grid-cols-6">
          {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((n) => (
            <Stagger.Item key={n}>
              <Tile label={n} />
            </Stagger.Item>
          ))}
        </Stagger>
      </Section>

      <Section title="CountUp — <CountUp value=…>">
        <div key={run} className="flex flex-wrap gap-8">
          <CountUp
            value={1284.5}
            locale="en-AU"
            format={{ style: 'currency', currency: 'AUD' }}
            className="text-3xl font-semibold text-foreground"
          />
          <CountUp value={0.82} format={{ style: 'percent' }} className="text-3xl font-semibold text-foreground" />
        </div>
      </Section>

      <Section title="Press — spring.press">
        <p className="text-sm text-muted-foreground">
          Buttons use CSS <code className="font-mono">active:scale-[0.97]</code>; wrappers use{' '}
          <code className="font-mono">whileTap</code> with <code className="font-mono">spring.press</code>.
        </p>
      </Section>
    </div>
  )
}

export const Overview: Story = {
  render: () => <Showcase />,
}
