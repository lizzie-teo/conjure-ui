'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { TypingIndicator } from './TypingIndicator'

const meta = {
  title: 'Components/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof TypingIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Togglable: Story = {
  name: 'Toggle visibility',
  render: () => {
    const [isTyping, setIsTyping] = useState(true)
    return (
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {isTyping && <TypingIndicator key="indicator" />}
        </AnimatePresence>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsTyping((v) => !v)}
          className="self-start"
        >
          {isTyping ? 'Hide indicator' : 'Show indicator'}
        </Button>
      </div>
    )
  },
}

export const InContext: Story = {
  name: 'In chat context',
  render: () => (
    <div className="flex flex-col gap-3 p-4 max-w-sm @md:max-w-md bg-background rounded-xl border border-border">
      <div className="text-xs text-muted-foreground">Assistant is typing…</div>
      <TypingIndicator />
    </div>
  ),
}
