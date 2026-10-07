'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MessageBubble } from '@/components/core/MessageBubble/MessageBubble'
import { MediaCard } from '@/components/core/MediaCard/MediaCard'
import { ButtonGroup } from '@/components/core/ButtonGroup/ButtonGroup'
import { StatusBadge } from '@/components/primitives/StatusBadge/StatusBadge'
import { PriceDisplay } from '@/components/primitives/PriceDisplay/PriceDisplay'
import { Avatar } from '@/components/primitives/Avatar/Avatar'
import { CardCarousel } from '@/components/core/CardCarousel/CardCarousel'
import { StackedCards } from '@/components/core/StackedCards/StackedCards'
import { ExpandableChips } from '@/components/core/ExpandableChips/ExpandableChips'

const meta = {
  title: 'Layouts/Rich Content — When to Use',
  // Shared layout helpers — not stories.
  excludeStories: ['ChatShell', 'Bot', 'User'],
} satisfies Meta

export default meta
type Story = StoryObj

// ─── Shared shell ────────────────────────────────────────────────────────────

export function ChatShell({ children, botName = 'Assistant' }: { children: React.ReactNode; botName?: string }) {
  return (
    <div className="@container w-full max-w-[380px] md:max-w-[420px] flex flex-col gap-3 rounded-2xl border border-border bg-background shadow-[var(--shadow-card)] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card shrink-0">
        <Avatar fallback={botName} size="sm" />
        <span className="text-sm font-medium text-foreground">{botName}</span>
      </div>
      <div className="flex flex-col gap-3 px-4 pb-5">
        {children}
      </div>
    </div>
  )
}

export function Bot({ children }: { children: React.ReactNode }) {
  return (
    <MessageBubble role="assistant">
      <MessageBubble.Content>{children}</MessageBubble.Content>
    </MessageBubble>
  )
}

export function User({ children }: { children: React.ReactNode }) {
  return (
    <MessageBubble role="user">
      <MessageBubble.Content>{children}</MessageBubble.Content>
    </MessageBubble>
  )
}

// ─── CardCarousel ────────────────────────────────────────────────────────────────

/**
 * CardCarousel — use when the AI returns several comparable results for the user
 * to browse. No ranking implied — all cards are equal priority. The user scrolls
 * horizontally to discover more. Works best with 3–8 items.
 *
 * Good fits: product search results, flight options, hotel listings, nearby
 * stores, similar articles.
 */
export const CardCarouselWhenToUse: Story = {
  name: 'CardCarousel — browse multiple results',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-muted/30">
      <p className="text-xs text-muted-foreground max-w-sm">
        <strong className="text-foreground">CardCarousel</strong> — use when the AI returns several comparable results and the user needs to browse. Cards are equal priority. Scroll to see more.
      </p>

      <ChatShell botName="Qantas Assistant">
        <User>Flights from Sydney to Tokyo in July under $1,000</User>
        <Bot>I found 4 economy options — swipe to compare:</Bot>
        <CardCarousel>
          {[
            { code: 'QF 1', dest: 'Tokyo (NRT)', dep: '06:30', arr: '21:15', price: 899, status: 'warning' as const, label: '2 seats left' },
            { code: 'QF 21', dest: 'Tokyo (HND)', dep: '10:00', arr: '00:45+1', price: 749, status: 'success' as const, label: 'Good value' },
            { code: 'QF 3',  dest: 'Tokyo (NRT)', dep: '14:00', arr: '04:55+1', price: 820, status: undefined, label: '' },
            { code: 'JL 772', dest: 'Tokyo (HND)', dep: '18:30', arr: '09:10+1', price: 940, status: undefined, label: '' },
          ].map((f) => (
            <CardCarousel.Item key={f.code}>
              <MediaCard>
                <MediaCard.Media
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=160&fit=crop"
                  alt="Airplane wing"
                />
                <MediaCard.Body>
                  <div className="flex items-start justify-between gap-2">
                    <MediaCard.Title>{f.code}</MediaCard.Title>
                    {f.status && <MediaCard.Badge><StatusBadge label={f.label} variant={f.status} /></MediaCard.Badge>}
                  </div>
                  <MediaCard.Subtitle>{f.dest} · {f.dep}–{f.arr}</MediaCard.Subtitle>
                  <MediaCard.Meta>
                    <PriceDisplay amount={f.price} currency="AUD" />
                  </MediaCard.Meta>
                </MediaCard.Body>
                <ButtonGroup>
                  <ButtonGroup.Primary>Select</ButtonGroup.Primary>
                  <ButtonGroup.Secondary>Details</ButtonGroup.Secondary>
                </ButtonGroup>
              </MediaCard>
            </CardCarousel.Item>
          ))}
        </CardCarousel>
      </ChatShell>
    </div>
  ),
}

