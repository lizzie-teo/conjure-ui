'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import { MessageBubble } from '../../core/MessageBubble/MessageBubble'
import { ChatInput } from '../../core/ChatInput/ChatInput'
import { QuickReplies } from '../../core/QuickReplies/QuickReplies'
import { MediaCard } from '../../core/MediaCard/MediaCard'
import { ButtonGroup } from '../../core/ButtonGroup/ButtonGroup'
import { Avatar } from '../../primitives/Avatar/Avatar'
import { StatusBadge } from '../../primitives/StatusBadge/StatusBadge'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { type MockData, type MockProduct, type MockMessage, VERTICAL_MOCK } from './mockData'

import type { ComponentPropsWithRef } from 'react'

export type { MockData, MockProduct, MockMessage }

export interface ChatWidgetProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  vertical?: 'grocery' | 'pharmacy'
  mockData?: MockData
  onAddToCart?: (product: MockProduct) => void
  onSuggestSubstitution?: (product: MockProduct) => void
  onEscalateToHuman?: (context: { messages: MockMessage[] }) => void
}

interface LineCoords {
  fromX: number
  fromY: number
  toX: number
  toY: number
  /** Scroll height of the container, captured alongside the coords so the
   *  overlay SVG can be sized without reading a ref during render. */
  height: number
}

function computeCenterRelative(el: HTMLElement, container: HTMLElement): { x: number; y: number } {
  const containerRect = container.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - containerRect.left + elRect.width / 2,
    y: elRect.top - containerRect.top + container.scrollTop + elRect.height / 2,
  }
}

