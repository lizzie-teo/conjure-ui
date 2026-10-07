import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import {
  StatusBadge,
  PriceDisplay,
  Avatar,
  Timestamp,
  Tag,
  StepIndicator,
} from '@/components/primitives'

const ago = (ms: number) => new Date(Date.now() - ms).toISOString()

const INITIAL_TAGS = ['Economy', 'Direct', 'Morning']

export function PrimitivesSection() {
  const [tags, setTags] = useState(INITIAL_TAGS)

  return (
    <section className="space-y-10">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground">Primitives</h2>

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-medium text-foreground">StatusBadge</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label="Default" variant="default" />
          <StatusBadge label="Confirmed" variant="success" />
          <StatusBadge label="2 seats left" variant="warning" />
          <StatusBadge label="Sold out" variant="error" />
          <StatusBadge label="New" variant="info" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-medium text-foreground">PriceDisplay</h3>
        <div className="flex flex-wrap items-baseline gap-6">
          <PriceDisplay amount={299} currency="AUD" />
          <PriceDisplay amount={199} currency="AUD" strikethrough={299} />
          <PriceDisplay amount={89.5} currency="GBP" strikethrough={120} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-medium text-foreground">Avatar</h3>
        <div className="flex items-center gap-4">
          <Avatar fallback="Qantas Airways" size="sm" />
          <Avatar fallback="Qantas Airways" size="md" />
          <Avatar fallback="Qantas Airways" size="lg" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-medium text-foreground">Timestamp</h3>
        <div className="flex flex-wrap gap-6">
          <Timestamp datetime={ago(20_000)} />
          <Timestamp datetime={ago(8 * 60_000)} />
          <Timestamp datetime={ago(3 * 3_600_000)} />
          <Timestamp datetime={ago(4 * 86_400_000)} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-medium text-foreground">Tag</h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
              />
            ))}
          </AnimatePresence>
        </div>
        {tags.length === 0 && (
          <Button
            variant="link"
            className="h-auto p-0 text-xs md:text-sm"
            onClick={() => setTags(INITIAL_TAGS)}
          >
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-medium text-foreground">StepIndicator</h3>
        <div className="flex items-start gap-8">
          <StepIndicator status="complete" label="Search" />
          <StepIndicator status="active" label="Book" />
          <StepIndicator status="pending" label="Confirm" />
        </div>
      </div>
    </section>
  )
}
