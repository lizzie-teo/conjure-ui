import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { YearCalendar } from './YearCalendar'

const range = (month: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${month}-${String(from + i).padStart(2, '0')}`)

const YEAR_2026 = [
  { month: '2026-01', total: 5251, booked: [...range('2026-01', 12, 15), ...range('2026-01', 23, 26)] },
  { month: '2026-02', total: 4743, booked: range('2026-02', 2, 5) },
  { month: '2026-03', total: 3120, booked: range('2026-03', 20, 22) },
  { month: '2026-04', total: 5082, booked: [...range('2026-04', 1, 3), ...range('2026-04', 13, 14)] },
  { month: '2026-05', total: 5251, booked: [...range('2026-05', 3, 6), ...range('2026-05', 21, 24)] },
  { month: '2026-06', total: 2480, booked: range('2026-06', 8, 9) },
  { month: '2026-07', total: 5251, booked: [...range('2026-07', 6, 9), ...range('2026-07', 13, 16)] },
  { month: '2026-08', total: 5251, booked: range('2026-08', 17, 21) },
  { month: '2026-09', total: 1940, booked: [] },
]

const meta = {
  title: 'Components/YearCalendar',
  component: YearCalendar,
  tags: ['autodocs'],
  args: {
    months: YEAR_2026,
    currency: 'AUD',
    locale: 'en-AU',
    weekStartsOn: 0,
    today: '2026-05-02',
    onSelectMonth: fn(),
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof YearCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const may = within(canvasElement).getByRole('button', { name: 'May 2026, $5,251, 8 nights booked' })
    await userEvent.click(may)
    await expect(args.onSelectMonth).toHaveBeenCalledWith('2026-05')
  },
}

export const WithSelection: Story = {
  name: 'With a month open',
  render: function Render(args) {
    const [month, setMonth] = useState('2026-05')
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-lg @md:text-xl font-semibold tracking-tight text-foreground">2026</h2>
        <YearCalendar {...args} selected={month} onSelectMonth={setMonth} />
      </section>
    )
  },
}
