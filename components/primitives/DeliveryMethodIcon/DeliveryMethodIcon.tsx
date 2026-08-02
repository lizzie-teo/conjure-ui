import { Home, Car, type LucideProps } from 'lucide-react'
import { cn } from '../../../lib/utils'

export type DeliveryMethodType = 'home-delivery' | 'click-collect'

export interface DeliveryMethodIconProps extends Omit<LucideProps, 'size'> {
  type: DeliveryMethodType
  size?: number
}

export function DeliveryMethodIcon({ type, size = 24, className, ...props }: DeliveryMethodIconProps) {
  const Icon = type === 'home-delivery' ? Home : Car
  return <Icon size={size} className={cn('shrink-0', className)} {...props} />
}
