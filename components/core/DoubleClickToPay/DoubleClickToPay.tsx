'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import faceIdUrl from '../../primitives/Apple-objects/face-id.svg'
import type { Ref } from 'react'
import type { MotionButtonProps, MotionDivProps } from '../../../lib/prop-types'

// ── Timing constants ──────────────────────────────────────────────────────────

const LOOP_S = 2.2       // full idle animation loop duration
const CLICK2_S = 0.32    // delay before second click in the double-click
const RIPPLE_S = 0.5     // how long each ripple ring expands

// After activation, wait for the Face ID animation to play before calling onActivate
const FACE_ID_COMPLETE_MS = 3600

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DoubleClickToPayProps extends Omit<MotionDivProps, 'children' | 'ref'> {
  /** Called after Face ID finishes scanning — use to advance payment state */
  onActivate?: () => void
  /**
   * The root element swaps between a `<button>` (idle) and a `<div>` (scanning),
   * so the ref is typed as their common `HTMLElement`.
   */
  ref?: Ref<HTMLElement>
}

// ── Sub-animation: double-click side button ───────────────────────────────────

function SideButton({ shouldReduce }: { shouldReduce: boolean | null }) {
  return (
    <div
      aria-hidden
      className="relative shrink-0 self-stretch"
      style={{ width: 5 }}
    >
      {!shouldReduce && (
        <>
          {/* Ring 1 — first click */}
          <motion.span
            className="absolute pointer-events-none rounded-full border border-white/70"
            style={{ width: 20, height: 20, top: '50%', left: '50%', marginTop: -10, marginLeft: -10 }}
            animate={{ scale: [1, 4.5], opacity: [0.65, 0] }}
            transition={{
              duration: RIPPLE_S,
              repeat: Infinity,
              repeatDelay: LOOP_S - RIPPLE_S,
              ease: [0, 0, 0.2, 1],
            }}
          />
          {/* Ring 2 — second click: repeatDelay accounts for the initial delay so both rings stay on the same LOOP_S period */}
          <motion.span
            className="absolute pointer-events-none rounded-full border border-white/70"
            style={{ width: 20, height: 20, top: '50%', left: '50%', marginTop: -10, marginLeft: -10 }}
            animate={{ scale: [1, 4.5], opacity: [0.65, 0] }}
            transition={{
              duration: RIPPLE_S,
              delay: CLICK2_S,
              repeat: Infinity,
              repeatDelay: LOOP_S - CLICK2_S - RIPPLE_S,
              ease: [0, 0, 0.2, 1],
            }}
          />
        </>
      )}

      {/* Physical button bar — flashes twice per loop */}
      <motion.span
        className="absolute inset-0 rounded-full bg-white"
        animate={!shouldReduce
          ? {
              opacity: [1, 0.3, 1, 0.3, 1, 1],
              scaleY: [1, 0.88, 1, 0.88, 1, 1],
            }
          : { opacity: [1, 0.4, 1] }
        }
        transition={!shouldReduce
          ? {
              // times align click flashes with the ripple rings:
              // click1 press ~0ms, release ~240ms, click2 press ~320ms (CLICK2_S), release ~480ms
              duration: LOOP_S,
              times: [0, 0.04, 0.11, 0.15, 0.22, 1],
              repeat: Infinity,
              ease: 'linear',
            }
          : {
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }
        }
      />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function DoubleClickToPay({ onActivate, className, ...props }: DoubleClickToPayProps) {
  const shouldReduce = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'scanning'>('idle')

  function handleActivate() {
    setPhase('scanning')
  }

  useEffect(() => {
    if (phase !== 'scanning') return
    const id = setTimeout(() => onActivate?.(), FACE_ID_COMPLETE_MS)
    return () => clearTimeout(id)
  }, [phase, onActivate])

  return (
    <AnimatePresence mode="wait">
      {phase === 'idle' ? (
        <motion.button
          key="double-click-idle"
          // Spread first: this root owns the activate handler and its a11y label.
          // Cast because the props are declared against the `<div>` branch.
          {...(props as MotionButtonProps)}
          type="button"
          onClick={handleActivate}
          aria-label="Double click side button to pay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
          className={cn(
            'inline-flex items-center justify-end gap-[9px] pr-[9px] h-24 md:h-28',
            'select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm',
            className,
          )}
        >
          <p className="text-lg md:text-xl font-normal text-white/90 text-right leading-snug whitespace-nowrap">
            Double Click<br />to Pay
          </p>

          <SideButton shouldReduce={shouldReduce} />
        </motion.button>
      ) : (
        <motion.div
          key="double-click-scanning"
          // Spread first: this root owns the live-region a11y contract.
          {...(props as MotionDivProps)}
          role="status"
          aria-label="Scanning with Face ID"
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
          className={cn('flex items-center justify-center h-24 md:h-28', className)}
        >
          <img
            src={faceIdUrl}
            alt=""
            aria-hidden
            width={88}
            height={86}
            style={{ imageRendering: 'auto' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
