'use client'

import { useRef, useState, type ComponentPropsWithRef, type KeyboardEvent, type MouseEventHandler } from 'react'
import { Mic, Search, X } from 'lucide-react'
import { Button } from '../../ui/button'
import { mergeRefs } from '../../../lib/merge-refs'
import { cn } from '../../../lib/utils'

export interface SearchBarProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  /** Accessible name for the input. Defaults to the placeholder. */
  label?: string
  /** Shows a microphone button while the field is empty. Omit when there is no voice search. */
  onVoiceSearch?: MouseEventHandler<HTMLButtonElement>
  voiceSearchLabel?: string
  /** Called after the field is cleared by the × button or Escape. Controlled fields must reset
   *  their `value` here; uncontrolled fields are cleared for you. */
  onClear?: () => void
  clearLabel?: string
  /** Applied to the input. Use `wrapperClassName` for the outer box. */
  className?: string
  wrapperClassName?: string
}

/**
 * `ref` and rest props go to the `<input>`, not the wrapper: the input is what a consumer needs to
 * focus, read and control.
 *
 * The trailing slot swaps by state, the way iOS search does: a microphone while empty, a clear
 * button once there is text. Escape clears too, then a second Escape leaves it to the page.
 */
export function SearchBar({
  label,
  placeholder = 'Search',
  onVoiceSearch,
  voiceSearchLabel = 'Search by voice',
  onClear,
  clearLabel = 'Clear search',
  className,
  wrapperClassName,
  ref,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  ...props
}: SearchBarProps) {
  const input = useRef<HTMLInputElement>(null)
  const [uncontrolledHasText, setUncontrolledHasText] = useState(Boolean(defaultValue))
  const hasText = value !== undefined ? String(value).length > 0 : uncontrolledHasText

  function clear() {
    if (value === undefined && input.current) {
      input.current.value = ''
      setUncontrolledHasText(false)
    }
    onClear?.()
    input.current?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(e)
    if (e.key === 'Escape' && hasText && !e.defaultPrevented) {
      e.preventDefault()
      clear()
    }
  }

  return (
    <div
      role="search"
      className={cn(
        'group/search flex items-center gap-2 rounded-md bg-muted pl-3 @md:pl-4 pr-1',
        'h-12 @md:h-10 pointer-coarse:min-h-11',
        'transition-[box-shadow,background-color] duration-150 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring/50',
        wrapperClassName
      )}
    >
      <Search
        aria-hidden="true"
        className="size-4 @md:size-5 shrink-0 text-muted-foreground transition-colors duration-150 group-focus-within/search:text-foreground"
      />
      <input
        ref={mergeRefs(input, ref)}
        type="search"
        aria-label={label ?? placeholder}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (value === undefined) setUncontrolledHasText(e.target.value.length > 0)
          onChange?.(e)
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-sm @md:text-base text-foreground outline-none',
          'placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden',
          !onVoiceSearch && !hasText && 'pr-2',
          className
        )}
        {...props}
      />
      {hasText ? (
        <Button variant="ghost" aria-label={clearLabel} onClick={clear} className="size-10 @md:size-8 pointer-coarse:size-11 rounded-full p-0 text-muted-foreground hover:text-foreground">
          <span className="flex size-4 @md:size-5 items-center justify-center rounded-full bg-muted-foreground/25 text-foreground">
            <X className="size-3" />
          </span>
        </Button>
      ) : (
        onVoiceSearch && (
          <Button variant="ghost" aria-label={voiceSearchLabel} onClick={onVoiceSearch} className="size-10 @md:size-8 pointer-coarse:size-11 rounded-full p-0 text-muted-foreground hover:text-foreground">
            <Mic className="size-4 @md:size-5" />
          </Button>
        )
      )}
    </div>
  )
}
