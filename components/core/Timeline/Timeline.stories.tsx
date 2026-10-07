import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { Timeline, type TimelineProps } from './Timeline'
import { CurrencyAmount } from '@/components/primitives/CurrencyAmount/CurrencyAmount'

const LOGO = (seed: string) => `https://picsum.photos/seed/${seed}/120/120`

// Newest first: the month people care about is the one they are in
const MONTHS = [
  {
    id: '2026-09',
    title: 'September',
    amount: 160,
    partners: [
      { id: 'live', name: 'Live music', amount: 55 },
      { id: 'cricket', name: 'Cricket', amount: 45 },
      { id: 'football', name: 'Football', amount: 35 },
      { id: 'aquarium', name: 'Aquarium', amount: 25 },
    ],
  },
  {
    id: '2026-08',
    title: 'August',
    amount: 101,
    partners: [
      { id: 'delivery', name: 'Food delivery', amount: 61 },
      { id: 'cafe', name: 'Café', amount: 40 },
    ],
  },
  {
    id: '2026-07',
    title: 'July',
    amount: 91,
    partners: [{ id: 'parking', name: 'Airport parking', amount: 91 }],
  },
]

type TimelineStoryArgs = TimelineProps & { months: typeof MONTHS }

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  args: { months: MONTHS },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<TimelineStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ months }) => (
    <Timeline aria-label="Savings by month">
      {months.map((month, i) => (
        <Timeline.Stop
          key={month.id}
          title={month.title}
          current={i === 0}
          amount={<CurrencyAmount value={month.amount} currency="AUD" locale="en-AU" tone="inherit" size="md" />}
          amountCaption="saved"
        >
          <Timeline.List aria-label={`Partners used in ${month.title}`}>
            {month.partners.map((p) => (
              <Timeline.Item
                key={p.id}
                src={LOGO(p.id)}
                name={p.name}
                amount={<CurrencyAmount value={p.amount} currency="AUD" locale="en-AU" tone="inherit" size="sm" />}
              />
            ))}
          </Timeline.List>
        </Timeline.Stop>
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const timeline = within(canvasElement).getByRole('list', { name: 'Savings by month' })
    const stops = within(timeline).getAllByRole('listitem').filter((li) => li.parentElement === timeline)
    await expect(stops).toHaveLength(3)
    await expect(stops[0]).toHaveAttribute('aria-current', 'step')
  },
}

export const Milestones: Story = {
  render: () => (
    <Timeline aria-label="Your membership so far">
      <Timeline.Stop title="Membership paid for itself" amount="Sep 2026" current>
        <p className="text-sm text-muted-foreground">You have saved more than the membership cost.</p>
      </Timeline.Stop>
      <Timeline.Stop title="First offer used" amount="Aug 2026">
        <p className="text-sm text-muted-foreground">Weekend city tour.</p>
      </Timeline.Stop>
      <Timeline.Stop title="Joined" amount="Jul 2026">
        <p className="text-sm text-muted-foreground">You became a member.</p>
      </Timeline.Stop>
    </Timeline>
  ),
}
