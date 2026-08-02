import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge } from '@/components/primitives'
import { PriceDisplay } from '@/components/primitives'
import { ActionStrip } from '../ActionStrip/ActionStrip'
import { DetailList } from '../DetailList/DetailList'
import { MediaCard } from './MediaCard'

const meta = {
  title: 'Components/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
} satisfies Meta<typeof MediaCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-xs">
      <MediaCard>
        <MediaCard.Media
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop"
          alt="Airplane wing at sunset"
        />
        <MediaCard.Body>
          <MediaCard.Title>Economy to Tokyo</MediaCard.Title>
          <MediaCard.Subtitle>Qantas · QF 1 · Direct · 9h 45m</MediaCard.Subtitle>
        </MediaCard.Body>
      </MediaCard>
    </div>
  ),
}

export const Flight: Story = {
  name: 'Flight listing (travel)',
  render: () => (
    <div className="max-w-xs">
      <MediaCard>
        <MediaCard.Media
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop"
          alt="Airplane wing at sunset"
        />
        <MediaCard.Body>
          <div className="flex items-start justify-between gap-2">
            <MediaCard.Title>Economy to Tokyo</MediaCard.Title>
            <MediaCard.Badge>
              <StatusBadge label="2 seats left" variant="warning" />
            </MediaCard.Badge>
          </div>
          <MediaCard.Subtitle>Qantas · QF 1 · Direct · 9h 45m</MediaCard.Subtitle>
          <MediaCard.Meta>
            <PriceDisplay amount={899} currency="AUD" strikethrough={1199} />
          </MediaCard.Meta>
        </MediaCard.Body>
        <ActionStrip>
          <ActionStrip.Primary>Book now</ActionStrip.Primary>
          <ActionStrip.Secondary>View details</ActionStrip.Secondary>
        </ActionStrip>
      </MediaCard>
    </div>
  ),
}

export const Medication: Story = {
  name: 'Medication listing (pharmacy)',
  render: () => (
    <div className="max-w-xs">
      <MediaCard>
        <MediaCard.Media
          src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop"
          alt="Medication pills"
        />
        <MediaCard.Body>
          <div className="flex items-start justify-between gap-2">
            <MediaCard.Title>Amoxicillin 500mg</MediaCard.Title>
            <MediaCard.Badge>
              <StatusBadge label="In stock" variant="success" />
            </MediaCard.Badge>
          </div>
          <MediaCard.Subtitle>Capsules · 28 pack · Script required</MediaCard.Subtitle>
          <MediaCard.Meta>
            <PriceDisplay amount={12.99} currency="AUD" />
          </MediaCard.Meta>
        </MediaCard.Body>
        <ActionStrip>
          <ActionStrip.Primary>Add to cart</ActionStrip.Primary>
          <ActionStrip.Secondary>Learn more</ActionStrip.Secondary>
        </ActionStrip>
      </MediaCard>
    </div>
  ),
}

export const NoImage: Story = {
  name: 'Without media',
  render: () => (
    <div className="max-w-xs">
      <MediaCard>
        <MediaCard.Body>
          <div className="flex items-start justify-between gap-2">
            <MediaCard.Title>Premium Health Cover</MediaCard.Title>
            <MediaCard.Badge>
              <StatusBadge label="Recommended" variant="info" />
            </MediaCard.Badge>
          </div>
          <MediaCard.Subtitle>Bupa · Family plan · Hospital + Extras</MediaCard.Subtitle>
          <DetailList>
            <DetailList.Row label="Hospital" value="Full cover" />
            <DetailList.Row label="Excess" value="$500" />
          </DetailList>
          <MediaCard.Meta>
            <PriceDisplay amount={385} currency="AUD" />
            <span className="text-muted-foreground">/ month</span>
          </MediaCard.Meta>
        </MediaCard.Body>
        <ActionStrip>
          <ActionStrip.Primary>Select plan</ActionStrip.Primary>
          <ActionStrip.Secondary>Compare</ActionStrip.Secondary>
        </ActionStrip>
      </MediaCard>
    </div>
  ),
}
