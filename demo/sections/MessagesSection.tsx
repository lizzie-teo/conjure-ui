import { MessageBubble } from '@/components/core/MessageBubble/MessageBubble'
import { TypingIndicator } from '@/components/core/TypingIndicator/TypingIndicator'

const PAST = (ms: number) => new Date(Date.now() - ms).toISOString()

export function MessagesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground">Messages</h2>

      <div className="flex flex-col gap-4 max-w-lg">
        <MessageBubble role="user">
          <div className="flex flex-col gap-1 items-end">
            <MessageBubble.Content>Show me flights to Tokyo next Tuesday</MessageBubble.Content>
            <MessageBubble.Timestamp datetime={PAST(180_000)} />
          </div>
        </MessageBubble>

        <MessageBubble role="assistant">
          <MessageBubble.Avatar fallback="AI" />
          <div className="flex flex-col gap-1">
            <MessageBubble.Content>
              I found 3 direct flights to Tokyo departing Tuesday, 10 June.
            </MessageBubble.Content>
          </div>
        </MessageBubble>

        <MessageBubble role="assistant" grouped>
          <MessageBubble.Avatar fallback="AI" />
          <div className="flex flex-col gap-1">
            <MessageBubble.Content>
              Economy from $899 with Qantas, Japan Airlines, and ANA.
            </MessageBubble.Content>
            <MessageBubble.Timestamp datetime={PAST(120_000)} />
          </div>
        </MessageBubble>

        <MessageBubble role="user">
          <div className="flex flex-col gap-1 items-end">
            <MessageBubble.Content>What’s the cheapest option?</MessageBubble.Content>
            <MessageBubble.Timestamp datetime={PAST(60_000)} />
          </div>
        </MessageBubble>

        <MessageBubble role="assistant" isGenerating>
          <MessageBubble.Avatar fallback="AI" />
        </MessageBubble>

        <TypingIndicator />
      </div>
    </section>
  )
}
