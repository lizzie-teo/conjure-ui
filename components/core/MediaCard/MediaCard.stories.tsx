import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge } from '@/components/primitives'
import { PriceDisplay } from '@/components/primitives'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { KeyValueList } from '../KeyValueList/KeyValueList'
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
    <div className="max-w-xs @md:max-w-md">
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
    <div className="max-w-xs @md:max-w-md">
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
        <ButtonGroup>
          <ButtonGroup.Primary>Book now</ButtonGroup.Primary>
          <ButtonGroup.Secondary>View details</ButtonGroup.Secondary>
        </ButtonGroup>
      </MediaCard>
    </div>
  ),
}

export const Medication: Story = {
  name: 'Medication listing (pharmacy)',
  render: () => (
    <div className="max-w-xs @md:max-w-md">
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
        <ButtonGroup>
          <ButtonGroup.Primary>Add to cart</ButtonGroup.Primary>
          <ButtonGroup.Secondary>Learn more</ButtonGroup.Secondary>
        </ButtonGroup>
      </MediaCard>
    </div>
  ),
}

// Module-local on purpose: CSF treats every named export in a stories file as a
// story, so a shared fixture must not be exported.
function ProductCard() {
  return (
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
      <ButtonGroup>
        <ButtonGroup.Primary>Add to cart</ButtonGroup.Primary>
        <ButtonGroup.Secondary>Learn more</ButtonGroup.Secondary>
      </ButtonGroup>
    </MediaCard>
  )
}

export const Wireframe: Story = {
  name: 'Wireframe vs styled',
  parameters: {
    docs: {
      description: {
        story:
          'The same markup either side of one class. `.theme-wireframe` ships in the package: ' +
          'prototype a flow in grey boxes, then drop the class to see it branded. Set the toolbar ' +
          'to Wireframe to put the whole library in that mode.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 @md:flex-row @md:gap-8">
      <div className="max-w-xs @md:max-w-md flex-1 space-y-3">
        <p className="text-sm text-muted-foreground">Default</p>
        <ProductCard />
      </div>
      <div className="theme-wireframe max-w-xs @md:max-w-md flex-1 space-y-3 bg-background">
        <p className="text-sm text-muted-foreground">.theme-wireframe</p>
        <ProductCard />
      </div>
    </div>
  ),
}

export const NoImage: Story = {
  name: 'Without media',
  render: () => (
    <div className="max-w-xs @md:max-w-md">
      <MediaCard>
        <MediaCard.Body>
          <div className="flex items-start justify-between gap-2">
            <MediaCard.Title>Premium Health Cover</MediaCard.Title>
            <MediaCard.Badge>
              <StatusBadge label="Recommended" variant="info" />
            </MediaCard.Badge>
          </div>
          <MediaCard.Subtitle>Bupa · Family plan · Hospital + Extras</MediaCard.Subtitle>
          <KeyValueList>
            <KeyValueList.Row label="Hospital" value="Full cover" />
            <KeyValueList.Row label="Excess" value="$500" />
          </KeyValueList>
          <MediaCard.Meta>
            <PriceDisplay amount={385} currency="AUD" />
            <span className="text-muted-foreground">/ month</span>
          </MediaCard.Meta>
        </MediaCard.Body>
        <ButtonGroup>
          <ButtonGroup.Primary>Select plan</ButtonGroup.Primary>
          <ButtonGroup.Secondary>Compare</ButtonGroup.Secondary>
        </ButtonGroup>
      </MediaCard>
    </div>
  ),
}
