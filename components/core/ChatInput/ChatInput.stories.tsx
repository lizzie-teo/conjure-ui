'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'
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

// ── Interaction tests ─────────────────────────────────────────────────────────

export const SendButtonGatesOnContent: Story = {
  name: 'Test: send is disabled until there is text',
  render: (args) => (
    <ChatInput {...args}>
      <ChatInput.Field />
      <ChatInput.Send />
    </ChatInput>
  ),
  play: async ({ canvas, userEvent }) => {
    const send = canvas.getByRole('button', { name: /send message/i })
    await expect(send).toBeDisabled()

    await userEvent.type(canvas.getByRole('textbox', { name: /message input/i }), 'hello')
    await expect(send).toBeEnabled()
  },
}

export const EnterSendsShiftEnterDoesNot: Story = {
  name: 'Test: Enter sends, Shift+Enter does not',
  render: () => {
    const onSend = fn()
    return (
      <ChatInput onSend={onSend} data-testid="input">
        <ChatInput.Field />
        <ChatInput.Send />
      </ChatInput>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole('textbox', { name: /message input/i })

    // Shift+Enter must insert a newline, not submit
    await userEvent.type(field, 'line one{Shift>}{Enter}{/Shift}line two')
    await expect(field).toHaveValue('line one\nline two')

    // plain Enter submits and clears the field
    await userEvent.type(field, '{Enter}')
    await expect(field).toHaveValue('')
  },
}

export const ForwardsRestPropsToRoot: Story = {
  name: 'Test: forwards rest props to its root',
  render: (args) => (
    <ChatInput {...args} data-testid="chat-input-root" id="composer">
      <ChatInput.Field />
      <ChatInput.Send />
    </ChatInput>
  ),
  play: async ({ canvas }) => {
    // rule 8: unrecognised props reach the DOM so consumers can target the node
    const root = canvas.getByTestId('chat-input-root')
    await expect(root).toHaveAttribute('id', 'composer')
  },
}
