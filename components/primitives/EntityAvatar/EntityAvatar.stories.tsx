import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EntityAvatar } from './EntityAvatar'

const meta = {
  title: 'Primitives/EntityAvatar',
  component: EntityAvatar,
  tags: ['autodocs'],
  args: { fallback: 'Qantas Airways', size: 'md' },
} satisfies Meta<typeof EntityAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FallbackInitials: Story = {
  name: 'Fallback (initials)',
}

export const WithImage: Story = {
  name: 'With image',
  args: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Qantas_Airways_Logo.svg/200px-Qantas_Airways_Logo.svg.png',
    alt: 'Qantas logo',
    fallback: 'Qantas Airways',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <EntityAvatar fallback="Qantas Airways" size="sm" />
      <EntityAvatar fallback="Qantas Airways" size="md" />
      <EntityAvatar fallback="Qantas Airways" size="lg" />
    </div>
  ),
}

export const SingleWord: Story = {
  name: 'Single-word fallback',
  args: { fallback: 'Woolworths' },
}

export const Generating: Story = {
  name: 'Generating (breathe loop)',
  args: { isGenerating: true, fallback: 'AI Assistant' },
}

export const ReducedMotion: Story = {
  name: 'Generating — reduced motion (static)',
  parameters: { a11y: { config: { rules: [{ id: 'prefers-reduced-motion', enabled: true }] } } },
  args: { isGenerating: true, fallback: 'AI Assistant' },
}
