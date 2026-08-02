'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { WaveformIndicator } from './WaveformIndicator'

const meta = {
  title: 'Primitives/WaveformIndicator',
  component: WaveformIndicator,
  tags: ['autodocs'],
  args: { barCount: 5 },
} satisfies Meta<typeof WaveformIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SevenBars: Story = {
  name: '7 bars',
  args: { barCount: 7 },
}

export const ThreeBars: Story = {
  name: '3 bars',
  args: { barCount: 3 },
}

export const Togglable: Story = {
  name: 'Toggle visibility',
  render: () => {
    const [visible, setVisible] = useState(true)
    return (
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {visible && (
            <motion.div
              key="waveform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <WaveformIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? 'Hide' : 'Show'}
        </Button>
      </div>
    )
  },
}

export const ReducedMotion: Story = {
  name: 'Reduced motion',
  parameters: {
    docs: {
      description: {
        story:
          'Bars render at 60% height with no animation. Enable "Reduce motion" in OS accessibility settings to activate.',
      },
    },
  },
}
