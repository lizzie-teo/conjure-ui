import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { AuthPrompt } from './AuthPrompt'

const meta = {
  title: 'Core/AuthPrompt',
  component: AuthPrompt,
  tags: ['autodocs'],
  args: {
    state: 'idle',
    onAuthenticate: () => {},
  },
} satisfies Meta<typeof AuthPrompt>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { state: 'idle' } }

export const Idle: Story = { args: { state: 'idle' } }

export const Pending: Story = { args: { state: 'pending' } }

export const Success: Story = { args: { state: 'success' } }

export const Error: Story = {
  args: {
    state: 'error',
    errorMessage: 'Passkey not recognised. Please try again.',
    onRetry: () => {},
  },
}

export const ErrorNoRetry: Story = {
  name: 'Error — no retry',
  args: {
    state: 'error',
    errorMessage: 'Too many attempts. Contact support.',
  },
}

export const Interactive: Story = {
  name: 'Interactive — walk through states',
  render: () => {
    const states = ['idle', 'pending', 'success', 'error'] as const
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [idx, setIdx] = useState(0)
    const state = states[idx]

    return (
      <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
        <AuthPrompt
          state={state}
          onAuthenticate={() => setIdx(1)}
          onRetry={() => setIdx(0)}
          errorMessage={state === 'error' ? 'Passkey not recognised.' : undefined}
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {states.map((s, i) => (
            <button
              key={s}
              onClick={() => setIdx(i)}
              className={`text-xs px-2 py-1 rounded border ${
                i === idx ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    )
  },
}
