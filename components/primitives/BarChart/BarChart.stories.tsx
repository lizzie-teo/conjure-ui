import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { BarChart } from './BarChart'

const SAVINGS_BY_MONTH = [
  { id: '2026-04', label: 'Apr', fullLabel: 'April', value: 42 },
  { id: '2026-05', label: 'May', fullLabel: 'May', value: 88 },
  { id: '2026-06', label: 'Jun', fullLabel: 'June', value: 18 },
  { id: '2026-07', label: 'Jul', fullLabel: 'July', value: 65 },
  { id: '2026-08', label: 'Aug', fullLabel: 'August', value: 30 },
  { id: '2026-09', label: 'Sep', fullLabel: 'September', value: 160 },
]

const WEEKLY_SPEND = [120, 80, 140, 60, 210, 95, 130, 70, 160, 110, 0, 145]
const SPEND_BY_WEEK = WEEKLY_SPEND.map((value, i) => ({
  id: `w${i + 1}`,
  label: `${i + 1}`,
  fullLabel: `Week ${i + 1}`,
  value,
}))

const meta = {
  title: 'Primitives/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  args: {
    data: SAVINGS_BY_MONTH,
    currency: 'AUD',
    locale: 'en-AU',
    label: 'Savings by month',
    caption: (d) => `saved in ${d.fullLabel}`,
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Opens on the latest period
    await expect(canvas.getByRole('radio', { name: 'September, $160.00' })).toHaveAttribute('aria-checked', 'true')
    await expect(canvas.getByText('saved in September')).toBeInTheDocument()

    // Tapping a bar moves the headline figure
    await userEvent.click(canvas.getByRole('radio', { name: 'May, $88.00' }))
    await expect(canvas.getByText('saved in May')).toBeInTheDocument()

    // Arrow keys move the selection like any radio group
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('radio', { name: 'June, $18.00' })).toHaveFocus()
    await expect(canvas.getByText('saved in June')).toBeInTheDocument()
  },
}

export const WithAverage: Story = {
  name: 'With average line',
  args: { reference: { value: 67, label: 'Avg' } },
}

export const TwelveWeeks: Story = {
  name: 'Twelve weeks, one empty',
  args: {
    data: SPEND_BY_WEEK,
    label: 'Spend by week',
    caption: (d) => `spent in ${d.fullLabel}`,
    reference: { value: 120, label: 'Budget' },
  },
}
