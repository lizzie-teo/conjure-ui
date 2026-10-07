'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge } from '@/components/primitives'
import { PriceDisplay } from '@/components/primitives'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { KeyValueList } from '../KeyValueList/KeyValueList'
import { MediaCard } from '../MediaCard/MediaCard'
import { ModalSheet } from '../../layouts/ModalSheet/ModalSheet'
import { StackedCards } from './StackedCards'

const meta = {
  title: 'Components/StackedCards',
  component: StackedCards,
  tags: ['autodocs'],
  // Shared render helper — not a story.
  excludeStories: ['FlightOption'],
} satisfies Meta<typeof StackedCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-sm @md:max-w-md p-4">
      <StackedCards>
        <StackedCards.Item>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm text-foreground">QF 1 — Sydney to Tokyo</p>
            <p className="text-xs text-muted-foreground">9h 45m · $899</p>
          </div>
        </StackedCards.Item>
        <StackedCards.Item>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm text-foreground">QF 3 — Sydney to Osaka</p>
            <p className="text-xs text-muted-foreground">10h 20m · $749</p>
          </div>
        </StackedCards.Item>
        <StackedCards.Item>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-semibold text-sm text-foreground">QF 7 — Sydney to Seoul</p>
            <p className="text-xs text-muted-foreground">11h 05m · $820</p>
          </div>
        </StackedCards.Item>
      </StackedCards>
    </div>
  ),
}

export const FlightOption = ({ flight, airline, price, duration, status, onDetails }: {
  flight: string
  airline: string
  price: number
  duration: string
  status?: 'success' | 'warning' | 'info'
  onDetails?: () => void
}) => (
  <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
    <div className="p-4 @md:p-5 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm @md:text-base text-foreground">{flight}</h3>
        {status && <StatusBadge label={status === 'success' ? 'Best value' : status === 'warning' ? '2 seats left' : 'Fastest'} variant={status} />}
      </div>
      <p className="text-xs @md:text-sm text-muted-foreground">{airline}</p>
      <KeyValueList>
        <KeyValueList.Row label="Duration" value={duration} />
        <KeyValueList.Row label="Stops" value="Direct" />
      </KeyValueList>
      <PriceDisplay amount={price} currency="AUD" />
    </div>
    <ButtonGroup>
      <ButtonGroup.Primary>Select flight</ButtonGroup.Primary>
      <ButtonGroup.Secondary onClick={onDetails}>View details</ButtonGroup.Secondary>
    </ButtonGroup>
  </div>
)

export const ThreeCardsCollapsed: Story = {
  name: '3 cards — collapsed (default)',
  render: () => (
    <div className="max-w-sm @md:max-w-md p-4">
      <p className="text-xs text-muted-foreground mb-4">Click the stack to expand</p>
      <StackedCards>
        <StackedCards.Item>
          <FlightOption flight="QF 1 — Sydney to Tokyo" airline="Qantas" price={899} duration="9h 45m" status="success" />
        </StackedCards.Item>
        <StackedCards.Item>
          <FlightOption flight="QF 3 — Sydney to Osaka" airline="Qantas" price={749} duration="10h 20m" />
        </StackedCards.Item>
        <StackedCards.Item>
          <FlightOption flight="QF 7 — Sydney to Seoul" airline="Qantas" price={820} duration="11h 05m" status="info" />
        </StackedCards.Item>
      </StackedCards>
    </div>
  ),
}

export const ThreeCardsControlled: Story = {
  name: '3 cards — expanded state demo',
  render: () => {
    const [key, setKey] = useState(0)
    return (
      <div className="max-w-sm @md:max-w-md p-4 flex flex-col gap-4">
        <p className="text-xs text-muted-foreground">Click the stack to toggle</p>
        <StackedCards key={key}>
          <StackedCards.Item>
            <FlightOption flight="QF 1 — Sydney to Tokyo" airline="Qantas" price={899} duration="9h 45m" status="success" />
          </StackedCards.Item>
          <StackedCards.Item>
            <FlightOption flight="QF 3 — Sydney to Osaka" airline="Qantas" price={749} duration="10h 20m" />
          </StackedCards.Item>
          <StackedCards.Item>
            <FlightOption flight="QF 7 — Sydney to Seoul" airline="Qantas" price={820} duration="11h 05m" status="info" />
          </StackedCards.Item>
        </StackedCards>
        <button
          className="text-xs text-muted-foreground underline self-start"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset
        </button>
      </div>
    )
  },
}

