import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Pencil, X } from 'lucide-react'
import { PriceCalendar, type PriceCalendarDay, type PriceCalendarRange } from './PriceCalendar'
import { CurrencyAmount } from '@/components/primitives/CurrencyAmount/CurrencyAmount'
import { SegmentedControl } from '@/components/primitives/SegmentedControl/SegmentedControl'
import { Button } from '@/components/ui/button'

// May 2026: $242 a night, $258 on the 1st, a booking on the 21st–24th, owner-blocked 11th–12th
const MAY: Record<string, PriceCalendarDay> = Object.fromEntries(
  Array.from({ length: 31 }, (_, i) => {
    const d = i + 1
    const iso = `2026-05-${String(d).padStart(2, '0')}`
    const status = d >= 21 && d <= 24 ? 'booked' : d === 11 || d === 12 ? 'blocked' : undefined
    return [iso, { price: d === 1 ? 258 : 242, status } as PriceCalendarDay]
  })
)

const meta = {
  title: 'Components/PriceCalendar',
  component: PriceCalendar,
  tags: ['autodocs'],
  args: {
    month: '2026-05',
    days: MAY,
    currency: 'AUD',
    locale: 'en-AU',
    weekStartsOn: 0,
    today: '2026-05-02',
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof PriceCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // First night, then last night: a four-night range
    await userEvent.click(canvas.getByRole('button', { name: /^Sunday 3 May/ }))
    await userEvent.click(canvas.getByRole('button', { name: /^Wednesday 6 May/ }))
    await expect(canvas.getByText('4 nights selected')).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: /^Monday 4 May/ }).parentElement).toHaveAttribute('aria-selected', 'true')

    // Past and booked days cannot be picked
    await expect(canvas.getByRole('button', { name: /^Friday 1 May/ })).toHaveAttribute('aria-disabled', 'true')
    await expect(canvas.getByRole('button', { name: /^Thursday 21 May, Booked/ })).toHaveAttribute('aria-disabled', 'true')

    // A stay can't run through a booking: picking across one starts again
    await userEvent.click(canvas.getByRole('button', { name: /^Wednesday 20 May/ }))
    await userEvent.click(canvas.getByRole('button', { name: /^Wednesday 27 May/ }))
    await expect(canvas.getByRole('button', { name: /^Wednesday 20 May/ }).parentElement).toHaveAttribute('aria-selected', 'false')

    // Arrow keys move by day and week
    canvas.getByRole('button', { name: /^Wednesday 27 May/ }).focus()
    await userEvent.keyboard('{ArrowUp}')
    await expect(canvas.getByRole('button', { name: /^Wednesday 20 May/ })).toHaveFocus()
  },
}

export const MondayStart: Story = {
  name: 'Week starts Monday',
  args: { weekStartsOn: 1, defaultRange: { start: '2026-05-14', end: '2026-05-18' } },
}

export const HostView: Story = {
  name: 'Host view with editing panel',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="mx-auto max-w-md bg-card"><Story /></div>],
  render: function Render(args) {
    const [range, setRange] = useState<PriceCalendarRange>({ start: '2026-05-03', end: '2026-05-06' })
    const [mode, setMode] = useState('open')
    const nights = range.start && range.end ? (Number(range.end.slice(8)) - Number(range.start.slice(8)) + 1) : 0
    return (
      <div className="flex min-h-[46rem] flex-col">
        <header className="relative flex items-center justify-center border-b border-border px-3 py-2">
          <Button variant="ghost" aria-label="Close" className="absolute left-2 size-10 pointer-coarse:size-11 rounded-full p-0">
            <X className="size-5" />
          </Button>
          <p className="text-sm font-semibold text-foreground">
            {nights > 0 ? `${nights} nights selected` : 'Select nights'}
          </p>
        </header>
        <PriceCalendar {...args} range={range} onRangeChange={setRange} className="flex-1 px-3 pt-4" />
        <section
          aria-label="Edit selected nights"
          className="sticky bottom-0 flex flex-col items-center gap-4 rounded-t-3xl border-t border-border bg-card px-6 pt-3 pb-8 shadow-[var(--shadow-elevated)]"
        >
          <span aria-hidden="true" className="h-1 w-10 rounded-full bg-border" />
          <SegmentedControl
            aria-label="Availability"
            value={mode}
            onValueChange={setMode}
            options={[
              { value: 'open', label: 'Open' },
              { value: 'block', label: 'Block nights' },
            ]}
          />
          <div className="flex items-center gap-2">
            <CurrencyAmount value={242} currency="AUD" locale="en-AU" size="xl" className="font-semibold" />
            <Button variant="ghost" aria-label="Edit nightly price" className="size-10 pointer-coarse:size-11 rounded-full p-0">
              <Pencil className="size-4" />
            </Button>
          </div>
          <p className="-mt-2 text-sm text-muted-foreground">per night</p>
        </section>
      </div>
    )
  },
}
