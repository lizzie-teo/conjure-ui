'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from '@/components/primitives'
import { PriceDisplay } from '@/components/primitives'
import { ActionStrip } from '../ActionStrip/ActionStrip'
import { DetailList } from '../DetailList/DetailList'
import { ChipToCard } from './ChipToCard'

const DEFAULT_CHIPS = [
  {
    id: 'economy',
    label: 'Economy',
    card: (
      <div className="p-4">
        <p className="font-semibold text-sm">Economy to Tokyo</p>
        <p className="text-xs text-muted-foreground">Qantas · $899</p>
      </div>
    ),
  },
  {
    id: 'business',
    label: 'Business',
    card: (
      <div className="p-4">
        <p className="font-semibold text-sm">Business to Tokyo</p>
        <p className="text-xs text-muted-foreground">Qantas · $3,499</p>
      </div>
    ),
  },
]

const meta = {
  title: 'Components/ChipToCard',
  component: ChipToCard,
  tags: ['autodocs'],
  // Shared render helper — not a story.
  excludeStories: ['flightCard'],
  // `chips` is required, so meta must supply it for stories that use `render`.
  args: { chips: DEFAULT_CHIPS },
} satisfies Meta<typeof ChipToCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <ChipToCard {...args} />
    </div>
  ),
}

export const flightCard = (destination: string, price: number, duration: string) => (
  <div className="p-4 md:p-5 flex flex-col gap-3">
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-semibold text-sm md:text-base text-foreground">{destination}</h3>
      <StatusBadge label="Direct" variant="success" />
    </div>
    <DetailList>
      <DetailList.Row label="Airline" value="Qantas" />
      <DetailList.Row label="Duration" value={duration} />
      <DetailList.Row label="Stops" value="Non-stop" />
    </DetailList>
    <PriceDisplay amount={price} currency="AUD" />
  </div>
)

export const ThreeOptions: Story = {
  name: '3 options',
  render: () => (
    <div className="max-w-xs">
      <ChipToCard
        chips={[
          { id: 'economy', label: 'Economy', card: flightCard('Economy to Tokyo', 899, '9h 45m') },
          { id: 'premium', label: 'Premium Economy', card: flightCard('Premium Economy to Tokyo', 1299, '9h 45m') },
          { id: 'business', label: 'Business', card: flightCard('Business Class to Tokyo', 3499, '9h 45m') },
        ]}
      />
    </div>
  ),
}

export const FourOptions: Story = {
  name: '4 options',
  render: () => (
    <div className="max-w-xs">
      <ChipToCard
        chips={[
          { id: 'mon', label: 'Monday', card: flightCard('QF 1 — Monday 14 Jul', 899, '9h 45m') },
          { id: 'tue', label: 'Tuesday', card: flightCard('QF 1 — Tuesday 15 Jul', 749, '9h 45m') },
          { id: 'wed', label: 'Wednesday', card: flightCard('QF 1 — Wednesday 16 Jul', 820, '9h 45m') },
          { id: 'thu', label: 'Thursday', card: flightCard('QF 1 — Thursday 17 Jul', 599, '9h 45m') },
        ]}
      />
    </div>
  ),
}

export const PreSelected: Story = {
  name: 'Pre-selected state',
  render: () => (
    <div className="max-w-xs">
      <ChipToCard
        defaultSelectedId="business"
        chips={[
          { id: 'economy', label: 'Economy', card: flightCard('Economy to Tokyo', 899, '9h 45m') },
          { id: 'premium', label: 'Premium Economy', card: flightCard('Premium Economy to Tokyo', 1299, '9h 45m') },
          { id: 'business', label: 'Business', card: flightCard('Business Class to Tokyo', 3499, '9h 45m') },
        ]}
      />
    </div>
  ),
}

export const ControlledNotifiesParent: Story = {
  name: 'Controlled — selection drives chat',
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [messages, setMessages] = useState<string[]>([
      'Which cabin class would you like?',
    ])

    const chips = [
      { id: 'economy', label: 'Economy', card: flightCard('Economy to Tokyo', 899, '9h 45m') },
      { id: 'premium', label: 'Premium Economy', card: flightCard('Premium Economy to Tokyo', 1299, '9h 45m') },
      { id: 'business', label: 'Business', card: flightCard('Business Class to Tokyo', 3499, '9h 45m') },
    ]

    const handleSelect = (id: string | null) => {
      setSelectedId(id)
      if (id) {
        const label = chips.find((c) => c.id === id)?.label ?? id
        setMessages((prev) => [
          ...prev,
          `You chose ${label}. Let me find the best fares.`,
        ])
      }
    }

    return (
      <div className="max-w-xs flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          <code>onSelectedChange</code> fires on every selection — wire it to send a chat message, log analytics, unlock the next step, etc.
        </p>
        <div className="flex flex-col gap-2">
          {messages.map((msg, i) => (
            <div key={i} className="rounded-xl bg-muted px-3 py-2">
              <p className="text-xs text-foreground">{msg}</p>
            </div>
          ))}
        </div>
        <ChipToCard
          chips={chips}
          selectedId={selectedId}
          onSelectedChange={handleSelect}
        />
      </div>
    )
  },
}

export const ControlledClearFromOutside: Story = {
  name: 'Controlled — reset from outside',
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('economy')

    return (
      <div className="max-w-xs flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          The parent can clear the selection at any time — e.g. when the user edits a previous answer.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Selected: <strong className="text-foreground">{selectedId ?? 'none'}</strong>
          </span>
          <button
            className="text-xs underline text-muted-foreground"
            onClick={() => setSelectedId(null)}
          >
            Clear
          </button>
        </div>
        <ChipToCard
          chips={[
            { id: 'economy', label: 'Economy', card: flightCard('Economy to Tokyo', 899, '9h 45m') },
            { id: 'premium', label: 'Premium Economy', card: flightCard('Premium Economy to Tokyo', 1299, '9h 45m') },
            { id: 'business', label: 'Business', card: flightCard('Business Class to Tokyo', 3499, '9h 45m') },
          ]}
          selectedId={selectedId}
          onSelectedChange={setSelectedId}
        />
      </div>
    )
  },
}

export const PharmacyContext: Story = {
  name: 'Pharmacy context',
  render: () => (
    <div className="max-w-xs">
      <ChipToCard
        chips={[
          {
            id: 'brand',
            label: 'Brand name',
            card: (
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <h3 className="font-semibold text-sm md:text-base text-foreground">Nurofen 200mg</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Ibuprofen tablets · 24 pack · Script not required</p>
                <PriceDisplay amount={8.99} currency="AUD" />
              </div>
            ),
          },
          {
            id: 'generic',
            label: 'Generic',
            card: (
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm md:text-base text-foreground">Ibuprofen 200mg</h3>
                  <StatusBadge label="Best value" variant="success" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Generic ibuprofen · 24 pack · Same active ingredient</p>
                <PriceDisplay amount={3.49} currency="AUD" strikethrough={8.99} />
              </div>
            ),
          },
          {
            id: 'liquid',
            label: 'Liquid',
            card: (
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <h3 className="font-semibold text-sm md:text-base text-foreground">Nurofen Liquid Caps</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Ibuprofen 200mg · Liquid capsules · 24 pack</p>
                <PriceDisplay amount={12.49} currency="AUD" />
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
}
