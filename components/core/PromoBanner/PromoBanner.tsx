import type { ComponentPropsWithRef } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// A pale brand-tinted panel: big title, a line of text, a picture on the right. The tint is
// primary at low strength, so it follows the client's brand and inverts correctly in dark mode.
// Like MediaListItem, the title's link stretches over the panel to make it one tap target.

export interface PromoBannerProps extends ComponentPropsWithRef<'article'> {
  /** Shows a close button. Promotions people cannot dismiss turn into banner blindness. */
  onDismiss?: () => void
  dismissLabel?: string
}

function Body({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn('flex min-w-0 flex-1 flex-col justify-center gap-1.5', className)} {...props}>
      {children}
    </div>
  )
}

interface TitleProps extends ComponentPropsWithRef<'h3'> {
  /** Makes the whole banner a link to this address. */
  href?: string
}

function Title({ href, children, className, ...props }: TitleProps) {
  return (
    <h3
      className={cn(
        'font-heading text-xl @md:text-2xl font-semibold leading-tight tracking-tight text-foreground text-balance',
        className
      )}
      {...props}
    >
      {href ? (
        <a
          href={href}
          className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </h3>
  )
}

// A visual cue only: the title's stretched link is the real target, so this is hidden from
// assistive tech rather than read as a second, unlabelled link.
function Cta({ children, className, ...props }: ComponentPropsWithRef<'span'>) {
  return (
    <span
      aria-hidden="true"
      className={cn('mt-1 inline-flex items-center gap-1 text-sm @md:text-base font-semibold text-primary', className)}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 ease-out group-has-[a:hover]/banner:translate-x-0.5 motion-reduce:transition-none" />
    </span>
  )
}

function Description({ children, className, ...props }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

interface MediaProps extends Omit<ComponentPropsWithRef<'img'>, 'children'> {
  src: string
  alt: string
}

function Media({ src, alt, className, ...props }: MediaProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('size-20 @md:size-24 shrink-0 self-center rounded-lg object-cover', className)}
      {...props}
    />
  )
}

export function PromoBanner({ onDismiss, dismissLabel = 'Dismiss', children, className, ...props }: PromoBannerProps) {
  return (
    <article
      className={cn(
        'group/banner relative flex items-stretch gap-4 overflow-hidden rounded-xl bg-primary/8',
        'p-4 @md:p-5',
        onDismiss && 'pr-10 @md:pr-11',
        className
      )}
      {...props}
    >
      {children}
      {onDismiss && (
        // z-10 lifts it above the title's stretched link, so a tap here closes rather than opens
        <Button
          variant="ghost"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="absolute top-1.5 right-1.5 z-10 size-9 @md:size-8 pointer-coarse:size-11 rounded-full p-0 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      )}
    </article>
  )
}

PromoBanner.Body = Body
PromoBanner.Title = Title
PromoBanner.Description = Description
PromoBanner.Media = Media
PromoBanner.Cta = Cta
