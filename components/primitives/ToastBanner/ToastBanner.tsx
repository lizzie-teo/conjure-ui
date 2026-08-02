'use client'

import { useEffect, useRef, type ComponentPropsWithRef } from 'react'
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { motion, useReducedMotion, AnimatePresence } from 'motion/react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'
import type { MotionDivProps } from '../../../lib/prop-types'

const variantConfig = {
  info: {
    icon: Info,
    className: 'bg-primary/10 text-primary border-primary/20',
    role: 'status' as const,
  },
  success: {
    icon: CheckCircle,
    className: 'bg-success/10 text-success border-success/20',
    role: 'status' as const,
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-warning/10 text-warning border-warning/20',
    role: 'alert' as const,
  },
  error: {
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    role: 'alert' as const,
  },
}

export interface ToastBannerProps extends Omit<MotionDivProps, 'children'> {
  message: string
  variant?: keyof typeof variantConfig
  duration?: number
  onDismiss?: () => void
}

export function ToastBanner({
  message,
  variant = 'info',
  duration = 4000,
  onDismiss,
  className,
  ...props
}: ToastBannerProps) {
  const shouldReduce = useReducedMotion()
  const { icon: Icon, className: variantClass, role } = variantConfig[variant]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (duration > 0 && onDismiss) {
      timerRef.current = setTimeout(onDismiss, duration)
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [duration, onDismiss])

  return (
    <motion.div
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      initial={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      className={cn(
        'relative flex items-start gap-2.5 md:gap-3 overflow-hidden',
        'px-3 py-2.5 md:px-4 md:py-3 rounded-[var(--radius)] border',
        'text-sm md:text-base',
        variantClass,
        className
      )}
      {...props}
    >
      <Icon className="size-4 md:size-5 shrink-0 mt-0.5" aria-hidden />
      <span className="flex-1 min-w-0 leading-snug">{message}</span>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 opacity-70 hover:opacity-100 hover:bg-transparent transition-opacity focus-visible:ring-current"
        >
          <X className="size-4 md:size-5" aria-hidden />
        </Button>
      )}
      {duration > 0 && !shouldReduce && onDismiss && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-current opacity-30"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}

export type ToastBannerGroupProps = ComponentPropsWithRef<'div'>

export function ToastBannerGroup({ children, className, ...props }: ToastBannerGroupProps) {
  return (
    <AnimatePresence mode="popLayout">
      <div className={cn('flex flex-col gap-2', className)} {...props}>
        {children}
      </div>
    </AnimatePresence>
  )
}
