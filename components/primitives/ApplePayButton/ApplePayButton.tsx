'use client'

import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'

// Apple logo mark — same path used in ApplePaySheet
function AppleMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 14 18" className={cn('shrink-0 fill-current', className)}>
      <path d="M9.6 3.1c.62-.77 1.04-1.83.93-2.9A4.04 4.04 0 0 0 7.9 1.58a3.72 3.72 0 0 0-.9 2.82c1.02.08 2.07-.52 2.6-1.3zM10.55 4.6c-1.44-.08-2.67.82-3.36.82-.69 0-1.74-.78-2.87-.76A4.23 4.23 0 0 0 .77 6.8C-.73 9.6.5 13.85 1.95 16.2c.72 1.07 1.59 2.25 2.73 2.21 1.08-.04 1.49-.7 2.8-.7 1.31 0 1.68.7 2.81.68 1.18-.02 1.93-.98 2.65-2.05.83-1.18 1.17-2.33 1.19-2.39a3.67 3.67 0 0 1-2.2-3.37 3.75 3.75 0 0 1 1.78-3.18 3.84 3.84 0 0 0-3.16-1.8z" />
    </svg>
  )
}

export interface ApplePayButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  /**
   * Verb label rendered before the Apple Pay mark.
   * Follows Apple's button-type spec: "Pay with", "Buy with", "Book with", etc.
   * Pass an empty string to show the mark only.
   */
  label?: string
}

export function ApplePayButton({
  label = 'Pay with',
  className,
  style,
  ...props
}: ApplePayButtonProps) {
  return (
    <Button
      aria-label={label ? `${label} Apple Pay` : 'Apple Pay'}
      className={cn(
        'h-12 @md:h-11 w-full active:opacity-90',
        // Remove shadcn's default gap so we can control spacing precisely
        'gap-0',
        className,
      )}
      style={{
        backgroundColor: 'var(--apple-pay-surface)',
        color: 'white',
        fontFamily: 'var(--font-apple)',
        ...style,
      }}
      {...props}
    >
      {/* Baseline-aligned flex row matching Figma: label (19px) + mark + Pay (23px) */}
      <span className="flex items-baseline gap-[3px]">
        {label && (
          <span className="text-[17px] font-[590] leading-none">{label}</span>
        )}
        <AppleMark className="size-[17px] translate-y-[1px]" />
        <span className="text-[19px] font-[590] leading-none">Pay</span>
      </span>
    </Button>
  )
}
