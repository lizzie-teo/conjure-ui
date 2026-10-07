import type { ComponentPropsWithRef } from 'react'
import { Button } from '../../ui/button'
import { FeatureList, type FeatureListProps } from '../../primitives/FeatureList/FeatureList'
import { cn } from '../../../lib/utils'

// The whole card sits on bg-primary, so a client's brand colour carries the hero and the photo
// fades into it. Every child therefore draws in primary-foreground, never primary.

export type PromoCardProps = ComponentPropsWithRef<'article'>

interface MediaProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  src: string
  alt: string
}

function Media({ src, alt, className, ...props }: MediaProps) {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <img src={src} alt={alt} className="w-full h-56 @md:h-64 @3xl:h-72 object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-b from-transparent via-primary/60 to-primary"
      />
    </div>
  )
}

function Body({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    // Pulled up over the fade so the title reads against the photo's darkest band
    <div
      className={cn('relative -mt-16 @md:-mt-20 flex flex-col gap-4 @md:gap-5 p-4 @md:p-6 @3xl:p-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function Title({ children, className, ...props }: ComponentPropsWithRef<'h3'>) {
  return (
    <h3
      className={cn(
        'font-heading text-2xl @md:text-3xl font-semibold tracking-tight leading-tight text-primary-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function Features(props: Omit<FeatureListProps, 'tone'>) {
  return <FeatureList tone="inverse" {...props} />
}

function Pricing({ children, className, ...props }: ComponentPropsWithRef<'div'>) {
  return (
    // pt-3 leaves room for a StatCard badge, which overhangs its tile's top edge
    <div className={cn('grid grid-cols-2 gap-2 @md:gap-3 pt-3', className)} {...props}>
      {children}
    </div>
  )
}

function Action({ className, ...props }: ComponentPropsWithRef<typeof Button>) {
  return (
    <Button
      className={cn(
        'w-full h-12 @md:h-10 pointer-coarse:min-h-11 text-sm @md:text-base',
        'bg-primary-foreground text-primary hover:bg-primary-foreground/90',
        'focus-visible:ring-primary-foreground/50',
        className
      )}
      {...props}
    />
  )
}

export function PromoCard({ children, className, ...props }: PromoCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-card)]',
        className
      )}
      {...props}
    >
      {children}
    </article>
  )
}

PromoCard.Media = Media
PromoCard.Body = Body
PromoCard.Title = Title
PromoCard.Features = Features
PromoCard.Pricing = Pricing
PromoCard.Action = Action
