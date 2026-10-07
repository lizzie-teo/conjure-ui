import { useState } from 'react'
import { StatusBadge, PriceDisplay } from '@/components/primitives'
import { StackedCards } from '@/components/core/StackedCards/StackedCards'
import { ButtonGroup } from '@/components/core/ButtonGroup/ButtonGroup'
import { KeyValueList } from '@/components/core/KeyValueList/KeyValueList'
import { ModalSheet } from '@/components/layouts/ModalSheet/ModalSheet'

type Flight = {
  id: string
  label: string
  airline: string
  price: number
  duration: string
  departure: string
  arrival: string
  badge?: { label: string; variant: 'success' | 'info' | 'warning' }
}

const FLIGHTS: Flight[] = [
  {
    id: 'qf1',
    label: 'QF 1 — Sydney to Tokyo',
    airline: 'Qantas',
    price: 899,
    duration: '9h 45m',
    departure: '10:30 AM SYD',
    arrival: '9:15 PM NRT',
    badge: { label: 'Best value', variant: 'success' },
  },
  {
    id: 'qf3',
    label: 'QF 3 — Sydney to Osaka',
    airline: 'Qantas',
    price: 749,
    duration: '10h 20m',
    departure: '7:00 AM SYD',
    arrival: '7:20 PM KIX',
  },
  {
    id: 'qf7',
    label: 'QF 7 — Sydney to Seoul',
    airline: 'Qantas',
    price: 820,
    duration: '11h 05m',
    departure: '1:00 PM SYD',
    arrival: '12:05 AM ICN',
    badge: { label: 'Fastest', variant: 'info' },
  },
]

export function StackedCardsSection() {
  const [detail, setDetail] = useState<Flight | null>(null)

  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground">StackedCards</h2>

      <div className="max-w-sm">
        <p className="text-xs md:text-sm text-muted-foreground mb-4">
          Tap the stack to expand. Tap “Details” to open the sheet.
        </p>
        <StackedCards>
          {FLIGHTS.map((flight) => (
            <StackedCards.Item key={flight.id}>
              <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
                <div className="p-4 md:p-5 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm md:text-base font-semibold text-foreground">{flight.label}</p>
                    {flight.badge && (
                      <StatusBadge label={flight.badge.label} variant={flight.badge.variant} />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{flight.airline}</p>
                  <KeyValueList>
                    <KeyValueList.Row label="Duration" value={flight.duration} />
                    <KeyValueList.Row label="Stops" value="Direct" />
                  </KeyValueList>
                  <PriceDisplay amount={flight.price} currency="AUD" />
                </div>
                <ButtonGroup>
                  <ButtonGroup.Primary>Select flight</ButtonGroup.Primary>
                  <ButtonGroup.Secondary onClick={() => setDetail(flight)}>
                    Details
                  </ButtonGroup.Secondary>
                </ButtonGroup>
              </div>
            </StackedCards.Item>
          ))}
        </StackedCards>
      </div>

      <ModalSheet
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.label ?? ''}
        size="md"
      >
        <ModalSheet.Body>
          <KeyValueList>
            <KeyValueList.Row label="Airline" value={detail?.airline ?? ''} />
            <KeyValueList.Row label="Duration" value={detail?.duration ?? ''} />
            <KeyValueList.Row label="Departure" value={detail?.departure ?? ''} />
            <KeyValueList.Row label="Arrival" value={detail?.arrival ?? ''} />
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
    </section>
  )
}
