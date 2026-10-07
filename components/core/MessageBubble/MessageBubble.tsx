'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { Avatar, type AvatarProps, Timestamp } from '../../primitives'
import type { ComponentProps, ComponentPropsWithRef } from 'react'
import type { MotionDivProps } from '../../../lib/prop-types'

type Role = 'user' | 'assistant'

const BubbleContext = createContext<{ role: Role; grouped: boolean; isGenerating: boolean }>({
  role: 'assistant',
  grouped: false,
  isGenerating: false,
})

export interface MessageBubbleProps extends MotionDivProps {
  role: Role
  /** True for consecutive messages from the same sender — hides the avatar */
  grouped?: boolean
  /** True while the AI is actively generating — triggers avatar breathe and stops on first token */
  isGenerating?: boolean
  /** Briefly flashes a glow overlay when the AI references this message */
  isReferenced?: boolean
}

interface ContentProps extends ComponentPropsWithRef<'div'> {
  /**
   * AI messages only: pass an array of word tokens to enable word-by-word
   * materialization. Each word fades in with a tiny upward drift as it arrives.
   * When omitted, children renders normally.
   */
  words?: string[]
}

type TimestampSubProps = ComponentProps<typeof Timestamp>

interface FeedbackRowProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  onThumbsUp?: () => void
  onThumbsDown?: () => void
}

const EASE_OUT = [0, 0, 0.2, 1] as const

// Container drives the stagger; individual words inherit via variants
const wordContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: EASE_OUT } },
}

// Fixed particle angles for thumbs-up burst (no Math.random — deterministic)
const BURST_PARTICLES = [
  { angle: -90, distance: 38 },
  { angle: -45, distance: 35 },
  { angle: 0,   distance: 42 },
  { angle: 45,  distance: 36 },
  { angle: 135, distance: 40 },
  { angle: 200, distance: 37 },
  { angle: 260, distance: 35 },
]

function Content({ children, words, className, ...props }: ContentProps) {
  const { role } = useContext(BubbleContext)
  const shouldReduce = useReducedMotion()
  const isUser = role === 'user'
  const useWordReveal = !isUser && words && words.length > 0

  return (
    <div
      className={cn(
        'max-w-[75%] @md:max-w-sm rounded-2xl px-4 py-3 @md:px-5 @md:py-3.5 text-sm @md:text-base leading-relaxed',
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-foreground shadow-[var(--shadow-bubble)]',
        className
      )}
      {...props}
    >
      {useWordReveal ? (
        shouldReduce ? (
          <span>{words!.map((w, i) => <span key={i} className="inline-block mr-[0.25em]">{w}</span>)}</span>
        ) : (
          <motion.span
            variants={wordContainerVariants}
            initial="hidden"
            animate="show"
            className="inline"
          >
            {words!.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        )
      ) : children}
    </div>
  )
}

function BubbleAvatar({ size = 'sm', ...props }: AvatarProps) {
  const { role, grouped, isGenerating } = useContext(BubbleContext)

  if (role === 'user') return null
  if (grouped) return null

  return <Avatar size={size} isGenerating={isGenerating} {...props} />
}

function BubbleTimestamp({ className, ...props }: TimestampSubProps) {
  return (
    <Timestamp
      className={cn('text-xs @md:text-sm mt-0.5 opacity-60', className)}
      {...props}
    />
  )
}

function FeedbackRow({
  onThumbsUp,
  onThumbsDown,
  className,
  'aria-label': ariaLabel = 'Message feedback',
  ...props
}: FeedbackRowProps) {
  const [burst, setBurst] = useState(false)
  const [shaking, setShaking] = useState(false)
  const shouldReduce = useReducedMotion()

  function handleThumbsUp() {
    setBurst(true)
    onThumbsUp?.()
    setTimeout(() => setBurst(false), 700)
  }

  function handleThumbsDown() {
    setShaking(true)
    onThumbsDown?.()
    setTimeout(() => setShaking(false), 400)
  }

  return (
    <div
      // Spread first: the row owns its `role="group"` a11y contract.
      {...props}
      className={cn('flex gap-0.5 mt-0.5', className)}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="relative inline-flex">
        <AnimatePresence>
          {burst && !shouldReduce && BURST_PARTICLES.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute inset-0 m-auto pointer-events-none flex items-center justify-center text-xs leading-none"
                style={{ width: 0, height: 0 }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: Math.cos(rad) * p.distance, y: Math.sin(rad) * p.distance, scale: 0.6 }}
                exit={{}}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
              >
                ✨
              </motion.span>
            )
          })}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 tap-target text-muted-foreground hover:text-foreground"
          onClick={handleThumbsUp}
          aria-label="Helpful"
        >
          <ThumbsUp size={13} />
        </Button>
      </div>
      <motion.div
        animate={!shouldReduce && shaking ? { x: [0, -4, 4, -3, 3, 0] } : {}}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="size-7 tap-target text-muted-foreground hover:text-foreground"
          onClick={handleThumbsDown}
          aria-label="Not helpful"
        >
          <ThumbsDown size={13} />
        </Button>
      </motion.div>
    </div>
  )
}

export function MessageBubble({
  role,
  grouped = false,
  isGenerating = false,
  isReferenced = false,
  className,
  children,
  ...props
}: MessageBubbleProps) {
  const shouldReduce = useReducedMotion()
  const isUser = role === 'user'

  return (
    <BubbleContext.Provider value={{ role, grouped, isGenerating }}>
      <motion.div
        initial={
          isUser
            ? { opacity: 0, x: shouldReduce ? 0 : 20, scaleX: shouldReduce ? 1 : 0.96 }
            : { opacity: 0, y: shouldReduce ? 0 : 8, scale: shouldReduce ? 1 : 0.97 }
        }
        animate={
          isUser
            ? { opacity: 1, x: 0, scaleX: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          isUser
            ? {
                opacity: { duration: 0.15, ease: EASE_OUT },
                x: { type: 'spring', stiffness: 380, damping: 26 },
                scaleX: { type: 'spring', stiffness: 280, damping: 22 },
              }
            : { duration: 0.2, ease: EASE_OUT }
        }
        className={cn(
          'relative flex w-full gap-2 @md:gap-3',
          isUser ? 'flex-row-reverse items-end' : 'flex-col items-start',
          className
        )}
        {...props}
      >
        <AnimatePresence>
          {isReferenced && (
            <motion.div
              key="glow"
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-primary/10 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
            />
          )}
        </AnimatePresence>
        {children}
      </motion.div>
    </BubbleContext.Provider>
  )
}

MessageBubble.Content = Content
MessageBubble.Avatar = BubbleAvatar
MessageBubble.Timestamp = BubbleTimestamp
MessageBubble.FeedbackRow = FeedbackRow
