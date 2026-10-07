'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUp, Mic } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import { mergeRefs } from '../../../lib/merge-refs'
import type { ComponentProps, ComponentPropsWithRef } from 'react'

interface ChatInputContextValue {
  value: string
  setValue: (v: string) => void
  handleSend: () => void
  disabled: boolean
}

const ChatInputCtx = createContext<ChatInputContextValue | null>(null)

function useChatInput() {
  const ctx = useContext(ChatInputCtx)
  if (!ctx) throw new Error('ChatInput sub-components must be used inside <ChatInput>')
  return ctx
}

export interface ChatInputProps extends ComponentPropsWithRef<'div'> {
  onSend: (value: string) => void
  disabled?: boolean
}

/** `value`/`onChange` are owned by the parent `<ChatInput>` and cannot be overridden. */
type FieldProps = Omit<ComponentPropsWithRef<'textarea'>, 'value' | 'onChange' | 'children'>

type SendProps = Omit<ComponentProps<typeof Button>, 'children'>

function Field({
  placeholder = 'Type a message…',
  className,
  ref: forwardedRef,
  'aria-label': ariaLabel = 'Message input',
  ...props
}: FieldProps) {
  const { value, setValue, handleSend } = useChatInput()
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      // Spread first: the field owns the controlled value and the Enter-to-send
      // key contract, which a consumer prop must not silently replace.
      {...props}
      ref={mergeRefs(ref, forwardedRef)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          handleSend()
        }
      }}
      placeholder={placeholder}
      rows={1}
      aria-label={ariaLabel}
      className={cn(
        'flex-1 resize-none bg-transparent text-base text-foreground',
        'placeholder:text-muted-foreground leading-relaxed',
        'outline-none border-0 ring-0 shadow-none',
        'max-h-32 @md:max-h-40 overflow-y-auto',
        'py-1.5',
        className
      )}
    />
  )
}

function Send({ className, 'aria-label': ariaLabel = 'Send message', ...props }: SendProps) {
  const { handleSend, value, disabled } = useChatInput()
  const shouldReduce = useReducedMotion()
  const canSend = value.trim().length > 0 && !disabled

  return (
    <Button
      // Spread first: the button owns its send handler and disabled state,
      // both derived from the parent `<ChatInput>`.
      {...props}
      size="icon"
      onClick={handleSend}
      disabled={!canSend}
      aria-label={ariaLabel}
      className={cn('shrink-0 rounded-full size-11 @md:size-10 pointer-coarse:size-11', className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {canSend ? (
          <motion.span
            key="send"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: 45 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: 45 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            className="flex items-center justify-center"
          >
            <ArrowUp className="size-4 @md:size-5" />
          </motion.span>
        ) : (
          <motion.span
            key="mic"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            className="flex items-center justify-center"
          >
            <Mic className="size-4 @md:size-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

export function ChatInput({
  onSend,
  disabled = false,
  className,
  children,
  ...props
}: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSend = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }, [value, disabled, onSend])

  return (
    <ChatInputCtx.Provider value={{ value, setValue, handleSend, disabled }}>
      <div
        className={cn(
          'flex items-end gap-2 @md:gap-3 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]',
          'px-4 py-3 @md:px-5 @md:py-3.5',
          'transition-shadow duration-150 focus-within:ring-2 focus-within:ring-ring focus-within:shadow-[var(--shadow-elevated)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ChatInputCtx.Provider>
  )
}

ChatInput.Field = Field
ChatInput.Send = Send
