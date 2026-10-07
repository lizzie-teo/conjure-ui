'use client'

import { Check, Minus } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { PriceDisplay } from '../../primitives/PriceDisplay/PriceDisplay'
import { Tag } from '../../primitives/Tag/Tag'
import { Button } from '../../ui/button'
import type { ComponentPropsWithRef } from 'react'

export interface CompareColumn {
  id: string
  label: string
  image?: string
  price: number
  currency?: string
  attributes: Record<string, string | boolean>
}

export interface ComparisonTableProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onSelect'> {
  columns: CompareColumn[]
  attributeLabels: Record<string, string>
  /** Overrides the DOM `onSelect` handler — fires with the chosen column id. */
  onSelect?: (id: string) => void
}

const attributeKeys = (
  columns: CompareColumn[],
  labels: Record<string, string>
) => Object.keys(labels).filter((k) => columns.some((c) => k in c.attributes))

function AttributeValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex items-center justify-center text-success">
        <Check className="size-4 @md:size-5" strokeWidth={2.5} aria-label="Yes" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-muted-foreground/40">
        <Minus className="size-4 @md:size-5" aria-label="No" />
      </span>
    )
  }
  return <Tag label={value} />
}

export function ComparisonTable({
  columns,
  attributeLabels,
  onSelect,
  className,
  ...props
}: ComparisonTableProps) {
  const attrKeys = attributeKeys(columns, attributeLabels)

  return (
    <div className={cn('w-full overflow-x-auto', className)} {...props}>
      <table className="w-full border-collapse text-sm @md:text-base">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 bg-background w-28 @md:w-36 min-w-[7rem] @md:min-w-[9rem] text-left p-3 @md:p-4 border-b border-border text-muted-foreground font-medium text-xs @md:text-sm"
            />
            {columns.map((col) => (
              <th
                key={col.id}
                scope="col"
                className={cn(
                  'min-w-[9rem] @md:min-w-[11rem] p-3 @md:p-4 text-center border-b border-border',
                  'group transition-colors hover:bg-accent/40 focus-within:bg-accent/40'
                )}
              >
                <div className="flex flex-col items-center gap-2 @md:gap-3">
                  {col.image && (
                    <img
                      src={col.image}
                      alt=""
                      className="size-12 @md:size-16 object-contain rounded-[var(--radius)]"
                    />
                  )}
                  <span className="font-semibold text-foreground leading-snug">{col.label}</span>
                  <PriceDisplay amount={col.price} currency={col.currency ?? 'USD'} />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {attrKeys.map((key, rowIdx) => (
            <tr
              key={key}
              className={cn(
                rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
              )}
            >
              <td
                className={cn(
                  'sticky left-0 z-10 p-3 @md:p-4 border-b border-border',
                  'text-xs @md:text-sm font-medium text-muted-foreground',
                  rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                )}
              >
                {attributeLabels[key]}
              </td>
              {columns.map((col) => (
                <td
                  key={col.id}
                  className="p-3 @md:p-4 border-b border-border text-center transition-colors hover:bg-accent/40"
                >
                  {key in col.attributes ? (
                    <div className="flex items-center justify-center">
                      <AttributeValue value={col.attributes[key]} />
                    </div>
                  ) : (
                    <span className="text-muted-foreground/40">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}

          {onSelect && (
            <tr>
              <td className="sticky left-0 z-10 bg-background p-3 @md:p-4" />
              {columns.map((col) => (
                <td key={col.id} className="p-3 @md:p-4 text-center">
                  <Button
                    onClick={() => onSelect(col.id)}
                    className="h-12 @md:h-10 pointer-coarse:min-h-11 w-full"
                    size="sm"
                  >
                    Add to cart
                  </Button>
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