export const FiveCards: Story = {
  name: '5 cards (maximum)',
  render: () => (
    <div className="max-w-sm @md:max-w-md p-4">
      <p className="text-xs text-muted-foreground mb-4">Click to expand — 5 cards maximum</p>
      <StackedCards>
        {[
          { flight: 'QF 1 — Tokyo', price: 899, status: 'success' as const },
          { flight: 'QF 3 — Osaka', price: 749, status: undefined },
          { flight: 'QF 7 — Seoul', price: 820, status: 'info' as const },
          { flight: 'QF 21 — Singapore', price: 650, status: undefined },
          { flight: 'QF 11 — Bangkok', price: 590, status: 'warning' as const },
        ].map(({ flight, price, status }) => (
          <StackedCards.Item key={flight}>
            <FlightOption
              flight={flight}
              airline="Qantas"
              price={price}
              duration="9h 00m"
              status={status}
            />
          </StackedCards.Item>
        ))}
      </StackedCards>
    </div>
  ),
}

export const WithImages: Story = {
  name: 'With images (MediaCard.Media)',
  render: () => (
    <div className="max-w-sm @md:max-w-md p-4 flex flex-col gap-3">
      <p className="text-xs text-muted-foreground mb-1">
        Put any content inside <code>StackedCards.Item</code> — including <code>MediaCard</code> with a photo. Tap to expand.
      </p>
      <StackedCards>
        {[
          {
            dest: 'Tokyo',
            price: 899,
            img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=160&fit=crop',
            status: 'success' as const,
            label: 'Best value',
          },
          {
            dest: 'Osaka',
            price: 749,
            img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=160&fit=crop',
            status: 'info' as const,
            label: 'Fastest',
          },
          {
            dest: 'Seoul',
            price: 820,
            img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=160&fit=crop',
            status: undefined,
            label: '',
          },
        ].map(({ dest, price, img, status, label }) => (
          <StackedCards.Item key={dest}>
            <MediaCard>
              <MediaCard.Media src={img} alt={`${dest} skyline`} />
              <MediaCard.Body>
                <div className="flex items-start justify-between gap-2">
                  <MediaCard.Title>Economy to {dest}</MediaCard.Title>
                  {status && <MediaCard.Badge><StatusBadge label={label} variant={status} /></MediaCard.Badge>}
                </div>
                <MediaCard.Subtitle>Qantas · Direct · 9h 45m</MediaCard.Subtitle>
                <MediaCard.Meta>
                  <PriceDisplay amount={price} currency="AUD" />
                </MediaCard.Meta>
              </MediaCard.Body>
              <ButtonGroup>
                <ButtonGroup.Primary>Select</ButtonGroup.Primary>
                <ButtonGroup.Secondary>Details</ButtonGroup.Secondary>
              </ButtonGroup>
            </MediaCard>
          </StackedCards.Item>
        ))}
      </StackedCards>
    </div>
  ),
}

