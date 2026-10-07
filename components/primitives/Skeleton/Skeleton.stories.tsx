import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { shape: 'line', lines: 3 },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Line: Story = {
  args: { shape: 'line', lines: 3 },
}

export const Heading: Story = {
  args: { shape: 'heading' },
}

export const Code: Story = {
  args: { shape: 'code', lines: 4 },
}

export const BulletList: Story = {
  name: 'Bullet list',
  args: { shape: 'bullet-list', lines: 4 },
}

export const AllShapes: Story = {
  name: 'All shapes',
  render: () => (
    <div className="flex flex-col gap-8 max-w-sm @md:max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-medium">heading</span>
        <Skeleton shape="heading" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-medium">line × 3</span>
        <Skeleton shape="line" lines={3} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-medium">bullet-list × 4</span>
        <Skeleton shape="bullet-list" lines={4} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground font-medium">code × 4</span>
        <Skeleton shape="code" lines={4} />
      </div>
    </div>
  ),
}

export const ReducedMotion: Story = {
  name: 'Reduced motion',
  args: { shape: 'line', lines: 3 },
  parameters: {
    docs: {
      description: {
        story:
          'Renders as a static muted block with no shimmer. Enable "Reduce motion" in OS accessibility settings to activate.',
      },
    },
  },
}
