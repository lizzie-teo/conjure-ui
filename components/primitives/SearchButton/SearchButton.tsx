import type { ComponentPropsWithRef } from 'react'
import { Search } from 'lucide-react'
import { Button } from '../../ui/button'
import { cn } from '../../../lib/utils'

// The "Start your search" pill: a button that opens a search screen or sheet, not a text field.
// Home screens use it because typing is not the first step — choosing where, when and who is —
// so it promises search without dropping a keyboard on someone who is still browsing. When people
// should type straight away, use SearchBar instead.

export interface SearchButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  label?: string
}

export function SearchButton({ label = 'Start your search', className, ...props }: SearchButtonProps) {
  return (
    <Button
      variant="ghost"
      aria-haspopup="dialog"
      className={cn(
        'h-12 @md:h-14 pointer-coarse:min-h-12 w-full gap-2 rounded-full border border-border bg-card px-5',
        'text-sm @md:text-base font-medium text-foreground shadow-[var(--shadow-card)]',
        'hover:bg-card hover:shadow-[var(--shadow-elevated)] active:scale-[0.99] transition-shadow duration-200',
        className
      )}
      {...props}
    >
      <Search aria-hidden="true" className="size-4 @md:size-5" />
      {label}
    </Button>
  )
}
