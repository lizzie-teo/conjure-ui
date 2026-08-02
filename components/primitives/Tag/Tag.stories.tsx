'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AnimatePresence } from 'motion/react'
import { Tag } from './Tag'

const meta = {
  title: 'Primitives/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { label: 'Economy' },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithRemove: Story = {
  name: 'With remove button',
  args: { label: 'Economy', onRemove: () => {} },
}

export const RemovableList: Story = {
  name: 'Removable list',
  render: () => {
    const [tags, setTags] = useState(['Economy', 'Direct', 'Morning'])
    return (
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
            />
          ))}
        </AnimatePresence>
      </div>
    )
  },
}