// ─── StackedCards ────────────────────────────────────────────────────────────────

/**
 * StackedCards — use when the AI has a clear recommendation but wants to surface
 * 2–4 alternatives without cluttering the conversation. The top card is the
 * recommendation; tap to fan out and see the rest.
 *
 * Good fits: "best match" + alternatives, ranked plan options, top-3 doctors,
 * AI-curated shortlist.
 */
export const StackedCardsWhenToUse: Story = {
  name: 'StackedCards — ranked recommendation + alternatives',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-muted/30">
      <p className="text-xs text-muted-foreground max-w-sm">
        <strong className="text-foreground">StackedCards</strong> — use when the AI has a top pick and wants to offer alternatives without overwhelming. The top card = the recommendation. Tap to reveal the rest.
      </p>

      <ChatShell botName="Insurance Assistant">
        <User>Compare health cover for a family of 4</User>
        <Bot>Based on your answers I’d recommend the Gold plan — tap the stack to compare all three:</Bot>
        <StackedCards>
          {[
            {
              name: 'Gold Family Cover',
              provider: 'Bupa',
              price: 385,
              features: ['Hospital: Full', 'Extras: 80%', 'Dental: Included'],
              status: 'success' as const,
              label: 'Best match',
            },
            {
              name: 'Silver Family Cover',
              provider: 'Medibank',
              price: 268,
              features: ['Hospital: Mid', 'Extras: 60%', 'Dental: Optional'],
              status: 'info' as const,
              label: 'Best value',
            },
            {
              name: 'Bronze Family Cover',
              provider: 'HCF',
              price: 189,
              features: ['Hospital: Basic', 'Extras: 40%', 'Dental: Not included'],
              status: undefined,
              label: '',
            },
          ].map((plan) => (
            <StackedCards.Item key={plan.name}>
              <MediaCard>
                <MediaCard.Body>
                  <div className="flex items-start justify-between gap-2">
                    <MediaCard.Title>{plan.name}</MediaCard.Title>
                    {plan.status && <MediaCard.Badge><StatusBadge label={plan.label} variant={plan.status} /></MediaCard.Badge>}
                  </div>
                  <MediaCard.Subtitle>{plan.provider}</MediaCard.Subtitle>
                  <div className="flex flex-col gap-0.5">
                    {plan.features.map((f) => (
                      <p key={f} className="text-xs text-muted-foreground">{f}</p>
                    ))}
                  </div>
                  <MediaCard.Meta>
                    <PriceDisplay amount={plan.price} currency="AUD" />
                    <span className="text-muted-foreground text-xs">/ month</span>
                  </MediaCard.Meta>
                </MediaCard.Body>
                <ButtonGroup>
                  <ButtonGroup.Primary>Select plan</ButtonGroup.Primary>
                  <ButtonGroup.Secondary>Compare</ButtonGroup.Secondary>
                </ButtonGroup>
              </MediaCard>
            </StackedCards.Item>
          ))}
        </StackedCards>
      </ChatShell>
    </div>
  ),
}

// ─── ExpandableChips ───────────────────────────────────────────────────────────────

/**
 * ExpandableChips — use when the AI needs the user to make one specific choice
 * before continuing. Options are mutually exclusive. Selecting a chip expands
 * it into a detail card in place. Works best with 2–4 options.
 *
 * Good fits: cabin class, ticket type, plan tier, day of week, appointment
 * slot, dosage form.
 */
