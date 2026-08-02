import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RewardsStep } from './RewardsStep'

const rewards = {
  programName: 'Everyday Rewards',
  currentPoints: 1200,
  pointsEarned: 150,
  pointsValue: 6.0,
  currency: 'AUD',
}

const rewardsWithBonus = {
  ...rewards,
  bonusPointsAvailable: 500,
  bonusPrompt: 'Add $5 more to earn 500 bonus points',
}

const meta = {
  title: 'Components/RewardsStep',
  component: RewardsStep,
  tags: ['autodocs'],
  args: {
    rewards,
    redeemPoints: false,
    substitution: 'allow',
    onRedeemToggle: () => {},
    onSubstitutionChange: () => {},
  },
} satisfies Meta<typeof RewardsStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default — earn only',
}

export const WithBonusPrompt: Story = {
  name: 'With bonus prompt',
  args: { rewards: rewardsWithBonus },
}

export const RedeemActive: Story = {
  name: 'Points redemption on',
  args: { redeemPoints: true },
}

export const SubstitutionNotify: Story = {
  name: 'Substitution — notify me',
  args: { substitution: 'notify' },
}

export const SubstitutionDeny: Story = {
  name: 'Substitution — don\'t substitute',
  args: { substitution: 'deny' },
}
