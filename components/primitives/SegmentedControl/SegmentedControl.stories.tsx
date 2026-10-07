import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { CalendarDays, List } from 'lucide-react'
import { SegmentedControl } from './SegmentedControl'

const PERIODS = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

const VIEWS = [
  { value: 'list', label: 'List view', icon: <List /> },
  { value: 'calendar', label: 'Calendar view', icon: <CalendarDays /> },
]

const meta = {
  title: 'Primitives/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: { options: PERIODS, defaultValue: 'month', 'aria-label': 'Time period' },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullWidth: Story = {
  name: 'Full width',
  args: { className: 'w-full' },
}

export const IconOnly: Story = {
  name: 'Icon only',
  args: { options: VIEWS, defaultValue: 'list', iconOnly: true, 'aria-label': 'View' },
}

export const WithIcons: Story = {
  name: 'Icon and label',
  args: { options: VIEWS, defaultValue: 'calendar', 'aria-label': 'View' },
}

export const SelectsByClickAndKeyboard: Story = {
  name: 'Selects by click and arrow keys',
  play: async ({ canvas, userEvent }) => {
    const week = canvas.getByRole('radio', { name: 'Week' })
    const month = canvas.getByRole('radio', { name: 'Month' })
    const year = canvas.getByRole('radio', { name: 'Year' })
    await expect(month).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(week)
    await expect(week).toHaveAttribute('aria-checked', 'true')
    await expect(month).toHaveAttribute('aria-checked', 'false')

    // Arrow left from the first option wraps to the last
    await userEvent.keyboard('{ArrowLeft}')
    await expect(year).toHaveAttribute('aria-checked', 'true')
    await expect(year).toHaveFocus()

    // Only the checked option is in the tab order
    await expect(year).toHaveAttribute('tabindex', '0')
    await expect(week).toHaveAttribute('tabindex', '-1')
  },
}
