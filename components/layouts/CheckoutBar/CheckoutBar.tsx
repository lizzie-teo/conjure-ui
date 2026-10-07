import type { ComponentPropsWithRef } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// The price-and-action bar that floats over the bottom of a detail page: what it costs on the
// left, the one thing to do on the right. It keeps the decision in reach however far someone
// scrolls. Like BottomNav it does not fix itself to the viewport — the page decides that — but
// it pads for the home indicator with safe-area-inset-bottom.

export type CheckoutBarProps = ComponentPropsWithRef<'div'>

function Summary({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn('flex min-w-0 flex-1 flex-col text-sm @md:text-base', className)} {...props}>
      {children}
    </div>
  )
}

function Action({ className, ...props }: ComponentPropsWithRef<typeof Button>) {
  return (
    <Button
      className={cn(
        'h-12 @md:h-11 pointer-coarse:min-h-12 shrink-0 rounded-full px-6 @md:px-8 text-sm @md:text-base font-semibold active:scale-[0.97]',
        className
      )}
      {...props}
    />
  )
}

export function CheckoutBar({ children, className, ...props }: CheckoutBarProps) {
  return (
    <div className={cn('px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]', className)} {...props}>
      <div className="mx-auto flex max-w-md items-center gap-4 rounded-full border border-border bg-card/95 py-2 pr-2 pl-5 shadow-[var(--shadow-elevated)] backdrop-blur-md">
        {children}
      </div>
    </div>
  )
}

CheckoutBar.Summary = Summary
CheckoutBar.Action = Action
