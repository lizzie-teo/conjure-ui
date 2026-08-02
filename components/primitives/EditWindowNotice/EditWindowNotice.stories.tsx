import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EditWindowNotice } from './EditWindowNotice'

const meta = {
  title: 'Primitives/EditWindowNotice',
  component: EditWindowNotice,
  tags: ['autodocs'],
} satisfies Meta<typeof EditWindowNotice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { editableUntil: '2026-06-09T14:00:00.000Z' },
}
