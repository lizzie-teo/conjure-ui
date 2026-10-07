import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { WeekCalendar, type WeekCalendarProps, type WeekCalendarView } from './WeekCalendar'
import { MediaListItem } from '@/components/core/MediaListItem/MediaListItem'
import { SectionHeader } from '@/components/primitives/SectionHeader/SectionHeader'

const IMG = {
  exhibition: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&h=300&fit=crop',
  museum: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=300&h=300&fit=crop',
  cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=300&fit=crop',
  wildlife: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=300&h=300&fit=crop',
}

type Offer = { id: string; imageSrc: string; tag: string; title: string; meta: string; urgent?: boolean }

const OFFERS_BY_DAY: Record<string, Offer[]> = {
  '2026-09-23': [{ id: 'cinema', imageSrc: IMG.cinema, tag: 'Save up to $30', title: 'Cinema tickets', meta: 'Today only', urgent: true }],
  '2026-09-25': [
    { id: 'exhibition', imageSrc: IMG.exhibition, tag: 'Save up to $50', title: 'Film exhibition', meta: 'Ends 30 Oct' },
    { id: 'wildlife', imageSrc: IMG.wildlife, tag: 'Free gift', title: 'Wildlife park visit', meta: 'Ends in 14 days' },
  ],
  '2026-09-26': [
    { id: 'exhibition', imageSrc: IMG.exhibition, tag: 'Save up to $50', title: 'Film exhibition', meta: 'Ends 30 Oct' },
    { id: 'museum', imageSrc: IMG.museum, tag: 'Free guided tour', title: 'Natural history museum', meta: 'Ends in 14 days' },
    { id: 'wildlife', imageSrc: IMG.wildlife, tag: 'Free gift', title: 'Wildlife park visit', meta: 'Ends in 14 days' },
  ],
  '2026-09-27': [
    { id: 'museum', imageSrc: IMG.museum, tag: 'Free guided tour', title: 'Natural history museum', meta: 'Ends in 14 days' },
  ],
}

const WEEK = ['21', '22', '23', '24', '25', '26', '27'].map((d) => {
  const date = `2026-09-${d}`
  return { date, offers: OFFERS_BY_DAY[date]?.length ?? 0 }
})

type WeekCalendarStoryArgs = WeekCalendarProps & { title: string; rangeLabel: string; days: typeof WEEK }

const meta = {
  title: 'Components/WeekCalendar',
  component: WeekCalendar,
  tags: ['autodocs'],
  args: { title: "What's on this week", rangeLabel: '21 – 27 Sep 2026', days: WEEK },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<WeekCalendarStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

const dayName = new Intl.DateTimeFormat('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })

function Offers({ offers }: { offers: Offer[] }) {
  return (
    <WeekCalendar.List>
      {offers.map((offer) => (
        <MediaListItem key={offer.id}>
          <MediaListItem.Media src={offer.imageSrc} alt="" />
          <MediaListItem.Body>
            <MediaListItem.Tag label={offer.tag} />
            <MediaListItem.Title href={`#${offer.id}`}>{offer.title}</MediaListItem.Title>
            <MediaListItem.Meta urgent={offer.urgent}>{offer.meta}</MediaListItem.Meta>
          </MediaListItem.Body>
        </MediaListItem>
      ))}
    </WeekCalendar.List>
  )
}

export const Default: Story = {
  render: function Render(args) {
    const [day, setDay] = useState('2026-09-26')
    const offers = OFFERS_BY_DAY[day] ?? []
    const [y, m, d] = day.split('-').map(Number)
    return (
      <WeekCalendar>
        <WeekCalendar.Header title={args.title} />
        <WeekCalendar.Week
          days={args.days}
          rangeLabel={args.rangeLabel}
          selected={day}
          onSelect={setDay}
          onPrevious={() => {}}
          onNext={() => {}}
          today="2026-09-23"
          locale="en-AU"
        />
        {/* The heading follows the selection, so the list never looks unrelated to the strip */}
        <SectionHeader as="h3" title={dayName.format(new Date(y, m - 1, d))} aria-live="polite" />
        {offers.length > 0 ? (
          <Offers offers={offers} />
        ) : (
          <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            No offers on this day. Days with dots have offers.
          </p>
        )}
      </WeekCalendar>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const saturday = canvas.getByRole('radio', { name: /Saturday 26 September, 3 offers/ })
    await expect(saturday).toHaveAttribute('aria-checked', 'true')
    await expect(canvas.getAllByRole('article')).toHaveLength(3)

    // Choosing a day filters the list
    await userEvent.click(canvas.getByRole('radio', { name: /Wednesday 23 September, today, 1 offer/ }))
    await expect(canvas.getAllByRole('article')).toHaveLength(1)

    // Arrow keys step through days; a day with nothing on says so
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('radio', { name: /Thursday 24 September, no offers/ })).toHaveFocus()
    await expect(canvas.getByText(/No offers on this day/)).toBeInTheDocument()
  },
}

export const WithViewSwitch: Story = {
  name: 'With list/calendar switch',
  render: function Render(args) {
    const [view, setView] = useState<WeekCalendarView>('calendar')
    const all = Object.values(OFFERS_BY_DAY)
      .flat()
      .filter((o, i, a) => a.findIndex((x) => x.id === o.id) === i)
    return (
      <WeekCalendar>
        <WeekCalendar.Header title={args.title} view={view} onViewChange={setView} />
        {view === 'calendar' ? (
          <WeekCalendar.Week days={args.days} rangeLabel={args.rangeLabel} defaultSelected="2026-09-26" today="2026-09-23" locale="en-AU" />
        ) : (
          <Offers offers={all} />
        )}
      </WeekCalendar>
    )
  },
}

export const WeekOnly: Story = {
  name: 'Week only',
  render: (args) => (
    <WeekCalendar.Week
      days={args.days}
      rangeLabel={args.rangeLabel}
      today="2026-09-23"
      locale="en-AU"
      onPrevious={() => {}}
      onNext={() => {}}
    />
  ),
}
