import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor, within } from 'storybook/test'
import { Compass, House, Sparkles } from 'lucide-react'
import { Tabs } from './Tabs'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'dining', label: 'Dining' },
  { value: 'travel', label: 'Travel' },
  { value: 'wellness', label: 'Wellness' },
]

const FILTERS = [
  { value: 'recent', label: 'Recent', chevron: 'end' as const },
  { value: 'value', label: 'Highest value', chevron: 'end' as const },
  { value: 'ending', label: 'Ending soon', chevron: 'end' as const },
]

const MANY = [
  'All', 'Dining', 'Travel', 'Wellness', 'Beauty', 'Shopping', 'Entertainment', 'Sport',
].map((label) => ({ value: label.toLowerCase(), label }))

const SECTIONS = [
  { value: 'stays', label: 'Stays', icon: <House /> },
  { value: 'experiences', label: 'Experiences', icon: <Compass />, badge: 'New' },
  { value: 'services', label: 'Services', icon: <Sparkles />, badge: 'New' },
]

const meta = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: { items: CATEGORIES, label: 'Offer categories' },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      {args.items.map((item) => (
        <Tabs.Panel key={item.value} value={item.value} className="text-sm @md:text-base text-muted-foreground">
          {item.label} offers go here.
        </Tabs.Panel>
      ))}
    </Tabs>
  ),
}

export const WithChevron: Story = {
  name: 'With chevron',
  args: { items: FILTERS, label: 'Sort offers' },
}

export const Overflowing: Story = {
  name: 'More tabs than fit',
  args: { items: MANY },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
}

export const SwitchesPanels: Story = {
  name: 'Switches panels by click and arrow keys',
  render: Default.render,
  play: async ({ canvas, userEvent }) => {
    const all = canvas.getByRole('tab', { name: 'All' })
    const dining = canvas.getByRole('tab', { name: 'Dining' })
    await expect(all).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('All offers')

    await userEvent.click(dining)
    await expect(dining).toHaveAttribute('aria-selected', 'true')
    // The old panel exits before the new one mounts
    await waitFor(() => expect(canvas.getByRole('tabpanel')).toHaveTextContent('Dining offers'))
    await expect(canvas.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', dining.id)

    await userEvent.keyboard('{End}')
    const wellness = canvas.getByRole('tab', { name: 'Wellness' })
    await expect(wellness).toHaveAttribute('aria-selected', 'true')
    await expect(wellness).toHaveFocus()
    await waitFor(() => expect(canvas.getByRole('tabpanel')).toHaveTextContent('Wellness offers'))
  },
}

export const WithIcons: Story = {
  name: 'With icons and badges',
  args: { items: SECTIONS, label: 'What to browse', defaultValue: 'services' },
  play: async ({ canvasElement }) => {
    // The badge is drawn on the icon but spoken with the label
    await expect(within(canvasElement).getByRole('tab', { name: /^Experiences\W+New$/ })).toBeInTheDocument()
  },
}
