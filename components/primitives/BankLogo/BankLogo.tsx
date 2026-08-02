'use client'

import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../lib/utils'

export interface BankLogoProps extends Omit<ComponentPropsWithRef<'img'>, 'size'> {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'size-6 md:size-5',
  md: 'size-9 md:size-8',
  lg: 'size-12 md:size-11',
}

export function BankLogo({ src, alt, size = 'md', className, ...props }: BankLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-contain', sizes[size], className)}
      draggable={false}
      {...props}
    />
  )
}