export function ChatWidget({
  vertical = 'grocery',
  mockData,
  onAddToCart,
  onSuggestSubstitution,
  onEscalateToHuman,
  className,
  ...props
}: ChatWidgetProps) {
  const data = mockData ?? VERTICAL_MOCK[vertical]
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const shouldReduce = useReducedMotion()

  const [glowMessageId, setGlowMessageId] = useState<string | null>(null)
  const [lineCoords, setLineCoords] = useState<LineCoords | null>(null)
  const [lineVisible, setLineVisible] = useState(false)

  const setMessageRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      messageRefs.current.set(id, el)
    } else {
      messageRefs.current.delete(id)
    }
  }, [])

  // Trigger thread reference glow on mount if any message has referencedId
  useEffect(() => {
    const referencingMsg = data.messages.find((m) => m.referencedId)
    if (!referencingMsg?.referencedId || !referencingMsg.id) return

    const delay = setTimeout(() => {
      const targetId = referencingMsg.referencedId!
      const sourceId = referencingMsg.id!

      setGlowMessageId(targetId)

      if (!shouldReduce) {
        const container = scrollContainerRef.current
        const targetEl = messageRefs.current.get(targetId)
        const sourceEl = messageRefs.current.get(sourceId)

        if (container && targetEl && sourceEl) {
          const from = computeCenterRelative(targetEl, container)
          const to = computeCenterRelative(sourceEl, container)
          setLineCoords({
            fromX: from.x,
            fromY: from.y,
            toX: to.x,
            toY: to.y,
            height: container.scrollHeight,
          })
          setLineVisible(true)
        }
      }

      setTimeout(() => {
        setGlowMessageId(null)
        setLineVisible(false)
        setTimeout(() => setLineCoords(null), 350)
      }, 1400)
    }, 800)

    return () => clearTimeout(delay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [])

  const totalMessages = data.messages.length

  return (
    <div
      className={cn(
        // `@container`: everything inside scales to the panel, not the screen.
        // `w-full` because a container ignores its content when sizing — left
        // to shrink-wrap in a flex row, it would collapse to 0.
        '@container w-full flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 @md:gap-4 px-4 @md:px-5 py-3 @md:py-4 border-b border-border bg-card shrink-0">
        <Avatar fallback={data.botName ?? 'Assistant'} src={data.avatar} size="sm" />
        <span className="text-sm @md:text-base font-medium text-foreground">
          {data.botName ?? 'Assistant'}
        </span>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-y-auto min-h-0 px-4 @md:px-5 py-4 @md:py-5 flex flex-col gap-3 @md:gap-4"
      >
        {/* SVG thread reference line */}
        <AnimatePresence>
          {lineCoords && (
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full pointer-events-none"
              style={{ height: lineCoords.height }}
              overflow="visible"
            >
              <motion.path
                key={`${lineCoords.fromX}-${lineCoords.toX}`}
                d={buildCurvePath(lineCoords)}
                stroke="var(--primary)"
                strokeWidth={1.5}
                strokeOpacity={0.35}
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={lineVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{
                  pathLength: { duration: 0.55, ease: [0, 0, 0.2, 1] },
                  opacity: { duration: 0.15 },
                }}
              />
            </svg>
          )}
        </AnimatePresence>

        {data.messages.map((msg, i) => {
          const distanceFromBottom = totalMessages - 1 - i
          const isLast = distanceFromBottom === 0
          const isAI = msg.role === 'bot'
          // Age fade: AI messages only, not the last, min 0.6
          const ageOpacity = isAI && !isLast ? Math.max(0.6, 1 - distanceFromBottom * 0.04) : 1

          return (
            <div
              key={i}
              ref={msg.id ? (el) => setMessageRef(msg.id!, el) : undefined}
              className="flex flex-col gap-2 @md:gap-3 transition-opacity duration-200 hover:opacity-100"
              style={{ opacity: ageOpacity }}
            >
              <MessageBubble
                role={msg.role === 'bot' ? 'assistant' : 'user'}
                isReferenced={!!msg.id && msg.id === glowMessageId}
              >
                {msg.text && <MessageBubble.Content>{msg.text}</MessageBubble.Content>}
              </MessageBubble>

              {msg.richContent && (
                <div className="w-full">
                  {msg.richContent}
                </div>
              )}

              {msg.products && (
                <div className="flex gap-3 @md:gap-4 overflow-x-auto pb-1 scrollbar-none">
                  {msg.products.map((product, pi) => (
                    <div key={pi} className="w-52 @md:w-60 shrink-0">
                      <MediaCard>
                        {product.image && (
                          <MediaCard.Media src={product.image} alt={product.name} />
                        )}
                        <MediaCard.Body>
                          <div className="flex items-start justify-between gap-2">
                            <MediaCard.Title>{product.name}</MediaCard.Title>
                            {product.badge && (
                              <MediaCard.Badge>
                                <StatusBadge label={product.badge} variant={product.badgeVariant ?? 'default'} />
                              </MediaCard.Badge>
                            )}
                          </div>
                          {product.subtitle && (
                            <MediaCard.Subtitle>{product.subtitle}</MediaCard.Subtitle>
                          )}
                          <MediaCard.Meta>
                            <PriceDisplay amount={product.price} currency="AUD" />
                          </MediaCard.Meta>
                        </MediaCard.Body>
                        {(product.primaryAction || product.secondaryAction) && (
                          <ButtonGroup>
                            {product.primaryAction && (
                              <ButtonGroup.Primary onClick={() => onAddToCart?.(product)}>
                                {product.primaryAction}
                              </ButtonGroup.Primary>
                            )}
                            {product.secondaryAction && (
                              <ButtonGroup.Secondary onClick={() => onSuggestSubstitution?.(product)}>
                                {product.secondaryAction}
                              </ButtonGroup.Secondary>
                            )}
                          </ButtonGroup>
                        )}
                      </MediaCard>
                    </div>
                  ))}
                </div>
              )}

              {msg.quickReplies && msg.role === 'bot' && (
                <div>
                  <QuickReplies
                    options={msg.quickReplies}
                    onSelect={(option) => {
                      if (/pharmacist/i.test(option)) {
                        onEscalateToHuman?.({ messages: data.messages })
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border px-4 @md:px-5 py-3 @md:py-4 shrink-0">
        <ChatInput onSend={() => {}}>
          <ChatInput.Field />
          <ChatInput.Send />
        </ChatInput>
      </div>
    </div>
  )
}

function buildCurvePath({ fromX, fromY, toX, toY }: LineCoords): string {
  const midX = (fromX + toX) / 2
  const midY = (fromY + toY) / 2 - Math.abs(toY - fromY) * 0.35
  return `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`
}
