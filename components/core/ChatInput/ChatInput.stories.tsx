'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChatInput } from './ChatInput'

const meta = {
  title: 'Components/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  args: { onSend: () => {} },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ChatInput {...args}>
      <ChatInput.Field placeholder="Type a message…" />
      <ChatInput.Send />
    </ChatInput>
  ),
}

export const WithSentLog: Story = {
  name: 'With sent message log',
  render: () => {
    const [messages, setMessages] = useState<string[]>([])
    return (
      <div className="flex flex-col gap-4 max-w-md">
        <div className="flex flex-col gap-2 min-h-[80px]">
          {messages.length === 0 ? (
            <p className="text-xs text-muted-foreground">Send a message…</p>
          ) : (
            messages.map((m, i) => (
              <div key={i} className="self-end bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 text-sm">
                {m}
              </div>
            ))
          )}
        </div>
        <ChatInput onSend={(v) => setMessages((prev) => [...prev, v])}>
          <ChatInput.Field placeholder="Type a message…" />
          <ChatInput.Send />
        </ChatInput>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <ChatInput {...args}>
      <ChatInput.Field placeholder="Waiting for response…" />
      <ChatInput.Send />
    </ChatInput>
  ),
}
