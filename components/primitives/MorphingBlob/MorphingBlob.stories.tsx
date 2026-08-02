import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MorphingBlob } from './MorphingBlob'

const meta = {
  title: 'Primitives/MorphingBlob',
  component: MorphingBlob,
  tags: ['autodocs'],
  args: { size: 'md' },
} satisfies Meta<typeof MorphingBlob>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Medium: Story = {
  args: { size: 'md' },
}

export const Small: Story = {
  args: { size: 'sm' },
}

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <MorphingBlob size="sm" />
        <span className="text-xs text-muted-foreground">sm · 32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <MorphingBlob size="md" />
        <span className="text-xs text-muted-foreground">md · 48px</span>
      </div>
    </div>
  ),
}

export const ReducedMotion: Story = {
  name: 'Reduced motion',
  parameters: {
    docs: {
      description: {
        story:
          'Renders as a static circle with no morph animation. Enable "Reduce motion" in OS accessibility settings to activate.',
      },
    },
  },
}
