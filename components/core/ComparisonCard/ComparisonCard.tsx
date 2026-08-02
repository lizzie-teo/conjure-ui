'use client'

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react'
import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import type { MotionDivProps } from '../../../lib/prop-types'

export interface ComparisonPlan {
  id: string
  label: string
}

export interface ComparisonCaveat {
  id: string
  label: string
  /** Annual cost for each plan, keyed by plan id */
  planCosts: Record<string, number>
  /** Pre-selected on mount */
  default?: boolean
}

export interface ComparisonScenario {
  id: string
  label: string
  /** Insight text shown when this scenario is active */
  insight: string
}

export interface ComparisonCardProps extends Omit<MotionDivProps, 'children' | 'title'> {
  /** Card heading, e.g. "Why Comprehensive?" */
  title: string
  /** Cost basis note shown below title */
  subtitle?: string
  /** Question label above caveat pills */
  caveatQuestion?: string
  plans: ComparisonPlan[]
  caveats: ComparisonCaveat[]
  scenarios?: ComparisonScenario[]
  currency?: string
  onViewDetails?: () => void
}

const EASE_OUT = [0, 0, 0.2, 1] as const
const SPRING = { type: 'spring', stiffness: 280, damping: 28 } as const

export function ComparisonCard({
  title,
  subtitle,
  caveatQuestion = 'Does this apply to you?',
  plans,
  caveats,
  scenarios,
  currency = '$',
  onViewDetails,
  className,
  ...props
}: ComparisonCardProps) {
  const shouldReduce = useReducedMotion()

  const defaultCaveat = caveats.find(c => c.default) ?? caveats[0]
  const [selectedCaveatId, setSelectedCaveatId] = useState(defaultCaveat?.id ?? '')
  const [showScenarios, setShowScenarios] = useState(false)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null)

  const activeCaveat = caveats.find(c => c.id === selectedCaveatId) ?? caveats[0]
  const planCostList = plans.map(p => activeCaveat.planCosts[p.id] ?? 0)
  const maxCost = Math.max(...planCostList)
  const minCost = Math.min(...planCostList)
  const winnerPlanId = plans[planCostList.indexOf(minCost)]?.id ?? plans[0]?.id
  const winnerPlan = plans.find(p => p.id === winnerPlanId)
  const savings = maxCost - minCost

  const activeScenario = scenarios?.find(s => s.id === selectedScenarioId)

  function fmt(n: number) {
    return `${currency}${n.toLocaleString()}`
  }

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className={cn(
        'rounded-[var(--radius)] border border-border bg-card shadow-[var(--shadow-card)]',
        'p-4 md:p-5 flex flex-col gap-4',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div>
        <p className="text-sm md:text-base font-semibold text-foreground">{title}</p>
        {subtitle && (
          <p className="mt-0.5 text-xs md:text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Side-by-side plan tiles — "Best for you" badge slides via layoutId */}
      <LayoutGroup>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {plans.map(plan => {
            const cost = activeCaveat.planCosts[plan.id] ?? 0
            const barPct = maxCost > 0 ? (cost / maxCost) * 100 : 0
            const isWinner = plan.id === winnerPlanId

            return (
              <div
                key={plan.id}
                className={cn(
                  'flex flex-col rounded-xl p-3 md:p-4 border-2 transition-colors duration-200',
                  isWinner ? 'border-primary bg-primary/5' : 'border-border bg-muted/20'
                )}
              >
                {/* Badge row — fixed height on both tiles so plan names stay aligned */}
                <div className="h-5 md:h-6 mb-1.5 md:mb-2">
                  {isWinner && (
                    <motion.span
                      layoutId="winner-badge"
                      className="inline-flex items-center text-[10px] md:text-xs font-semibold text-primary-foreground bg-primary rounded-full px-2 py-0.5"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      Best for you
                    </motion.span>
                  )}
                </div>

                {/* Plan name */}
                <p className={cn(
                  'text-[11px] md:text-xs leading-tight mb-1 md:mb-1.5',
                  isWinner ? 'text-foreground/60' : 'text-muted-foreground'
                )}>
                  {plan.label}
                </p>

                {/* Cost — the hero number */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`${plan.id}-${cost}`}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduce ? 0 : 5 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="flex items-baseline gap-0.5"
                  >
                    <span className={cn(
                      'text-xl md:text-2xl font-bold tabular-nums leading-none',
                      isWinner ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {fmt(cost)}
                    </span>
                    <span className="text-[10px] md:text-xs text-muted-foreground font-normal">/yr</span>
                  </motion.div>
                </AnimatePresence>

                {/* Relative cost bar — pushed to tile bottom by mt-auto */}
                <div className="mt-auto pt-3 md:pt-4">
                  <div className="h-1 md:h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={cn(
                        'h-full rounded-full',
                        isWinner ? 'bg-primary' : 'bg-muted-foreground/25'
                      )}
                      animate={{ width: `${barPct}%` }}
                      transition={shouldReduce ? { duration: 0 } : SPRING}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </LayoutGroup>

      {/* Savings callout — re-mounts when winner changes for fade transition */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={winnerPlanId}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduce ? 0 : -4 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-xs md:text-sm font-medium text-success"
        >
          <span aria-hidden="true">✓</span>
          <span>
            {winnerPlan
              ? `${winnerPlan.label} saves ~${fmt(savings)}/year`
              : `Save ~${fmt(savings)}/year`}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="h-px bg-border -mx-4 md:-mx-5" />

      {/* Caveat pills */}
      {caveats.length > 1 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm text-muted-foreground">{caveatQuestion}</p>
          <div
            className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none"
            role="group"
            aria-label={caveatQuestion}
          >
            {caveats.map(caveat => {
              const isSelected = caveat.id === selectedCaveatId
              return (
                <Button
                  key={caveat.id}
                  onClick={() => setSelectedCaveatId(caveat.id)}
                  aria-pressed={isSelected}
                  variant="ghost"
                  className={cn(
                    'shrink-0 h-auto rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap',
                    'transition-colors duration-100',
                    isSelected
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {caveat.label}
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* What-if section */}
      {scenarios && scenarios.length > 0 && (
        <AnimatePresence initial={false} mode="wait">
          {!showScenarios ? (
            <motion.div
              key="what-if-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="self-start"
            >
              <Button
                variant="ghost"
                onClick={() => setShowScenarios(true)}
                className="h-auto p-0 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors duration-100"
              >
                What if something unexpected happened? →
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="what-if-expanded"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="flex flex-col gap-2.5"
            >
              <div
                className="flex gap-2 flex-wrap"
                role="group"
                aria-label="Scenario options"
              >
                {scenarios.map(scenario => {
                  const isSelected = scenario.id === selectedScenarioId
                  return (
                    <Button
                      key={scenario.id}
                      onClick={() => setSelectedScenarioId(isSelected ? null : scenario.id)}
                      aria-pressed={isSelected}
                      variant="outline"
                      className={cn(
                        'h-auto rounded-full px-3.5 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap',
                        'transition-colors duration-100',
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground'
                          : 'bg-card text-foreground border-border hover:border-primary/40 hover:bg-muted/30'
                      )}
                    >
                      {scenario.label}
                    </Button>
                  )
                })}
              </div>

              <AnimatePresence initial={false}>
                {activeScenario && (
                  <motion.p
                    key={activeScenario.id}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="text-xs md:text-sm text-foreground leading-relaxed"
                  >
                    {activeScenario.insight}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Footer */}
      {onViewDetails && (
        <div className="flex justify-end -mb-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="text-primary hover:text-primary/80 -mr-2 h-auto py-1.5 px-2 text-xs md:text-sm font-semibold"
          >
            See full details →
          </Button>
        </div>
      )}
    </motion.div>
  )
}
