'use client'

import { Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { DetailList } from '../DetailList/DetailList'
import type { MotionDivProps } from '../../../lib/prop-types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaymentSuccessRow {
  label: string
  value: React.ReactNode
}

export interface PaymentSuccessProps extends Omit<MotionDivProps, 'children'> {
  /** Confirmation reference shown prominently — order #, booking ref, policy #. */
  referenceNumber: string
  /** StatusBadge label. Defaults to "Confirmed". */
  badgeLabel?: string
  /** Optional subtitle line below the reference number. */
  subtitle?: string
  /** Key:value rows in the detail section. */
  rows?: PaymentSuccessRow[]
  /** Primary CTA label. Defaults to "Done". */
  ctaLabel?: string
  onCta: () => void
  /** Optional secondary action (e.g. "Email receipt", "View booking"). */
  secondaryLabel?: string
  onSecondary?: () => void
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const textContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.22 },
  },
}

// ---------------------------------------------------------------------------
// PaymentSuccess
// ---------------------------------------------------------------------------

export function PaymentSuccess({
  referenceNumber,
  badgeLabel = 'Confirmed',
  subtitle,
  rows,
  ctaLabel = 'Done',
  onCta,
  secondaryLabel,
  onSecondary,
  className,
  ...props
}: PaymentSuccessProps) {
  const shouldReduce = useReducedMotion()

  const textItem = shouldReduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] as const } },
      }
    : {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] as const } },
      }

  return (
    <motion.div
      // Spread first: the root owns the live-region a11y contract.
      {...props}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className={cn('flex flex-col overflow-hidden rounded-[inherit]', className)}
    >
      {/* Hero section */}
      <div className="flex flex-col items-center gap-3 px-4 md:px-5 pt-8 md:pt-9 pb-6 md:pb-7 text-center">
        {/* Animated check circle */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
          className="flex items-center justify-center size-16 md:size-14 rounded-full bg-[var(--success)]/10"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.18, ease: [0, 0, 0.2, 1] }}
          >
            <Check
              size={28}
              strokeWidth={2.5}
              className="text-[var(--success)]"
              aria-hidden
            />
          </motion.div>
        </motion.div>

        {/* Badge + reference + subtitle — staggered after the circle */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-2"
        >
          <motion.div variants={textItem}>
            <StatusBadge label={badgeLabel} variant="success" />
          </motion.div>

          <motion.p
            variants={textItem}
            className="text-xl md:text-2xl font-semibold text-foreground tracking-tight"
          >
            {referenceNumber}
          </motion.p>

          {subtitle && (
            <motion.p
              variants={textItem}
              className="text-xs md:text-sm text-muted-foreground max-w-[240px] leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Detail rows */}
      {rows && rows.length > 0 && (
        <>
          <div className="mx-4 md:mx-5 border-t border-border" />
          <DetailList>
            {rows.map((row, i) => (
              <DetailList.Row key={i} label={row.label} value={row.value} />
            ))}
          </DetailList>
        </>
      )}

      {/* CTA area */}
      <div className="flex flex-col gap-2 px-4 md:px-5 py-4 md:py-5">
        <Button className="h-12 md:h-11 w-full" onClick={onCta}>
          {ctaLabel}
        </Button>
        {secondaryLabel && onSecondary && (
          <Button
            variant="ghost"
            className="h-12 md:h-10 w-full text-muted-foreground hover:text-foreground"
            onClick={onSecondary}
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </motion.div>
  )
}
