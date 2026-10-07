'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge, PriceDisplay } from '@/components/primitives'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { KeyValueList } from '../KeyValueList/KeyValueList'
import { MediaCard } from '../MediaCard/MediaCard'
import { ModalSheet } from '../../layouts/ModalSheet/ModalSheet'
import { CardCarousel } from './CardCarousel'

const meta = {
  title: 'Components/CardCarousel',
  component: CardCarousel,
  tags: ['autodocs'],
  // Shared render helper — not a story.
  excludeStories: ['FlightCard'],
} satisfies Meta<typeof CardCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <CardCarousel>
        <CardCarousel.Item>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-4">
            <p className="font-semibold text-sm text-foreground">Economy to Tokyo</p>
            <p className="text-xs text-muted-foreground">Qantas · Direct · $899</p>
          </div>
        </CardCarousel.Item>
        <CardCarousel.Item>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-4">
            <p className="font-semibold text-sm text-foreground">Economy to Osaka</p>
            <p className="text-xs text-muted-foreground">Qantas · Direct · $749</p>
          </div>
        </CardCarousel.Item>
        <CardCarousel.Item>
          <div className="rounded-xl border border-border bg-card overflow-hidden p-4">
            <p className="font-semibold text-sm text-foreground">Economy to Seoul</p>
            <p className="text-xs text-muted-foreground">Qantas · Direct · $820</p>
          </div>
        </CardCarousel.Item>
      </CardCarousel>
    </div>
  ),
}

export const FlightCard = ({ destination, airline, price, status, onDetails }: {
  destination: string
  airline: string
  price: number
  status?: 'warning' | 'success'
  onDetails?: () => void
}) => (
  <MediaCard>
    <MediaCard.Body>
      <div className="flex items-start justify-between gap-2">
        <MediaCard.Title>{destination}</MediaCard.Title>
        {status && <MediaCard.Badge><StatusBadge label={status === 'warning' ? '2 seats left' : 'Available'} variant={status} /></MediaCard.Badge>}
      </div>
      <MediaCard.Subtitle>{airline} · Direct</MediaCard.Subtitle>
      <MediaCard.Meta>
        <PriceDisplay amount={price} currency="AUD" />
      </MediaCard.Meta>
    </MediaCard.Body>
    <ButtonGroup>
      <ButtonGroup.Primary>Book now</ButtonGroup.Primary>
      <ButtonGroup.Secondary onClick={onDetails}>Details</ButtonGroup.Secondary>
    </ButtonGroup>
  </MediaCard>
)

export const ThreeCards: Story = {
  name: '3 cards',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <CardCarousel>
        <CardCarousel.Item>
          <FlightCard destination="Economy to Tokyo" airline="Qantas · QF 1" price={899} status="warning" />
        </CardCarousel.Item>
        <CardCarousel.Item>
          <FlightCard destination="Economy to Osaka" airline="Qantas · QF 3" price={749} status="success" />
        </CardCarousel.Item>
        <CardCarousel.Item>
          <FlightCard destination="Economy to Seoul" airline="Qantas · QF 7" price={820} />
        </CardCarousel.Item>
      </CardCarousel>
    </div>
  ),
}

export const FiveCards: Story = {
  name: '5 cards (scrollable)',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <CardCarousel>
        {[
          { dest: 'Tokyo', price: 899 },
          { dest: 'Osaka', price: 749 },
          { dest: 'Seoul', price: 820 },
          { dest: 'Singapore', price: 650 },
          { dest: 'Bangkok', price: 590 },
        ].map(({ dest, price }) => (
          <CardCarousel.Item key={dest}>
            <FlightCard
              destination={`Economy to ${dest}`}
              airline="Qantas"
              price={price}
            />
          </CardCarousel.Item>
        ))}
      </CardCarousel>
    </div>
  ),
}

export const SingleCard: Story = {
  name: 'Single card (no scroll)',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <CardCarousel>
        <CardCarousel.Item>
          <FlightCard destination="Economy to Tokyo" airline="Qantas · QF 1" price={899} status="warning" />
        </CardCarousel.Item>
      </CardCarousel>
    </div>
  ),
}

