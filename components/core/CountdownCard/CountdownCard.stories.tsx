import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { CountdownCard, type CountdownCardProps } from './CountdownCard'

type CountdownCardStoryArgs = CountdownCardProps & { title: string; meta: string; href: string; days: number }

const meta = {
  title: 'Components/CountdownCard',
  component: CountdownCard,
  tags: ['autodocs'],
  args: {
    title: 'View details of your Melbourne trip',
    meta: 'May 18 – 22 · 2 guests',
    href: '#trip',
    days: 3,
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<CountdownCardStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <CountdownCard>
      <CountdownCard.Body>
        <CountdownCard.Title href={args.href}>{args.title}</CountdownCard.Title>
        <CountdownCard.Meta>{args.meta}</CountdownCard.Meta>
      </CountdownCard.Body>
      <CountdownCard.Days days={args.days} />
    </CountdownCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('link')).toHaveAccessibleName('View details of your Melbourne trip')
    await expect(canvas.getByText('Starts in 3 days')).toHaveClass('sr-only')
  },
}

export const Tomorrow: Story = {
  args: { title: 'Your cooking class is tomorrow', meta: 'Sat 26 Sep · 10 am', days: 1 },
  render: Default.render,
}

export const Offer: Story = {
  name: 'Offer ending',
  args: { title: 'Your cinema offer runs out soon', meta: 'Use it by 30 Sep', days: 5 },
  render: (args) => (
    <CountdownCard>
      <CountdownCard.Body>
        <CountdownCard.Title href={args.href}>{args.title}</CountdownCard.Title>
        <CountdownCard.Meta>{args.meta}</CountdownCard.Meta>
      </CountdownCard.Body>
      <CountdownCard.Days days={args.days} before="Ends in" />
    </CountdownCard>
  ),
}
