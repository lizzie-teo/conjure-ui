import { PrimitivesSection } from './sections/PrimitivesSection'
import { MessagesSection } from './sections/MessagesSection'
import { ChatInputSection } from './sections/ChatInputSection'
import { StackedCardsSection } from './sections/StackedCardsSection'

export function App() {
  return (
    <div className="@container min-h-screen bg-background p-8 md:p-12">
      <div className="max-w-2xl mx-auto space-y-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          conjure-ui
        </h1>
        <PrimitivesSection />
        <MessagesSection />
        <ChatInputSection />
        <StackedCardsSection />
      </div>
    </div>
  )
}