export const ExpandableChipsWhenToUse: Story = {
  name: 'ExpandableChips — pick one, see details',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-muted/30">
      <p className="text-xs text-muted-foreground max-w-sm">
        <strong className="text-foreground">ExpandableChips</strong> — use when the AI needs the user to pick exactly one option before proceeding. The selected chip expands into a detail card. Best for 2–4 mutually exclusive choices.
      </p>

      <ChatShell botName="Qantas Assistant">
        <User>Book a flight to Tokyo in July</User>
        <Bot>Which cabin class would you like?</Bot>
        <ExpandableChips
          chips={[
            {
              id: 'economy',
              label: 'Economy',
              card: (
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-foreground">Economy</h3>
                    <StatusBadge label="Best value" variant="success" />
                  </div>
                  <p className="text-xs text-muted-foreground">Standard seat · 23kg baggage · Meals included</p>
                  <div className="flex items-baseline gap-1">
                    <PriceDisplay amount={899} currency="AUD" />
                    <span className="text-xs text-muted-foreground">per person</span>
                  </div>
                  <ButtonGroup>
                    <ButtonGroup.Primary>Select Economy</ButtonGroup.Primary>
                  </ButtonGroup>
                </div>
              ),
            },
            {
              id: 'premium',
              label: 'Premium Economy',
              card: (
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="font-semibold text-sm text-foreground">Premium Economy</h3>
                  <p className="text-xs text-muted-foreground">Extra legroom · 32kg baggage · Priority boarding</p>
                  <div className="flex items-baseline gap-1">
                    <PriceDisplay amount={1499} currency="AUD" />
                    <span className="text-xs text-muted-foreground">per person</span>
                  </div>
                  <ButtonGroup>
                    <ButtonGroup.Primary>Select Premium Economy</ButtonGroup.Primary>
                  </ButtonGroup>
                </div>
              ),
            },
            {
              id: 'business',
              label: 'Business',
              card: (
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-foreground">Business</h3>
                    <StatusBadge label="2 seats left" variant="warning" />
                  </div>
                  <p className="text-xs text-muted-foreground">Lie-flat bed · 40kg baggage · Lounge access</p>
                  <div className="flex items-baseline gap-1">
                    <PriceDisplay amount={3499} currency="AUD" />
                    <span className="text-xs text-muted-foreground">per person</span>
                  </div>
                  <ButtonGroup>
                    <ButtonGroup.Primary>Select Business</ButtonGroup.Primary>
                  </ButtonGroup>
                </div>
              ),
            },
          ]}
        />
      </ChatShell>
    </div>
  ),
}

// ─── Side by side ─────────────────────────────────────────────────────────────

export const AllThreePatterns: Story = {
  name: 'All three patterns — at a glance',
  render: () => (
    <div className="flex flex-col gap-10 p-6 bg-muted/30 max-w-[860px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* CardCarousel column */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">CardCarousel</p>
            <p className="text-xs text-muted-foreground">Browse many equal-priority results. Horizontal scroll.</p>
            <p className="text-xs text-muted-foreground">3–8 items · No ranking · User discovers at own pace</p>
          </div>
          <ChatShell botName="Travel AI">
            <Bot>4 flights found — swipe to browse:</Bot>
            <CardCarousel>
              {['QF 1 · $899', 'JL 21 · $749', 'QF 3 · $820'].map((label) => (
                <CardCarousel.Item key={label}>
                  <div className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
                    <p className="text-xs font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Sydney → Tokyo · Direct</p>
                  </div>
                </CardCarousel.Item>
              ))}
            </CardCarousel>
          </ChatShell>
        </div>

        {/* StackedCards column */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">StackedCards</p>
            <p className="text-xs text-muted-foreground">Top pick visible, alternatives hidden behind. Tap to expand.</p>
            <p className="text-xs text-muted-foreground">2–5 items · AI-ranked · Recommendation on top</p>
          </div>
          <ChatShell botName="Insurance AI">
            <Bot>Best match on top — tap to see all 3:</Bot>
            <StackedCards>
              {[
                { name: 'Gold Cover', price: '$385/mo', label: 'Recommended' },
                { name: 'Silver Cover', price: '$268/mo', label: '' },
                { name: 'Bronze Cover', price: '$189/mo', label: '' },
              ].map((plan) => (
                <StackedCards.Item key={plan.name}>
                  <div className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-foreground">{plan.name}</p>
                      {plan.label && <StatusBadge label={plan.label} variant="success" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{plan.price}</p>
                  </div>
                </StackedCards.Item>
              ))}
            </StackedCards>
          </ChatShell>
        </div>

        {/* ExpandableChips column */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">ExpandableChips</p>
            <p className="text-xs text-muted-foreground">Pick one option, it expands to show full details in place.</p>
            <p className="text-xs text-muted-foreground">2–4 options · Mutually exclusive · Required choice</p>
          </div>
          <ChatShell botName="Booking AI">
            <Bot>Which cabin class?</Bot>
            <ExpandableChips
              chips={[
                {
                  id: 'eco',
                  label: 'Economy',
                  card: (
                    <div className="p-3">
                      <p className="text-xs font-medium text-foreground">Economy · $899</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Standard seat · 23kg baggage</p>
                    </div>
                  ),
                },
                {
                  id: 'biz',
                  label: 'Business',
                  card: (
                    <div className="p-3">
                      <p className="text-xs font-medium text-foreground">Business · $3,499</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Lie-flat · Lounge access</p>
                    </div>
                  ),
                },
              ]}
            />
          </ChatShell>
        </div>

      </div>
    </div>
  ),
}