export const WithImages: Story = {
  name: 'With images (MediaCard.Media)',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <p className="text-xs text-muted-foreground mb-3">
        Put any content inside <code>CardCarousel.Item</code> — including <code>MediaCard</code> with a photo.
      </p>
      <CardCarousel>
        {[
          {
            dest: 'Tokyo',
            price: 899,
            img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop',
            status: 'warning' as const,
          },
          {
            dest: 'Osaka',
            price: 749,
            img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop',
            status: 'success' as const,
          },
          {
            dest: 'Seoul',
            price: 820,
            img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=200&fit=crop',
            status: undefined,
          },
          {
            dest: 'Singapore',
            price: 650,
            img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=200&fit=crop',
            status: undefined,
          },
        ].map(({ dest, price, img, status }) => (
          <CardCarousel.Item key={dest}>
            <MediaCard>
              <MediaCard.Media
                src={img}
                alt={`${dest} skyline`}
              />
              <MediaCard.Body>
                <div className="flex items-start justify-between gap-2">
                  <MediaCard.Title>Economy to {dest}</MediaCard.Title>
                  {status && (
                    <MediaCard.Badge>
                      <StatusBadge
                        label={status === 'warning' ? '2 seats left' : 'Available'}
                        variant={status}
                      />
                    </MediaCard.Badge>
                  )}
                </div>
                <MediaCard.Subtitle>Qantas · Direct</MediaCard.Subtitle>
                <MediaCard.Meta>
                  <PriceDisplay amount={price} currency="AUD" />
                </MediaCard.Meta>
              </MediaCard.Body>
              <ButtonGroup>
                <ButtonGroup.Primary>Book now</ButtonGroup.Primary>
                <ButtonGroup.Secondary>Details</ButtonGroup.Secondary>
              </ButtonGroup>
            </MediaCard>
          </CardCarousel.Item>
        ))}
      </CardCarousel>
    </div>
  ),
}

type FlightDetail = { destination: string; airline: string; price: number }

export const WithDetailsSheet: Story = {
  name: 'With details sheet',
  render: () => {
    const [detail, setDetail] = useState<FlightDetail | null>(null)

    const flights: (FlightDetail & { status?: 'warning' | 'success' })[] = [
      { destination: 'Economy to Tokyo', airline: 'Qantas · QF 1', price: 899, status: 'warning' },
      { destination: 'Economy to Osaka', airline: 'Qantas · QF 3', price: 749, status: 'success' },
      { destination: 'Economy to Seoul', airline: 'Qantas · QF 7', price: 820 },
    ]

    return (
      <div className="max-w-sm @md:max-w-md">
        <CardCarousel>
          {flights.map((f) => (
            <CardCarousel.Item key={f.destination}>
              <FlightCard
                destination={f.destination}
                airline={f.airline}
                price={f.price}
                status={f.status}
                onDetails={() => setDetail(f)}
              />
            </CardCarousel.Item>
          ))}
        </CardCarousel>

        <ModalSheet
          open={!!detail}
          onClose={() => setDetail(null)}
          title={detail?.destination}
          size="md"
        >
          <ModalSheet.Body>
            <KeyValueList>
              <KeyValueList.Row label="Airline" value={detail?.airline ?? ''} />
              <KeyValueList.Row label="Departure" value="10:30 AM SYD" />
              <KeyValueList.Row label="Arrival" value="9:15 PM NRT" />
              <KeyValueList.Row label="Duration" value="9h 45m" />
              <KeyValueList.Row label="Stops" value="Direct" />
              <KeyValueList.Row label="Baggage" value="23 kg included" />
              <KeyValueList.Row label="Fare class" value="Economy" />
            </KeyValueList>
            {detail && (
              <div className="mt-4">
                <PriceDisplay amount={detail.price} currency="AUD" />
              </div>
            )}
          </ModalSheet.Body>
          <ModalSheet.Footer>
            <ButtonGroup>
              <ButtonGroup.Primary onClick={() => setDetail(null)}>Book now</ButtonGroup.Primary>
            </ButtonGroup>
          </ModalSheet.Footer>
        </ModalSheet>
      </div>
    )
  },
}
