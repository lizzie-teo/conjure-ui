import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { MediaListItem, type MediaListItemProps } from './MediaListItem'

type MediaListItemStoryArgs = MediaListItemProps & {
  imageSrc: string
  imageAlt: string
  tag: string
  title: string
  href: string
  description: string
  meta: string
  urgent: boolean
}

const OFFERS = [
  {
    id: 'city-tour',
    imageSrc: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop',
    tag: 'Save 20%',
    title: 'Weekend city tour',
    description: 'A guided walk with a local, coffee included.',
    meta: 'Ends in 2 days',
    urgent: true,
  },
  {
    id: 'cinema',
    imageSrc: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=300&fit=crop',
    tag: 'Save up to $30',
    title: 'Cinema tickets',
    description: 'Two tickets for the price of one on weekdays.',
    meta: 'Ends in 7 days',
    urgent: false,
  },
  {
    id: 'wildlife',
    imageSrc: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=300&h=300&fit=crop',
    tag: 'Free gift',
    title: 'Wildlife park visit',
    description: 'A free tote bag with every booking this month.',
    meta: 'Ends in 14 days',
    urgent: false,
  },
]

const meta = {
  title: 'Components/MediaListItem',
  component: MediaListItem,
  tags: ['autodocs'],
  args: {
    imageSrc: OFFERS[0].imageSrc,
    imageAlt: '',
    tag: OFFERS[0].tag,
    title: OFFERS[0].title,
    href: '#city-tour',
    description: OFFERS[0].description,
    meta: OFFERS[0].meta,
    urgent: OFFERS[0].urgent,
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<MediaListItemStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <MediaListItem>
      <MediaListItem.Media src={args.imageSrc} alt={args.imageAlt} />
      <MediaListItem.Body>
        <MediaListItem.Tag label={args.tag} />
        <MediaListItem.Title href={args.href}>{args.title}</MediaListItem.Title>
        <MediaListItem.Description>{args.description}</MediaListItem.Description>
        <MediaListItem.Meta urgent={args.urgent}>{args.meta}</MediaListItem.Meta>
      </MediaListItem.Body>
    </MediaListItem>
  ),
  play: async ({ canvasElement }) => {
    // The link's name is the title alone, not every line of the card
    const link = within(canvasElement).getByRole('link')
    await expect(link).toHaveAccessibleName('Weekend city tour')
  },
}

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-2 @md:gap-3">
      {OFFERS.map((offer) => (
        <MediaListItem key={offer.id}>
          <MediaListItem.Media src={offer.imageSrc} alt="" />
          <MediaListItem.Body>
            <MediaListItem.Tag label={offer.tag} />
            <MediaListItem.Title href={`#${offer.id}`}>{offer.title}</MediaListItem.Title>
            <MediaListItem.Meta urgent={offer.urgent}>{offer.meta}</MediaListItem.Meta>
          </MediaListItem.Body>
        </MediaListItem>
      ))}
    </div>
  ),
}

export const NotALink: Story = {
  name: 'Not a link',
  render: (args) => (
    <MediaListItem hideChevron>
      <MediaListItem.Media src={args.imageSrc} alt={args.imageAlt} />
      <MediaListItem.Body>
        <MediaListItem.Tag label="Redeemed" tone="success" />
        <MediaListItem.Title>{args.title}</MediaListItem.Title>
        <MediaListItem.Meta>Used on 12 Sep</MediaListItem.Meta>
      </MediaListItem.Body>
    </MediaListItem>
  ),
}

const MENU = [
  {
    id: 'special',
    imageSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop',
    title: 'Chef’s special',
    price: '$50 / guest',
    description: 'A delivered meal with your choice of grilled salmon or braised short ribs, with seasonal sides.',
  },
  {
    id: 'all-day',
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop',
    title: 'All day dining',
    price: '$175 / guest',
    description: 'A full day of meals, including a hot breakfast, fish tacos and a shared dinner.',
  },
  {
    id: 'feast',
    imageSrc: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop',
    title: 'Global feast',
    price: '$190 / guest',
    description: 'A multi-course menu with globally inspired canapés, a main and dessert.',
  },
]

export const Plain: Story = {
  name: 'Plain (menu rows)',
  render: () => (
    <div className="flex flex-col gap-3">
      {MENU.map((item) => (
        <MediaListItem key={item.id} variant="plain" hideChevron>
          <MediaListItem.Media src={item.imageSrc} alt="" />
          <MediaListItem.Body>
            <MediaListItem.Title href={`#${item.id}`}>{item.title}</MediaListItem.Title>
            <p className="text-sm text-foreground">{item.price}</p>
            <MediaListItem.Description>{item.description}</MediaListItem.Description>
          </MediaListItem.Body>
        </MediaListItem>
      ))}
    </div>
  ),
}
