import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BiometricIndicator } from './BiometricIndicator'

const meta = {
  title: 'Primitives/BiometricIndicator',
  component: BiometricIndicator,
  tags: ['autodocs'],
  args: { state: 'idle' },
} satisfies Meta<typeof BiometricIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Idle: Story = { args: { state: 'idle' } }
export const Pending: Story = { args: { state: 'pending' } }
export const Success: Story = { args: { state: 'success' } }
export const Error: Story = { args: { state: 'error' } }

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div className="flex flex-wrap justify-center items-center gap-10">
      {(['idle', 'pending', 'success', 'error'] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-3">
          <BiometricIndicator state={state} />
          <span className="text-xs text-muted-foreground capitalize">{state}</span>
        </div>
      ))}
    </div>
  ),
}

export const ReducedMotion: Story = {
  name: 'Reduced motion (test via DevTools → prefers-reduced-motion: reduce)',
  args: { state: 'pending' },
  parameters: {
    chromatic: { prefersReducedMotion: 'reduce' },
  },
}
