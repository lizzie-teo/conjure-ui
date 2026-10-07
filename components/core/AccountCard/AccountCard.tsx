import type { ComponentPropsWithRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../../lib/utils'

// An account summary: name and balance on top, card picture and masked card number below.
// Banking apps make the whole card the way into the account, so `Name` takes an `href` and its
// link stretches over the card — one big target instead of a small "View" link. `Action` stays
// for a second, separate destination; it sits above the stretched link.

export type AccountCardProps = ComponentPropsWithRef<'article'>

function Header({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 px-4 @md:px-5 py-3 @md:py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface NameProps extends ComponentPropsWithRef<'h3'> {
  /** Makes the whole card a link to this account. */
  href?: string
}

function Name({ href, children, className, ...props }: NameProps) {
  return (
    <h3 className={cn('min-w-0 truncate text-sm @md:text-base font-medium text-foreground', className)} {...props}>
      {href ? (
        <a
          href={href}
          // ring-inset: the card clips its overflow, so an outer ring would be cut off
          className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-3 focus-visible:after:ring-inset focus-visible:after:ring-ring/50"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </h3>
  )
}

interface BalanceProps extends ComponentPropsWithRef<'div'> {
  /** Says which balance this is, e.g. "Available". Banks show it because "current" and
   *  "available" differ, and the wrong one is the costly mistake. */
  label?: string
}

// Pass an `CurrencyAmount` (size="md") as the child for the price-tag figure, or plain text
function Balance({ label, children, className, ...props }: BalanceProps) {
  return (
    <div className={cn('flex shrink-0 flex-col items-end gap-0.5', className)} {...props}>
      <p className="text-lg @md:text-xl font-semibold tabular-nums text-foreground">{children}</p>
      {label && <p className="text-xs @md:text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}

function Footer({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    // A recessed strip, not a rule: the card's two halves read as "the money" and "the card"
    <div className={cn('flex items-center gap-3 border-t border-border bg-muted/40 px-4 @md:px-5 py-2.5', className)} {...props}>
      {children}
    </div>
  )
}

interface MediaProps extends Omit<ComponentPropsWithRef<'img'>, 'children'> {
  src: string
  alt: string
}

function Media({ src, alt, className, ...props }: MediaProps) {
  return (
    // Card art is ~1.6:1, the ratio of a physical bank card
    <img
      src={src}
      alt={alt}
      className={cn('h-7 @md:h-8 aspect-[8/5] shrink-0 rounded-sm bg-muted object-cover shadow-[var(--shadow-sm)]', className)}
      {...props}
    />
  )
}

interface CardNumberProps extends Omit<ComponentPropsWithRef<'p'>, 'children'> {
  last4: string
  /** Spoken in place of the dots. */
  label?: (last4: string) => string
}

// "•••• 4444": the masked form people recognise from their card and statement. The dots are
// hidden from screen readers, which hear "Card ending in 4444" instead of "bullet" four times.
function CardNumber({ last4, label = (n) => `Card ending in ${n}`, className, ...props }: CardNumberProps) {
  return (
    <p className={cn('min-w-0 flex-1 truncate text-sm @md:text-base tabular-nums text-muted-foreground', className)} {...props}>
      <span className="sr-only">{label(last4)}</span>
      <span aria-hidden="true">
        <span className="tracking-widest">••••</span> {last4}
      </span>
    </p>
  )
}

function Detail({ children, className, ...props }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={cn('min-w-0 flex-1 truncate text-sm @md:text-base text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

function Action({ children, className, ...props }: ComponentPropsWithRef<'a'>) {
  return (
    <a
      className={cn(
        'relative z-10 shrink-0 text-sm @md:text-base font-medium text-primary underline-offset-4 hover:underline',
        'tap-target rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

// The "this goes somewhere" cue for a card whose Name has an href
function Chevron({ className, ...props }: ComponentPropsWithRef<'svg'>) {
  return (
    <ChevronRight
      aria-hidden="true"
      className={cn(
        'size-4 @md:size-5 shrink-0 text-muted-foreground/60 transition-transform duration-200 ease-out',
        'group-has-[h3_a:hover]/account:translate-x-0.5 motion-reduce:transition-none',
        className
      )}
      {...props}
    />
  )
}

export function AccountCard({ children, className, ...props }: AccountCardProps) {
  return (
    <article
      className={cn(
        'group/account relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-sm)]',
        'transition-shadow duration-200 has-[h3_a:hover]:shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      {children}
    </article>
  )
}

AccountCard.Header = Header
AccountCard.Name = Name
AccountCard.Balance = Balance
AccountCard.Footer = Footer
AccountCard.Media = Media
AccountCard.CardNumber = CardNumber
AccountCard.Detail = Detail
AccountCard.Action = Action
AccountCard.Chevron = Chevron
