import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Gift, Heart, House, Search, User } from 'lucide-react'
import { BottomNav, type BottomNavProps } from './BottomNav'

const ITEMS = [
  { id: 'home', label: 'Home', icon: <House /> },
  { id: 'search', label: 'Search', icon: <Search /> },
  { id: 'saved', label: 'Saved', icon: <Heart />, badge: true as const },
  { id: 'offers', label: 'Offers', icon: <Gift />, badge: 3 },
  { id: 'account', label: 'Account', icon: <User /> },
]

type BottomNavStoryArgs = BottomNavProps & { items: typeof ITEMS; initial: string }

const meta = {
  title: 'Layouts/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  args: { items: ITEMS, initial: 'home' },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="flex h-96 flex-col justify-end bg-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<BottomNavStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render({ items, initial }) {
    const [current, setCurrent] = useState(initial)
    return (
      <BottomNav>
        {items.map((item) => (
          <BottomNav.Item
            key={item.id}
            icon={item.icon}
            label={item.label}
            badge={'badge' in item ? item.badge : undefined}
            current={item.id === current}
            onClick={() => setCurrent(item.id)}
          />
        ))}
      </BottomNav>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nav = canvas.getByRole('navigation', { name: 'Main' })
    await expect(within(nav).getByRole('button', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    // The badge count is part of the item's name, not a stray number
    const offers = within(nav).getByRole('button', { name: 'Offers, 3 new' })
    await userEvent.click(offers)
    await expect(offers).toHaveAttribute('aria-current', 'page')
    await expect(within(nav).getByRole('button', { name: 'Home' })).not.toHaveAttribute('aria-current')
  },
}

export const Links: Story = {
  render: ({ items }) => (
    <BottomNav aria-label="Primary">
      {items.map((item) => (
        <BottomNav.Item
          key={item.id}
          icon={item.icon}
          label={item.label}
          href={`#${item.id}`}
          current={item.id === 'offers'}
        />
      ))}
    </BottomNav>
  ),
}
