import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { PromoBanner, type PromoBannerProps } from './PromoBanner'

type PromoBannerStoryArgs = PromoBannerProps & {
  title: string
  description: string
  href: string
  imageSrc: string
  imageAlt: string
  cta: string
}

const meta = {
  title: 'Components/PromoBanner',
  component: PromoBanner,
  tags: ['autodocs'],
  args: {
    title: 'See your savings tracker',
    description: "Take a look at where you're saving across partner brands, offers and experiences.",
    href: '#tracker',
    imageSrc: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=300&fit=crop',
    imageAlt: '',
    cta: 'See tracker',
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<PromoBannerStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <PromoBanner>
      <PromoBanner.Body>
        <PromoBanner.Title href={args.href}>{args.title}</PromoBanner.Title>
        <PromoBanner.Description>{args.description}</PromoBanner.Description>
        <PromoBanner.Cta>{args.cta}</PromoBanner.Cta>
      </PromoBanner.Body>
      <PromoBanner.Media src={args.imageSrc} alt={args.imageAlt} />
    </PromoBanner>
  ),
}

export const Uppercase: Story = {
  render: (args) => (
    <PromoBanner>
      <PromoBanner.Body>
        <PromoBanner.Title href={args.href} className="uppercase">
          {args.title}
        </PromoBanner.Title>
        <PromoBanner.Description>{args.description}</PromoBanner.Description>
      </PromoBanner.Body>
      <PromoBanner.Media src={args.imageSrc} alt={args.imageAlt} />
    </PromoBanner>
  ),
}

export const TextOnly: Story = {
  name: 'Text only',
  render: (args) => (
    <PromoBanner>
      <PromoBanner.Body>
        <PromoBanner.Title href={args.href}>{args.title}</PromoBanner.Title>
        <PromoBanner.Description>{args.description}</PromoBanner.Description>
      </PromoBanner.Body>
    </PromoBanner>
  ),
}

export const Dismissible: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true)
    return (
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="banner"
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 1, 1] }}
            className="overflow-hidden"
          >
            <PromoBanner onDismiss={() => setOpen(false)}>
              <PromoBanner.Body>
                <PromoBanner.Title href={args.href}>{args.title}</PromoBanner.Title>
                <PromoBanner.Description>{args.description}</PromoBanner.Description>
                <PromoBanner.Cta>{args.cta}</PromoBanner.Cta>
              </PromoBanner.Body>
              <PromoBanner.Media src={args.imageSrc} alt={args.imageAlt} />
            </PromoBanner>
          </motion.div>
        ) : (
          <p key="gone" className="text-sm text-muted-foreground">Banner dismissed.</p>
        )}
      </AnimatePresence>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Dismiss' }))
    await waitFor(() => expect(canvas.queryByRole('link')).not.toBeInTheDocument())
  },
}
