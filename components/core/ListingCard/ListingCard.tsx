import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '../../../lib/utils'

// A photo-led card in the marketplace style: the picture is the card. No border, no panel —
// the rounded photo carries the shape, and two or three lines of text sit underneath on the page
// background. Pills (a time, "Popular") sit on the photo's top-left, a FavoriteButton on its
// top-right. The title's link stretches over the whole card, so the card is one tap target
// with one accessible name, and the heart stays a separate button above it.
//
// The same parts make the small category tile ("Chefs · 32 available"): a square Media, a Title
// and a Meta line. Use MediaCard instead when content needs a bordered panel with a body.

export type ListingCardProps = ComponentPropsWithRef<'article'>

interface MediaProps extends ComponentPropsWithRef<'div'> {
  src: string
  alt: string
  /** Photo shape. Square for tiles; 4:5 for a tall browsing card; 4:3 for a wide one. */
  ratio?: 'square' | 'portrait' | 'landscape'
  /** Overlays: a Pill, a FavoriteButton. */
  children?: ReactNode
}

const ratioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
}

function Media({ src, alt, ratio = 'square', children, className, ...props }: MediaProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-muted', ratioClasses[ratio], className)} {...props}>
      <img
        src={src}
        alt={alt}
        className="size-full object-cover transition-transform duration-300 ease-out group-has-[h3_a:hover]/listing:scale-[1.03] motion-reduce:transition-none"
      />
      {children}
    </div>
  )
}

// Positions an overlay in a corner of the photo. z-10 lifts it above the stretched title link,
// so a heart tap saves rather than opens.
function Overlay({
  position = 'top-end',
  className,
  ...props
}: ComponentPropsWithRef<'div'> & { position?: 'top-start' | 'top-end' }) {
  return (
    <div
      className={cn('absolute top-2 z-10 @md:top-3', position === 'top-start' ? 'left-2 @md:left-3' : 'right-1 @md:right-2', className)}
      {...props}
    />
  )
}

// A short label on the photo, e.g. "10 am" or "Popular". Card-coloured so it reads on any picture.
function Pill({ children, className, ...props }: ComponentPropsWithRef<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-card/95 px-3 py-1 text-xs @md:text-sm font-semibold text-foreground shadow-[var(--shadow-sm)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

interface TitleProps extends ComponentPropsWithRef<'h3'> {
  /** Makes the whole card a link to this address. */
  href?: string
}

function Title({ href, children, className, ...props }: TitleProps) {
  return (
    <h3 className={cn('mt-2 text-sm @md:text-base font-medium leading-snug text-foreground line-clamp-2', className)} {...props}>
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

function Meta({ children, className, ...props }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={cn('text-xs @md:text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

export function ListingCard({ children, className, ...props }: ListingCardProps) {
  return (
    <article className={cn('group/listing relative flex min-w-0 flex-col gap-0.5', className)} {...props}>
      {children}
    </article>
  )
}

ListingCard.Media = Media
ListingCard.Overlay = Overlay
ListingCard.Pill = Pill
ListingCard.Title = Title
ListingCard.Meta = Meta