export const CollapseAfterSelect: Story = {
  name: 'Controlled — collapse after selection',
  render: () => {
    const [open, setOpen] = useState(true)
    const [selected, setSelected] = useState<string | null>(null)

    const plans = [
      { name: 'Gold Cover', provider: 'Bupa', price: 385, status: 'success' as const, label: 'Best match' },
      { name: 'Silver Cover', provider: 'Medibank', price: 268, status: undefined, label: '' },
      { name: 'Bronze Cover', provider: 'HCF', price: 189, status: undefined, label: '' },
    ]

    if (selected) {
      return (
        <div className="max-w-sm @md:max-w-md p-4 flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">Stack collapsed after selection.</p>
          <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">{selected} selected</p>
              <p className="text-xs text-muted-foreground">Stack dismissed</p>
            </div>
            <button
              className="text-xs text-muted-foreground underline"
              onClick={() => { setSelected(null); setOpen(true) }}
            >
              Reset
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-sm @md:max-w-md p-4 flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">Clicking “Select plan” collapses the stack via controlled state.</p>
        <StackedCards expanded={open} onExpandChange={setOpen}>
          {plans.map((plan) => (
            <StackedCards.Item key={plan.name}>
              <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                    {plan.status && <StatusBadge label={plan.label} variant={plan.status} />}
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.provider}</p>
                  <PriceDisplay amount={plan.price} currency="AUD" />
                </div>
                <ButtonGroup>
                  <ButtonGroup.Primary onClick={() => { setSelected(plan.name); setOpen(false) }}>
                    Select plan
                  </ButtonGroup.Primary>
                  <ButtonGroup.Secondary>Compare</ButtonGroup.Secondary>
                </ButtonGroup>
              </div>
            </StackedCards.Item>
          ))}
        </StackedCards>
      </div>
    )
  },
}

export const KeyboardNav: Story = {
  name: 'Keyboard navigation',
  render: () => (
    <div className="max-w-sm @md:max-w-md p-4 flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Tab to focus the stack, then press <kbd className="px-1 py-0.5 rounded border border-border text-xs">Enter</kbd> or{' '}
        <kbd className="px-1 py-0.5 rounded border border-border text-xs">Space</kbd> to expand.{' '}
        <kbd className="px-1 py-0.5 rounded border border-border text-xs">Esc</kbd> collapses.
      </p>
      <StackedCards>
        <StackedCards.Item>
          <FlightOption flight="QF 1 — Sydney to Tokyo" airline="Qantas" price={899} duration="9h 45m" status="success" />
        </StackedCards.Item>
        <StackedCards.Item>
          <FlightOption flight="QF 3 — Sydney to Osaka" airline="Qantas" price={749} duration="10h 20m" />
        </StackedCards.Item>
        <StackedCards.Item>
          <FlightOption flight="QF 7 — Sydney to Seoul" airline="Qantas" price={820} duration="11h 05m" />
        </StackedCards.Item>
      </StackedCards>
    </div>
  ),
}

type FlightDetail = { flight: string; airline: string; price: number; duration: string; status?: 'success' | 'warning' | 'info' }

export const WithDetailsSheet: Story = {
  name: 'With details sheet',
  render: () => {
    const [detail, setDetail] = useState<FlightDetail | null>(null)

    const flights: FlightDetail[] = [
      { flight: 'QF 1 — Sydney to Tokyo', airline: 'Qantas', price: 899, duration: '9h 45m', status: 'success' },
      { flight: 'QF 3 — Sydney to Osaka', airline: 'Qantas', price: 749, duration: '10h 20m' },
      { flight: 'QF 7 — Sydney to Seoul', airline: 'Qantas', price: 820, duration: '11h 05m', status: 'info' },
    ]

    return (
      <div className="max-w-sm @md:max-w-md p-4">
        <p className="text-xs text-muted-foreground mb-4">Click the stack to expand, then tap “View details”</p>
        <StackedCards>
          {flights.map((f) => (
            <StackedCards.Item key={f.flight}>
              <FlightOption
                flight={f.flight}
                airline={f.airline}
                price={f.price}
                duration={f.duration}
                status={f.status}
                onDetails={() => setDetail(f)}
              />
            </StackedCards.Item>
          ))}
        </StackedCards>

        <ModalSheet
          open={!!detail}
          onClose={() => setDetail(null)}
          title={detail?.flight}
          size="md"
        >
          <ModalSheet.Body>
            <KeyValueList>
              <KeyValueList.Row label="Airline" value={detail?.airline ?? ''} />
              <KeyValueList.Row label="Duration" value={detail?.duration ?? ''} />
              <KeyValueList.Row label="Departure" value="10:30 AM SYD" />
              <KeyValueList.Row label="Arrival" value="9:15 PM NRT" />
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
              <ButtonGroup.Primary onClick={() => setDetail(null)}>Select flight</ButtonGroup.Primary>
            </ButtonGroup>
          </ModalSheet.Footer>
        </ModalSheet>
      </div>
    )
  },
}
