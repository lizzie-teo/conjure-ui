'use client'

import { useCallback, useEffect, useId, useRef, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import { mergeRefs } from '../../../lib/merge-refs'
import type { ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

// ── Focusable selector ────────────────────────────────────────────────────────

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

// ── Size map ──────────────────────────────────────────────────────────────────

const sizeClass = {
  sm: 'md:max-w-[360px]',
  md: 'md:max-w-[480px]',
  lg: 'md:max-w-[600px]',
} as const

// ── Breakpoint subscription ───────────────────────────────────────────────────

const DESKTOP_QUERY = '(min-width: 768px)'

/**
 * Reads a media query through useSyncExternalStore rather than an effect that
 * calls setState, which would cascade an extra render on every mount.
 * Server snapshot is `false` so SSR matches the mobile-first base styles.
 */
function useIsDesktop(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

type SubProps = ComponentPropsWithRef<'div'>

function Header({ children, className, ...props }: SubProps) {
  return (
    <div
      className={cn(
        'shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function Body({ children, className, ...props }: SubProps) {
  return (
    <div
      className={cn(
        'flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-4 md:py-5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function Footer({ children, className, ...props }: SubProps) {
  return (
    <div
      className={cn(
        'shrink-0 px-4 md:px-6 py-4 md:py-5 border-t border-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export interface ModalSheetProps extends Omit<MotionDivProps, 'title'> {
  open: boolean
  onClose: () => void
  /** Overrides the DOM `title` attribute — rendered as the dialog heading. */
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function ModalSheet({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  className,
  ref: forwardedRef,
  ...props
}: ModalSheetProps) {
  const shouldReduce = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const titleId = useId()
  const descId = useId()
  // Detect md+ breakpoint for animation variant switching
  const isDesktop = useIsDesktop()

  // Scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Escape to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Capture trigger on open; restore focus on close
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement
    } else {
      ;(triggerRef.current as HTMLElement | null)?.focus()
    }
  }, [open])

  // Focus trap — first focusable receives focus on open; Tab cycles within dialog
  useEffect(() => {
    if (!open || !dialogRef.current) return
    const el = dialogRef.current
    const focusable = () => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE))
    focusable()[0]?.focus()

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [open])

  // ── Animation variants ────────────────────────────────────────────────────

  // Mobile: slide up from bottom
  const mobileVariants = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y: '100%' },
    show:   shouldReduce ? { opacity: 1 } : { opacity: 1, y: '0%' },
    exit:   shouldReduce ? { opacity: 0 } : { opacity: 0, y: '100%' },
  }

  // Desktop: scale in from center; x/y hold the -50% centering offset throughout
  const desktopVariants = {
    hidden: shouldReduce
      ? { opacity: 0, x: '-50%', y: '-50%' }
      : { opacity: 0, scale: 0.95, x: '-50%', y: '-50%' },
    show: shouldReduce
      ? { opacity: 1, x: '-50%', y: '-50%' }
      : { opacity: 1, scale: 1, x: '-50%', y: '-50%' },
    exit: shouldReduce
      ? { opacity: 0, x: '-50%', y: '-50%' }
      : { opacity: 0, scale: 0.95, x: '-50%', y: '-50%' },
  }

  const variants = isDesktop ? desktopVariants : mobileVariants
  const duration = isDesktop ? 0.15 : 0.3

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduce ? 0.01 : 0.2, ease: [0, 0, 0.2, 1] }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog panel */}
          <motion.div
            key="modal-panel"
            // Spread first: the panel owns the dialog a11y contract and its
            // focus trap, which a consumer prop must not silently break.
            {...props}
            ref={mergeRefs(dialogRef, forwardedRef)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descId : undefined}
            className={cn(
              'fixed z-50 flex flex-col bg-card border border-border',
              'shadow-[var(--shadow-elevated)]',
              // Mobile: anchored to bottom, slides up
              'inset-x-0 bottom-0 rounded-t-2xl max-h-[90dvh]',
              // md+: centered floating modal
              'md:inset-auto md:top-[50%] md:left-[50%] md:rounded-2xl md:w-full md:max-h-[85vh]',
              sizeClass[size ?? 'md'],
              className,
            )}
            variants={variants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration, ease: [0, 0, 0.2, 1] }}
          >
            {/* Drag handle — mobile visual cue */}
            <div
              className="flex justify-center pt-3 pb-0 shrink-0 md:hidden"
              aria-hidden="true"
            >
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Close button — always top-right */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-2 md:top-3 right-2 md:right-3 z-10 size-12 md:size-10"
            >
              <X size={18} />
            </Button>

            {/* Built-in title header */}
            {title && (
              <div className="shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 pr-14 border-b border-border">
                <h2
                  id={titleId}
                  className="text-base md:text-lg font-semibold text-foreground"
                >
                  {title}
                </h2>
              </div>
            )}

            {/* Hidden description for aria-describedby */}
            {description && (
              <span id={descId} className="sr-only">
                {description}
              </span>
            )}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

ModalSheet.Header = Header
ModalSheet.Body = Body
ModalSheet.Footer = Footer
