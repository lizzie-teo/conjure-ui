'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BankLogo } from './BankLogo'
import { BANK_LOGOS } from '../bank-logos/logos'

type BankEntry = { slug: string; label: string }

export const GLOBAL: BankEntry[] = [
  { slug: 'chase.svg',             label: 'Chase' },
  { slug: 'bankofamerica.svg',     label: 'Bank of America' },
  { slug: 'wellsfargo.svg',        label: 'Wells Fargo' },
  { slug: 'hsbc.svg',              label: 'HSBC' },
  { slug: 'barclays.svg',          label: 'Barclays' },
  { slug: 'goldmansachs.svg',      label: 'Goldman Sachs' },
  { slug: 'deutschebank.svg',      label: 'Deutsche Bank' },
  { slug: 'commerzbank.svg',       label: 'Commerzbank' },
  { slug: 'caixabank.svg',         label: 'CaixaBank' },
  { slug: 'monzo.svg',             label: 'Monzo' },
  { slug: 'revolut.svg',           label: 'Revolut' },
  { slug: 'starlingbank.svg',      label: 'Starling Bank' },
  { slug: 'wise.svg',              label: 'Wise' },
  { slug: 'nubank.svg',            label: 'Nubank' },
  { slug: 'citibank.png',          label: 'Citibank' },
  { slug: 'santander.png',         label: 'Santander' },
  { slug: 'ing.png',               label: 'ING' },
  { slug: 'capitalone.png',        label: 'Capital One' },
  { slug: 'lloydsbank.png',        label: 'Lloyds Bank' },
  { slug: 'natwest.png',           label: 'NatWest' },
  { slug: 'standardchartered.png', label: 'Standard Chartered' },
  { slug: 'jpmorgan.png',          label: 'JPMorgan' },
  { slug: 'ubs.png',               label: 'UBS' },
  { slug: 'rbs.png',               label: 'RBS' },
  { slug: 'bmo.png',               label: 'BMO' },
  { slug: 'td.png',                label: 'TD Bank' },
  { slug: 'bnpparibas.png',        label: 'BNP Paribas' },
]

export const AUSTRALIA: BankEntry[] = [
  { slug: 'commbank.png',    label: 'Commonwealth Bank' },
  { slug: 'anz.png',         label: 'ANZ' },
  { slug: 'westpac.png',     label: 'Westpac' },
  { slug: 'nab.png',         label: 'NAB' },
  { slug: 'macquarie.png',   label: 'Macquarie' },
  { slug: 'suncorp.png',     label: 'Suncorp' },
  { slug: 'bendigobank.png', label: 'Bendigo Bank' },
  { slug: 'bankwest.png',    label: 'Bankwest' },
  { slug: 'ing.png',         label: 'ING Australia' },
  { slug: 'mebank.png',      label: 'ME Bank' },
  { slug: 'rabobank.png',    label: 'Rabobank' },
  { slug: 'banksa.png',      label: 'Bank SA' },
  { slug: 'stgeorge.png',    label: 'St George' },
  { slug: 'boq.png',         label: 'Bank of Queensland' },
  { slug: 'up.png',          label: 'Up Bank' },
]

export const SINGAPORE: BankEntry[] = [
  { slug: 'dbs.png',               label: 'DBS' },
  { slug: 'ocbc.png',              label: 'OCBC' },
  { slug: 'maybank.png',           label: 'Maybank' },
  { slug: 'standardchartered.png', label: 'Standard Chartered' },
  { slug: 'citibank.png',          label: 'Citibank' },
  { slug: 'posb.png',              label: 'POSB' },
]

export const JAPAN: BankEntry[] = [
  { slug: 'mufg.png',      label: 'MUFG' },
  { slug: 'smbc.png',      label: 'SMBC' },
  { slug: 'mizuho.png',    label: 'Mizuho' },
  { slug: 'japanpost.png', label: 'Japan Post Bank' },
  { slug: 'rakuten.svg',   label: 'Rakuten Bank' },
  { slug: 'sbibank.png',   label: 'SBI Shinsei' },
]

export const NEW_ZEALAND: BankEntry[] = [
  { slug: 'anz.png',       label: 'ANZ' },
  { slug: 'bnz.png',       label: 'BNZ' },
  { slug: 'asb.png',       label: 'ASB' },
  { slug: 'kiwibank.png',  label: 'Kiwibank' },
  { slug: 'westpac.png',   label: 'Westpac' },
  { slug: 'tsb.png',       label: 'TSB' },
  { slug: 'heartland.png', label: 'Heartland Bank' },
]

export const REGIONS = [
  { key: 'global',      label: 'Global',      banks: GLOBAL },
  { key: 'australia',   label: 'Australia',   banks: AUSTRALIA },
  { key: 'singapore',   label: 'Singapore',   banks: SINGAPORE },
  { key: 'japan',       label: 'Japan',       banks: JAPAN },
  { key: 'new-zealand', label: 'New Zealand', banks: NEW_ZEALAND },
] as const

type RegionKey = typeof REGIONS[number]['key']

export function LogoGrid({ region, banks }: { region: string; banks: BankEntry[] }) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {banks.map(({ slug, label }) => (
        <div
          key={slug}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 md:p-4 w-20 md:w-24"
        >
          <div className="flex size-10 md:size-12 items-center justify-center">
            <BankLogo src={BANK_LOGOS[`${region}/${slug}`] ?? ''} alt={label} size="lg" />
          </div>
          <span className="text-center text-[10px] leading-tight text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

export function RegionBrowser() {
  const [active, setActive] = useState<RegionKey>('global')
  const current = REGIONS.find(r => r.key === active)!

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-wrap gap-2">
        {REGIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              active === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
      <LogoGrid region={current.key} banks={current.banks} />
    </div>
  )
}

const meta = {
  title: 'Primitives/BankLogo',
  component: BankLogo,
  tags: ['autodocs'],
  // Shared fixtures and render helpers — not stories.
  excludeStories: [
    'GLOBAL',
    'AUSTRALIA',
    'SINGAPORE',
    'JAPAN',
    'NEW_ZEALAND',
    'REGIONS',
    'LogoGrid',
    'RegionBrowser',
  ],
  args: {
    src: BANK_LOGOS['global/chase.svg'],
    alt: 'Chase',
    size: 'md',
  },
} satisfies Meta<typeof BankLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center rounded-xl border border-border bg-card p-3">
            <BankLogo src={BANK_LOGOS['global/chase.svg']} alt="Chase" size={size} />
          </div>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllLogos: Story = {
  name: 'All Logos',
  parameters: { layout: 'fullscreen' },
  render: () => <RegionBrowser />,
}
