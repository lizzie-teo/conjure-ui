import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { ArrowLeft, Share } from 'lucide-react'
import { DetailHeader, type DetailHeaderProps } from './DetailHeader'
import { FavoriteButton } from '@/components/primitives/FavoriteButton/FavoriteButton'
import { PriceDisplay } from '@/components/primitives/PriceDisplay/PriceDisplay'
import { MediaListItem } from '@/components/core/MediaListItem/MediaListItem'
import { CheckoutBar } from '@/components/layouts/CheckoutBar/CheckoutBar'

const MENU = [
  {
    id: 'special',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop',
    title: 'Chef’s special',
    price: '$50 / guest',
    description: 'A delivered meal with your choice of grilled salmon or braised short ribs, with seasonal sides.',
  },
  {
    id: 'all-day',
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop',
    title: 'All day dining',
    price: '$175 / guest',
    description: 'A full day of meals, including a hot breakfast, fish tacos and a shared dinner.',
  },
]

type DetailHeaderStoryArgs = DetailHeaderProps & {
  imageSrc: string
  avatarSrc: string
  title: string
  description: string
  role: string
  location: string
}

const meta = {
  title: 'Layouts/DetailHeader',
  component: DetailHeader,
  tags: ['autodocs'],
  args: {
    imageSrc: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    avatarSrc: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=200&h=200&fit=crop',
    title: 'Coastal fusion cooking by Sam',
    description: 'I trained in fine-dining kitchens and now cook seasonal, globally inspired menus for groups.',
    role: 'Private chef in Melbourne',
    location: 'Cooked in your home',
  },
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="mx-auto max-w-sm bg-card"><Story /></div>],
} satisfies Meta<DetailHeaderStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

function Hero(args: DetailHeaderStoryArgs) {
  return (
    <DetailHeader>
      <DetailHeader.Media src={args.imageSrc} alt="">
        <DetailHeader.Actions>
          <DetailHeader.Action aria-label="Back">
            <ArrowLeft />
          </DetailHeader.Action>
          <div className="flex gap-2">
            <DetailHeader.Action aria-label="Share">
              <Share />
            </DetailHeader.Action>
            <FavoriteButton appearance="surface" itemName={args.title} />
          </div>
        </DetailHeader.Actions>
      </DetailHeader.Media>
      <DetailHeader.Sheet>
        <DetailHeader.Avatar src={args.avatarSrc} alt="" />
        <DetailHeader.Title>{args.title}</DetailHeader.Title>
        <DetailHeader.Description>{args.description}</DetailHeader.Description>
        <DetailHeader.Meta>
          <span className="font-medium text-foreground">{args.role}</span>
          <span className="text-muted-foreground">{args.location}</span>
        </DetailHeader.Meta>
      </DetailHeader.Sheet>
    </DetailHeader>
  )
}

export const Default: Story = {
  render: (args) => <Hero {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('Coastal fusion cooking by Sam')
    await expect(canvas.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: /^Save Coastal/ })).toHaveAttribute('aria-pressed', 'false')
  },
}

export const FullPage: Story = {
  name: 'Full detail page',
  render: (args) => (
    <div className="relative flex min-h-[44rem] flex-col">
      <Hero {...args} />
      <hr className="mx-6 border-border" />
      <section aria-label="Menus" className="flex flex-col gap-4 px-6 py-5 pb-28">
        {MENU.map((item) => (
          <MediaListItem key={item.id} variant="plain" hideChevron>
            <MediaListItem.Media src={item.src} alt="" />
            <MediaListItem.Body>
              <MediaListItem.Title href={`#${item.id}`}>{item.title}</MediaListItem.Title>
              <p className="text-sm text-foreground">{item.price}</p>
              <MediaListItem.Description>{item.description}</MediaListItem.Description>
            </MediaListItem.Body>
          </MediaListItem>
        ))}
      </section>
      <CheckoutBar className="absolute inset-x-0 bottom-0">
        <CheckoutBar.Summary>
          <PriceDisplay amount={50} currency="AUD" locale="en-AU" prefix="From" unit="guest" />
        </CheckoutBar.Summary>
        <CheckoutBar.Action>Reserve</CheckoutBar.Action>
      </CheckoutBar>
    </div>
  ),
}
