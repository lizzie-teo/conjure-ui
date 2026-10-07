'use client'

import { Lock, Loader2 } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import { ConfirmIcon } from '../../primitives/Apple-objects/ConfirmIcon'
import { Button } from '../../ui/button'
import { ApplePayButton } from '../../primitives/ApplePayButton/ApplePayButton'
import { KeyValueList } from '../KeyValueList/KeyValueList'
import {
  PaymentMethodCard,
  type PaymentMethodCardProps,
} from '../../primitives/PaymentMethodCard/PaymentMethodCard'
import type { MotionDivProps } from '../../../lib/prop-types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AcceptedNetwork {
  src: string
  alt: string
}

export interface SummaryRow {
  label: string
  value: React.ReactNode
}

export interface PaymentConfirmSheetProps extends Omit<MotionDivProps, 'children'> {
  total: number
  currency?: string
  /** The active payment method shown in the confirmation row. */
  paymentMethod: PaymentMethodCardProps & { networkLogoSrc?: string }
  /** Optional one-line description shown below the amount (e.g. merchant name, order summary). */
  description?: string
  /**
   * Key:value rows shown between the amount and the payment method — works for
   * any industry: flight route/dates, insurance policy details, cart item count, etc.
   */
  summaryRows?: SummaryRow[]
  /** Logos shown at the bottom as accepted payment marks. Pass `{ src, alt }` per logo. */
  acceptedNetworks?: AcceptedNetwork[]
  onConfirm: () => void
  onChangeMethod?: () => void
  loading?: boolean
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// ---------------------------------------------------------------------------
// Internal sub-components
// ---------------------------------------------------------------------------

function SecureHeader() {
  return (
    <div className="flex items-center gap-1.5 px-4 @md:px-5 pt-3.5 pb-3 border-b border-border">
      <Lock className="size-3 @md:size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="text-xs @md:text-sm text-muted-foreground">Secure checkout</span>
    </div>
  )
}

function ApplePayWaitingPrompt() {
  const shouldReduce = useReducedMotion()
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-2.5 py-4 @md:py-3"
    >
      <motion.div
        aria-hidden
        animate={shouldReduce ? {} : { opacity: [1, 0.35, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ConfirmIcon />
      </motion.div>
      <p className="text-xs @md:text-sm font-medium text-foreground text-center">
        Confirm with Side Button
      </p>
    </div>
  )
}

const stripContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
}
const stripItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] as const },
  },
}

function AcceptedNetworksStrip({ networks }: { networks: AcceptedNetwork[] }) {
  return (
    <motion.div
      variants={stripContainer}
      initial="hidden"
      animate="show"
      className="flex items-center justify-center flex-wrap gap-1.5"
      aria-label="Accepted payment methods"
    >
      {networks.map((n) => (
        <motion.div
          key={n.src}
          variants={stripItem}
          className="flex items-center justify-center h-6 px-2 rounded border border-border bg-card"
        >
          <img
            src={n.src}
            alt={n.alt}
            className="h-3.5 w-auto object-contain"
            draggable={false}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// PaymentConfirmSheet
// ---------------------------------------------------------------------------

export function PaymentConfirmSheet({
  total,
  currency = 'USD',
  paymentMethod,
  description,
  summaryRows,
  acceptedNetworks,
  onConfirm,
  onChangeMethod,
  loading = false,
  className,
  ...props
}: PaymentConfirmSheetProps) {
  const shouldReduce = useReducedMotion()
  const isApplePay = paymentMethod.type === 'apple-pay'
  const isGooglePay = paymentMethod.type === 'google-pay'
  const amountLabel = formatAmount(total, currency)

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className={cn('flex flex-col overflow-hidden rounded-[inherit]', className)}
      {...props}
    >
      {/* Security header */}
      <SecureHeader />

      {/* Amount hero */}
      <div className="flex flex-col items-center gap-1 px-4 @md:px-5 py-6 @md:py-7">
        <p
          aria-label={`Total: ${amountLabel}`}
          className="text-3xl @md:text-4xl font-semibold tracking-tight text-foreground tabular-nums"
        >
          {amountLabel}
        </p>
        {description && (
          <p className="text-xs @md:text-sm text-muted-foreground text-center mt-0.5">
            {description}
          </p>
        )}
      </div>

      {/* Optional summary rows — flight details, policy info, item count, etc. */}
      {summaryRows && summaryRows.length > 0 && (
        <>
          <div className="mx-4 @md:mx-5 border-t border-border" />
          <KeyValueList>
            {summaryRows.map((row, i) => (
              <KeyValueList.Row key={i} label={row.label} value={row.value} />
            ))}
          </KeyValueList>
        </>
      )}

      {/* Divider */}
      <div className="mx-4 @md:mx-5 border-t border-border" />

      {/* Payment method row */}
      <div className="flex items-center gap-2 @md:gap-3 px-3 @md:px-4 py-3 @md:py-3.5">
        <div className="flex-1 min-w-0">
          <PaymentMethodCard
            type={paymentMethod.type}
            label={paymentMethod.label}
            networkLogoSrc={paymentMethod.networkLogoSrc}
            selected={false}
          />
        </div>
        {onChangeMethod && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onChangeMethod}
            disabled={loading}
            className="shrink-0 h-12 @md:h-10 pointer-coarse:min-h-11 px-3 text-xs @md:text-sm text-muted-foreground hover:text-foreground"
          >
            Change
          </Button>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 @md:mx-5 border-t border-border" />

      {/* CTA area */}
      <div className="flex flex-col gap-3 @md:gap-4 px-4 @md:px-5 py-4 @md:py-5">
        <AnimatePresence mode="wait">
          {isApplePay && loading ? (
            <motion.div
              key="apple-pay-waiting"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            >
              <ApplePayWaitingPrompt />
            </motion.div>
          ) : isApplePay ? (
            <motion.div
              key="apple-pay-btn"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            >
              <ApplePayButton
                onClick={onConfirm}
                disabled={loading}
                className="rounded-[calc(var(--radius)+2px)]"
              />
            </motion.div>
          ) : isGooglePay ? (
            <motion.div
              key="google-pay-btn"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            >
              <Button
                variant="outline"
                className="h-12 @md:h-11 w-full rounded-[calc(var(--radius)+2px)]"
                onClick={onConfirm}
                disabled={loading}
                aria-label="Pay with Google Pay"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Processing…
                  </>
                ) : (
                  <img
                    src="/payment-logos/wallets/google-pay.svg"
                    alt=""
                    className="h-5 w-auto object-contain"
                    draggable={false}
                  />
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="standard-btn"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            >
              <Button
                className="h-12 @md:h-11 w-full"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Processing…
                  </>
                ) : (
                  `Pay ${amountLabel}`
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {acceptedNetworks && acceptedNetworks.length > 0 && (
          <AcceptedNetworksStrip networks={acceptedNetworks} />
        )}
      </div>
    </motion.div>
  )
}
