import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ListingCard, type ListingCardProps } from './ListingCard'
import { FavoriteButton } from '@/components/primitives/FavoriteButton/FavoriteButton'
import { CardCarousel } from '@/components/core/CardCarousel/CardCarousel'
import { SectionHeader } from '@/components/primitives/SectionHeader/SectionHeader'

const EXPERIENCES = [
  {
    id: 'cathedral',
    src: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=600&h=750&fit=crop',
    time: '10 am',
    title: 'Explore the old cathedral with a restoration architect',
    price: 147.12,
  },
  {
    id: 'pastry',
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=750&fit=crop',
    time: '12 pm',
    title: 'Make pastries with an award-winning local bakery',
    price: 195.33,
  },
]

const CATEGORIES = [
  { id: 'photo', label: 'Photography', count: 71, src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop' },
  { id: 'chefs', label: 'Chefs', count: 32, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop' },
  { id: 'meals', label: 'Prepared meals', count: 12, src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop' },
  { id: 'massage', label: 'Massage', count: 18, src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop' },
]

type ListingCardStoryArgs = ListingCardProps & {
  src: string
  time: string
  title: string
  href: string
  price: number
}

const meta = {
  title: 'Components/ListingCard',
  component: ListingCard,
  tags: ['autodocs'],
  args: {
    src: EXPERIENCES[0].src,
    time: EXPERIENCES[0].time,
    title: EXPERIENCES[0].title,
    href: '#cathedral',
    price: EXPERIENCES[0].price,
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<ListingCardStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ListingCard className="w-56">
      <ListingCard.Media src={args.src} alt="" ratio="portrait">
        <ListingCard.Overlay position="top-start">
          <ListingCard.Pill>{args.time}</ListingCard.Pill>
        </ListingCard.Overlay>
        <ListingCard.Overlay>
          <FavoriteButton itemName={args.title} />
        </ListingCard.Overlay>
      </ListingCard.Media>
      <ListingCard.Title href={args.href}>{args.title}</ListingCard.Title>
      <ListingCard.Meta>From ${args.price.toFixed(2)} / guest</ListingCard.Meta>
    </ListingCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // One link for the card, named by its title; the heart is a separate control above it
    await expect(canvas.getByRole('link')).toHaveAccessibleName(/Explore the old cathedral/)
    const heart = canvas.getByRole('button', { name: /^Save Explore/ })
    await userEvent.click(heart)
    await expect(heart).toHaveAttribute('aria-pressed', 'true')
  },
}

export const Row: Story = {
  name: 'Two-up row',
  render: () => (
    <div className="grid grid-cols-2 gap-3">
      {EXPERIENCES.map((e) => (
        <ListingCard key={e.id}>
          <ListingCard.Media src={e.src} alt="" ratio="portrait">
            <ListingCard.Overlay position="top-start">
              <ListingCard.Pill>{e.time}</ListingCard.Pill>
            </ListingCard.Overlay>
            <ListingCard.Overlay>
              <FavoriteButton itemName={e.title} />
            </ListingCard.Overlay>
          </ListingCard.Media>
          <ListingCard.Title href={`#${e.id}`}>{e.title}</ListingCard.Title>
          <ListingCard.Meta>From ${e.price.toFixed(2)} / guest</ListingCard.Meta>
        </ListingCard>
      ))}
    </div>
  ),
}

export const CategoryTiles: Story = {
  name: 'Category tiles',
  render: () => (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Services near you" />
      <CardCarousel aria-label="Service categories">
        {CATEGORIES.map((c) => (
          <CardCarousel.Item key={c.id} className="w-28 @md:w-32">
            <ListingCard>
              <ListingCard.Media src={c.src} alt="" ratio="square" className="rounded-lg" />
              <ListingCard.Title href={`#${c.id}`} className="font-semibold">{c.label}</ListingCard.Title>
              <ListingCard.Meta>{c.count} available</ListingCard.Meta>
            </ListingCard>
          </CardCarousel.Item>
        ))}
      </CardCarousel>
    </section>
  ),
}
