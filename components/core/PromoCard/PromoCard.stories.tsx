import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PromoCard, type PromoCardProps } from './PromoCard'
import { StatCard } from '@/components/primitives/StatCard/StatCard'

const WELLNESS_FEATURES = ['Gym and pool access', 'Two massages a year', 'Discounts at partner stores']
const WEEKEND_FEATURES = ['Day trips and tours', 'Dining discounts', 'Cinema tickets']

// The card is compound, so its content lives on the sub-components. These args surface that
// content in Controls; Default's render threads them through.
type PromoCardStoryArgs = PromoCardProps & {
  title: string
  imageSrc: string
  imageAlt: string
  features: string[]
  monthly: number
  yearly: number
  saving: string
  actionLabel: string
}

const meta = {
  title: 'Components/PromoCard',
  component: PromoCard,
  tags: ['autodocs'],
  args: {
    title: 'Wellness plan',
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    imageAlt: 'Two people running outdoors',
    features: WELLNESS_FEATURES,
    monthly: 14.99,
    yearly: 129.99,
    saving: 'Save $49.90',
    actionLabel: 'See plan',
  },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80 @md:w-96"><Story /></div>],
} satisfies Meta<PromoCardStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <PromoCard>
      <PromoCard.Media src={args.imageSrc} alt={args.imageAlt} />
      <PromoCard.Body>
        <PromoCard.Title>{args.title}</PromoCard.Title>
        <PromoCard.Features items={args.features} />
        <PromoCard.Pricing>
          <StatCard tone="inverse" label="Monthly" amount={args.monthly} currency="AUD" />
          <StatCard
            tone="inverse"
            variant="highlight"
            label="Yearly"
            amount={args.yearly}
            currency="AUD"
            badge={args.saving}
          />
        </PromoCard.Pricing>
        <PromoCard.Action>{args.actionLabel}</PromoCard.Action>
      </PromoCard.Body>
    </PromoCard>
  ),
}

export const ValueAndPrice: Story = {
  name: 'Value vs price',
  render: () => (
    <PromoCard>
      <PromoCard.Media
        src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=600&fit=crop"
        alt="People enjoying a day out at a water park"
      />
      <PromoCard.Body>
        <PromoCard.Title>Weekend plan</PromoCard.Title>
        <PromoCard.Features items={WEEKEND_FEATURES} />
        <PromoCard.Pricing>
          <StatCard tone="inverse" variant="highlight" label="Estimated value" amount={300} currency="AUD" orMore />
          <StatCard tone="inverse" label="You pay" amount={150} currency="AUD" />
        </PromoCard.Pricing>
        <PromoCard.Action>Choose plan</PromoCard.Action>
      </PromoCard.Body>
    </PromoCard>
  ),
}

export const NoPricing: Story = {
  name: 'Without pricing',
  render: () => (
    <PromoCard>
      <PromoCard.Media
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
        alt="Two people running outdoors"
      />
      <PromoCard.Body>
        <PromoCard.Title>Wellness plan</PromoCard.Title>
        <PromoCard.Features items={WELLNESS_FEATURES} />
        <PromoCard.Action>Find out more</PromoCard.Action>
      </PromoCard.Body>
    </PromoCard>
  ),
}
