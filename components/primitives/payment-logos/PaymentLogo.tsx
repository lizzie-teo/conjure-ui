'use client'

import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface PaymentLogoProps extends Omit<ComponentPropsWithRef<'img'>, 'size'> {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-5 md:h-4',
  md: 'h-8 md:h-7',
  lg: 'h-10 md:h-9',
}

export function PaymentLogo({ src, alt, size = 'md', className, ...props }: PaymentLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-auto object-contain', sizes[size], className)}
      draggable={false}
      {...props}
    />
  )
}
