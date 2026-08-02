import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface AddressTileProps extends Omit<ComponentPropsWithRef<'address'>, 'children'> {
  name: string
  line1: string
  line2?: string
  city: string
  state?: string
  postcode: string
  country: string
  className?: string
}

export function AddressTile({
  name,
  line1,
  line2,
  city,
  state,
  postcode,
  country,
  className,
  ...props
}: AddressTileProps) {
  const cityLine = [city, state, postcode].filter(Boolean).join(', ')

  return (
    <address
      className={cn(
        'not-italic text-xs md:text-sm text-foreground leading-relaxed space-y-0.5',
        className
      )}
      {...props}
    >
      <p className="font-medium">{name}</p>
      <p className="text-muted-foreground">{line1}</p>
      {line2 && <p className="text-muted-foreground">{line2}</p>}
      <p className="text-muted-foreground">{cityLine}</p>
      <p className="text-muted-foreground">{country}</p>
    </address>
  )
}
