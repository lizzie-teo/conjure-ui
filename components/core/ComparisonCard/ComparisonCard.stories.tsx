'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ComparisonCard } from './ComparisonCard'

const meta = {
  title: 'Components/ComparisonCard',
  component: ComparisonCard,
  tags: ['autodocs'],
  excludeStories: ['CAR_PLANS', 'CAR_CAVEATS', 'CAR_SCENARIOS'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComparisonCard>

export default meta
type Story = StoryObj<typeof meta>

export const CAR_PLANS = [
  { id: 'basic', label: 'Basic cover' },
  { id: 'comprehensive', label: 'Comprehensive' },
]

export const CAR_CAVEATS = [
  {
    id: 'none',
    label: 'No claims',
    planCosts: { basic: 1068, comprehensive: 1524 },
  },
  {
    id: '1-2',
    label: '1–2 claims',
    planCosts: { basic: 1980, comprehensive: 1620 },
    default: true,
  },
  {
    id: '3+',
    label: '3+ claims',
    planCosts: { basic: 3200, comprehensive: 1860 },
  },
]

export const CAR_SCENARIOS = [
  {
    id: 'accident',
    label: 'At-fault accident',
    insight:
      'If you had an at-fault accident with $7,000 in repairs, Comprehensive covers it minus your $750 excess. On Basic, you pay the full $7,000 out of pocket.',
  },
  {
    id: 'hail',
    label: 'Hail damage',
    insight:
      'Comprehensive includes storm and hail damage. The average hail claim is $2,400 — Basic wouldn\'t cover a cent of it.',
  },
  {
    id: 'theft',
    label: 'Car theft',
    insight:
      'If your car was stolen, Comprehensive pays out market value minus your excess. Basic leaves you with nothing.',
  },
  {
    id: 'nothing',
    label: 'Nothing major',
    insight:
      'If you stay incident-free, Basic saves you $456 in premiums this year. But one claim changes the maths significantly.',
  },
]

export const Default: Story = {
  name: 'Car insurance — default (1–2 claims)',
  args: {
    title: 'Why Comprehensive?',
    subtitle: 'Expected annual cost (incl. avg. claim risk)',
    caveatQuestion: 'How many at-fault claims in the last 5 years?',
    plans: CAR_PLANS,
    caveats: CAR_CAVEATS,
    scenarios: CAR_SCENARIOS,
    currency: '$',
    onViewDetails: () => alert('View full details'),
  },
}

export const BasicWins: Story = {
  name: 'Car insurance — Basic wins (no claims)',
  args: {
    ...Default.args,
    caveats: CAR_CAVEATS.map(c => ({ ...c, default: c.id === 'none' })),
  },
}

export const Interactive: Story = {
  name: 'Interactive demo',
  args: {
    title: 'Why Comprehensive?',
    subtitle: 'Expected annual cost (incl. avg. claim risk)',
    caveatQuestion: 'How many at-fault claims in the last 5 years?',
    plans: CAR_PLANS,
    caveats: CAR_CAVEATS,
    scenarios: CAR_SCENARIOS,
    currency: '$',
  },
  render: () => {
    const [sheetOpen, setSheetOpen] = useState(false)
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground px-1">
          Select a claims history pill to see bars update. Expand “What if?” for scenario modelling.
        </p>
        <ComparisonCard
          title="Why Comprehensive?"
          subtitle="Expected annual cost (incl. avg. claim risk)"
          caveatQuestion="How many at-fault claims in the last 5 years?"
          plans={CAR_PLANS}
          caveats={CAR_CAVEATS}
          scenarios={CAR_SCENARIOS}
          currency="$"
          onViewDetails={() => setSheetOpen(true)}
        />
        {sheetOpen && (
          <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Full details sheet would open here (use <code>ModalSheet</code>).
          </div>
        )}
      </div>
    )
  },
}

export const HealthInsurance: Story = {
  name: 'Health insurance (generic)',
  args: {
    title: 'Why Plan B?',
    subtitle: 'Annual cost for typical usage',
    caveatQuestion: 'How often do you use prescriptions?',
    plans: [
      { id: 'plan-a', label: 'Plan A' },
      { id: 'plan-b', label: 'Plan B' },
    ],
    caveats: [
      {
        id: 'rarely',
        label: 'Rarely',
        planCosts: { 'plan-a': 2880, 'plan-b': 3168 },
      },
      {
        id: 'monthly',
        label: 'Monthly',
        planCosts: { 'plan-a': 3840, 'plan-b': 2640 },
        default: true,
      },
      {
        id: 'weekly',
        label: 'Weekly',
        planCosts: { 'plan-a': 5200, 'plan-b': 2880 },
      },
    ],
    currency: '$',
  },
}

export const NoScenarios: Story = {
  name: 'Without what-if scenarios',
  args: {
    title: 'Why Comprehensive?',
    subtitle: 'Expected annual cost (incl. avg. claim risk)',
    caveatQuestion: 'How many at-fault claims in the last 5 years?',
    plans: CAR_PLANS,
    caveats: CAR_CAVEATS,
    currency: '$',
  },
}
