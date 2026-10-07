import type { ComponentPropsWithRef } from 'react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// The top of a detail page: a full-bleed photo with round floating buttons (back, share, save),
// and a content sheet that rides up over the photo's bottom edge, with an avatar straddling the
// seam. The overlap is the point — it ties the person or place to the picture, and says "this
// page is about them" before any text is read.

export type DetailHeaderProps = ComponentPropsWithRef<'header'>

interface MediaProps extends ComponentPropsWithRef<'div'> {
  src: string
  alt: string
}

function Media({ src, alt, children, className, ...props }: MediaProps) {
  return (
    <div className={cn('relative h-60 @md:h-80 bg-muted', className)} {...props}>
      <img src={src} alt={alt} className="size-full object-cover" />
      {children}
    </div>
  )
}

// The row of floating buttons over the photo. Put a back Action on the left and the rest in a
// second group on the right.
function Actions({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn('absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3 @md:p-4 pt-[max(0.75rem,env(safe-area-inset-top))]', className)}
      {...props}
    />
  )
}

// A round button that floats on the photo. Card-coloured and blurred so it reads on any picture.
function Action({ className, ...props }: ComponentPropsWithRef<typeof Button>) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'size-10 pointer-coarse:size-11 rounded-full bg-card/85 p-0 text-foreground shadow-[var(--shadow-sm)] backdrop-blur-md',
        'hover:bg-card active:scale-[0.97] [&_svg]:size-4 @md:[&_svg]:size-5',
        className
      )}
      {...props}
    />
  )
}

function Sheet({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={cn(
        'relative -mt-8 flex flex-col items-center gap-2 rounded-t-3xl bg-card px-6 pb-6 text-center',
        // When an Avatar leads the sheet it lifts out of the flow, so make room for its lower half
        'pt-6 has-[[data-slot=detail-avatar]]:pt-14 @md:has-[[data-slot=detail-avatar]]:pt-16',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface AvatarProps extends Omit<ComponentPropsWithRef<'img'>, 'children'> {
  src: string
  alt: string
}

function Avatar({ src, alt, className, ...props }: AvatarProps) {
  return (
    <img
      data-slot="detail-avatar"
      src={src}
      alt={alt}
      className={cn(
        'absolute -top-10 left-1/2 size-20 @md:size-24 -translate-x-1/2 rounded-full bg-muted object-cover',
        'ring-4 ring-card shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    />
  )
}

function Title({ children, className, ...props }: ComponentPropsWithRef<'h1'>) {
  return (
    <h1
      className={cn('font-heading text-2xl @md:text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance', className)}
      {...props}
    >
      {children}
    </h1>
  )
}

function Description({ children, className, ...props }: ComponentPropsWithRef<'p'>) {
  return (
    <p className={cn('max-w-prose text-sm @md:text-base text-muted-foreground text-pretty', className)} {...props}>
      {children}
    </p>
  )
}

function Meta({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    <div className={cn('mt-1 flex flex-col gap-0.5 text-xs @md:text-sm', className)} {...props}>
      {children}
    </div>
  )
}

export function DetailHeader({ children, className, ...props }: DetailHeaderProps) {
  return (
    <header className={cn('relative flex flex-col bg-card', className)} {...props}>
      {children}
    </header>
  )
}

DetailHeader.Media = Media
DetailHeader.Actions = Actions
DetailHeader.Action = Action
DetailHeader.Sheet = Sheet
DetailHeader.Avatar = Avatar
DetailHeader.Title = Title
DetailHeader.Description = Description
DetailHeader.Meta = Meta
