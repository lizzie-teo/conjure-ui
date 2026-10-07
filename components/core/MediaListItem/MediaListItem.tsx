import type { ComponentPropsWithRef } from 'react'
import { ChevronRight, Clock } from 'lucide-react'
import { cn } from '../../../lib/utils'

// One offer in a list: picture, tag, title, text, chevron. The title's link stretches over the
// whole card (an ::after inset-0), so the row is one tap target with one accessible name — the
// title — instead of a card-wide <a> that would read every line of text as the link name.

export interface MediaListItemProps extends ComponentPropsWithRef<'article'> {
  /** Hide the trailing chevron, e.g. when the row is not a link. */
  hideChevron?: boolean
  /** `card`: a bordered row for a feed of offers. `plain`: no box and a larger photo, for a
   *  menu of options inside a detail page, where every row already sits on one surface. */
  variant?: 'card' | 'plain'
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
      // The corner comes from the row (--offer-media-radius), so it nests inside the card's.
      // An outline at 5% foreground keeps a pale photo from bleeding into the white card.
      className={cn(
        'size-16 @md:size-20 shrink-0 rounded-[var(--offer-media-radius)] bg-muted object-cover',
        'outline outline-1 -outline-offset-1 outline-foreground/5',
        'group-data-[variant=plain]/row:size-20 @md:group-data-[variant=plain]/row:size-24',
        className
      )}
      {...props}
    />
  )
}

function Body({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    // Centred against the photo while the text is short; once it runs taller, the row's
    // items-start takes over and the photo stays pinned to the top
    <div className={cn('flex min-h-16 @md:min-h-20 min-w-0 flex-1 flex-col items-start justify-center gap-1', className)} {...props}>
      {children}
    </div>
  )
}

const tagToneClasses = {
  primary: 'text-primary',
  success: 'text-success',
  muted: 'text-muted-foreground',
}

interface TagProps extends Omit<ComponentPropsWithRef<'p'>, 'children'> {
  label: string
  tone?: keyof typeof tagToneClasses
}

// The deal, set as a small coloured label above the title rather than a filled pill: it leads
// the eye without a second shape competing with the photo, and stays smaller than the title so
// the hierarchy reads label → title → detail
function Tag({ label, tone = 'primary', className, ...props }: TagProps) {
  return (
    <p className={cn('text-[0.6875rem] @md:text-xs font-semibold uppercase tracking-wide', tagToneClasses[tone], className)} {...props}>
      {label}
    </p>
  )
}

interface TitleProps extends ComponentPropsWithRef<'h3'> {
  /** Makes the whole card a link to this address. */
  href?: string
}

function Title({ href, children, className, ...props }: TitleProps) {
  return (
    <h3 className={cn('text-base @md:text-lg font-semibold leading-snug tracking-tight text-foreground', className)} {...props}>
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

function Description({ children, className, ...props }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={cn('text-sm text-muted-foreground line-clamp-2', className)} {...props}>
      {children}
    </p>
  )
}

interface MetaProps extends ComponentPropsWithRef<'p'> {
  /** Marks a deadline that is close, e.g. "Ends in 2 days": a clock and full-strength text. */
  urgent?: boolean
}

function Meta({ urgent = false, children, className, ...props }: MetaProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-1 text-xs @md:text-sm',
        urgent ? 'font-medium text-foreground' : 'text-muted-foreground',
        className
      )}
      {...props}
    >
      {urgent && <Clock aria-hidden="true" className="size-3.5 @md:size-4 shrink-0" />}
      {children}
    </p>
  )
}

export function MediaListItem({ hideChevron = false, variant = 'card', children, className, ...props }: MediaListItemProps) {
  return (
    // No hover lift: rows in a list that jump under the cursor read as noise. The shadow
    // deepening is feedback enough.
    <article
      data-variant={variant}
      className={cn(
        'group/row relative flex items-start gap-3',
        variant === 'card'
          ? [
              // 12px at every width: the standard for a compact card, and the padding the nested
              // corner below is worked out from
              'rounded-xl border border-border bg-card p-3',
              'shadow-[var(--shadow-sm)] transition-shadow duration-200 has-[a:hover]:shadow-[var(--shadow-card)]',
              // Nested corners: inner radius = outer radius − padding, so the photo's curve runs
              // parallel to the card's. max() keeps it at 0 when a theme sets --radius: 0.
              '[--offer-media-radius:max(0px,calc(var(--radius-xl)-0.75rem))]',
            ]
          : 'gap-4 py-1 [--offer-media-radius:var(--radius-lg)]',
        className
      )}
      {...props}
    >
      {children}
      {!hideChevron && (
        <ChevronRight
          aria-hidden="true"
          className="size-4 @md:size-5 shrink-0 self-center text-muted-foreground/60 transition-transform duration-200 ease-out group-has-[a:hover]/row:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
    </article>
  )
}

MediaListItem.Media = Media
MediaListItem.Body = Body
MediaListItem.Tag = Tag
MediaListItem.Title = Title
MediaListItem.Description = Description
MediaListItem.Meta = Meta
