import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SectionHeader } from './SectionHeader'

const meta = {
  title: 'Primitives/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  args: { title: 'Recently viewed', actionLabel: 'View all', actionHref: '#offers' },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TitleOnly: Story = {
  name: 'Title only',
  args: { title: 'Popular near you', actionLabel: undefined, actionHref: undefined },
}

export const ButtonAction: Story = {
  name: 'Button action',
  args: { actionHref: undefined, onAction: () => {} },
}

export const LongTitle: Story = {
  name: 'Long title truncates',
  args: { title: 'Things to do near you this weekend and next' },
}

export const TitleLink: Story = {
  name: 'Title as link',
  args: { title: 'Chefs', titleHref: '#chefs', actionLabel: undefined, actionHref: undefined },
}
