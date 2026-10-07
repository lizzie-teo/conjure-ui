import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { AccountCard, type AccountCardProps } from './AccountCard'
import { CurrencyAmount } from '@/components/primitives/CurrencyAmount/CurrencyAmount'

type AccountCardStoryArgs = AccountCardProps & {
  name: string
  href: string
  balance: number
  balanceLabel: string
  cardSrc: string
  last4: string
}

const CARD_ART = 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=125&fit=crop'

const ACCOUNTS = [
  { id: 'travel', name: 'Travel card', balance: 6750.45, last4: '4444' },
  { id: 'everyday', name: 'Everyday Account', balance: 1204.1, last4: '1021' },
]

const meta = {
  title: 'Components/AccountCard',
  component: AccountCard,
  tags: ['autodocs'],
  args: {
    name: ACCOUNTS[0].name,
    href: '#travel',
    balance: ACCOUNTS[0].balance,
    balanceLabel: 'Available',
    cardSrc: CARD_ART,
    last4: ACCOUNTS[0].last4,
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<AccountCardStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AccountCard>
      <AccountCard.Header>
        <AccountCard.Name href={args.href}>{args.name}</AccountCard.Name>
        <AccountCard.Balance label={args.balanceLabel}>
          <CurrencyAmount value={args.balance} currency="AUD" locale="en-AU" />
        </AccountCard.Balance>
      </AccountCard.Header>
      <AccountCard.Footer>
        <AccountCard.Media src={args.cardSrc} alt="" />
        <AccountCard.CardNumber last4={args.last4} />
        <AccountCard.Chevron />
      </AccountCard.Footer>
    </AccountCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // One link for the whole card, named by the account
    await expect(canvas.getByRole('link')).toHaveAccessibleName('Travel card')
    // The masked number is spoken as words, not as four bullets
    await expect(canvas.getByText('Card ending in 4444')).toHaveClass('sr-only')
  },
}

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-2 @md:gap-3">
      {ACCOUNTS.map((a) => (
        <AccountCard key={a.id}>
          <AccountCard.Header>
            <AccountCard.Name href={`#${a.id}`}>{a.name}</AccountCard.Name>
            <AccountCard.Balance label="Available">
              <CurrencyAmount value={a.balance} currency="AUD" locale="en-AU" />
            </AccountCard.Balance>
          </AccountCard.Header>
          <AccountCard.Footer>
            <AccountCard.Media src={CARD_ART} alt="" />
            <AccountCard.CardNumber last4={a.last4} />
            <AccountCard.Chevron />
          </AccountCard.Footer>
        </AccountCard>
      ))}
    </div>
  ),
}

export const WithSecondAction: Story = {
  name: 'With a second action',
  render: (args) => (
    <AccountCard>
      <AccountCard.Header>
        <AccountCard.Name href={args.href}>{args.name}</AccountCard.Name>
        <AccountCard.Balance label={args.balanceLabel}>
          <CurrencyAmount value={args.balance} currency="AUD" locale="en-AU" />
        </AccountCard.Balance>
      </AccountCard.Header>
      <AccountCard.Footer>
        <AccountCard.Media src={args.cardSrc} alt="" />
        <AccountCard.CardNumber last4={args.last4} />
        <AccountCard.Action href="#pay" aria-label={`Pay ${args.name}`}>Pay</AccountCard.Action>
      </AccountCard.Footer>
    </AccountCard>
  ),
}
