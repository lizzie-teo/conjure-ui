'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { ComponentPropsWithRef } from 'react'

export interface ChipToCardProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  chips: { id: string; label: string; card: React.ReactNode }[]
  /** Controlled selected chip. Pass null to show chips, a chip id to show that card. Omit to use internal state. */
  selectedId?: string | null
  /** Called whenever the selected chip changes. id is null when the user goes back to chips. */
  onSelectedChange?: (id: string | null) => void
  /** Initial selected chip when uncontrolled. */
  defaultSelectedId?: string
}

export function ChipToCard({
  chips,
  selectedId,
  onSelectedChange,
  defaultSelectedId,
  className,
  ...props
}: ChipToCardProps) {
  const isControlled = selectedId !== undefined
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    defaultSelectedId ?? null
  )
  const activeId = isControlled ? selectedId : internalSelectedId

  const shouldReduce = useReducedMotion()
  const rootId = useId()

  const selectedChip = chips.find((c) => c.id === activeId)

  const select = (id: string | null) => {
    if (!isControlled) setInternalSelectedId(id)
    onSelectedChange?.(id)
  }

  return (
    <LayoutGroup id={rootId}>
      {/*
        Chips and card occupy the SAME DOM position so there is no vertical
        offset (mt-3) that could shift the card's FLIP target while chips exit.
      */}
      <div className={cn('relative', className)} {...props}>
        <AnimatePresence mode="popLayout" initial={false}>
          {activeId && selectedChip ? (
            // Card — morphs in from the selected chip via layoutId FLIP
            <motion.div
              key={activeId}
              layoutId={`${rootId}-${activeId}`}
              className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]"
              initial={{ opacity: shouldReduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: shouldReduce ? 1 : 0.95,
                transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
              }}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            >
              {selectedChip.card}
              <div className="px-4 pb-4 pt-2 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => select(null)}
                  className="text-muted-foreground h-11 md:h-8 pointer-coarse:min-h-11"
                >
                  ← Back to options
                </Button>
              </div>
            </motion.div>
          ) : (
            // Chip list — exits as a unit; individual chip layoutIds are
            // recorded before exit so the FLIP still fires for the selected chip
            <motion.div
              key="chip-list"
              className="flex flex-wrap gap-2"
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              {chips.map((chip) => (
                <motion.div
                  key={chip.id}
                  layoutId={`${rootId}-${chip.id}`}
                  className="shrink-0"
                  whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full h-11 md:h-8 pointer-coarse:min-h-11"
                    onClick={() => select(chip.id)}
                  >
                    {chip.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}
