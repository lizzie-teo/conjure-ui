import { useState } from 'react'
import { StatusBadge, PriceDisplay } from '@/components/primitives'
import { CardStack } from '@/components/core/CardStack/CardStack'
import { ActionStrip } from '@/components/core/ActionStrip/ActionStrip'
import { DetailList } from '@/components/core/DetailList/DetailList'
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

export function CardStackSection() {
  const [detail, setDetail] = useState<Flight | null>(null)

  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground">CardStack</h2>

      <div className="max-w-sm">
        <p className="text-xs md:text-sm text-muted-foreground mb-4">
          Tap the stack to expand. Tap “Details” to open the sheet.
        </p>
        <CardStack>
          {FLIGHTS.map((flight) => (
            <CardStack.Item key={flight.id}>
              <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
                <div className="p-4 md:p-5 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm md:text-base font-semibold text-foreground">{flight.label}</p>
                    {flight.badge && (
                      <StatusBadge label={flight.badge.label} variant={flight.badge.variant} />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{flight.airline}</p>
                  <DetailList>
                    <DetailList.Row label="Duration" value={flight.duration} />
                    <DetailList.Row label="Stops" value="Direct" />
                  </DetailList>
                  <PriceDisplay amount={flight.price} currency="AUD" />
                </div>
                <ActionStrip>
                  <ActionStrip.Primary>Select flight</ActionStrip.Primary>
                  <ActionStrip.Secondary onClick={() => setDetail(flight)}>
                    Details
                  </ActionStrip.Secondary>
                </ActionStrip>
              </div>
            </CardStack.Item>
          ))}
        </CardStack>
      </div>

      <ModalSheet
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.label ?? ''}
        size="md"
      >
        <ModalSheet.Body>
          <DetailList>
            <DetailList.Row label="Airline" value={detail?.airline ?? ''} />
            <DetailList.Row label="Duration" value={detail?.duration ?? ''} />
            <DetailList.Row label="Departure" value={detail?.departure ?? ''} />
            <DetailList.Row label="Arrival" value={detail?.arrival ?? ''} />
            <DetailList.Row label="Stops" value="Direct" />
            <DetailList.Row label="Baggage" value="23 kg included" />
            <DetailList.Row label="Fare class" value="Economy" />
          </DetailList>
          {detail && (
            <div className="mt-4">
              <PriceDisplay amount={detail.price} currency="AUD" />
            </div>
          )}
        </ModalSheet.Body>
        <ModalSheet.Footer>
          <ActionStrip>
            <ActionStrip.Primary onClick={() => setDetail(null)}>Select flight</ActionStrip.Primary>
          </ActionStrip>
        </ModalSheet.Footer>
      </ModalSheet>
    </section>
  )
}
