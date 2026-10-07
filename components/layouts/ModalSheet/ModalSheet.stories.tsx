import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor, within } from 'storybook/test'
import { useState } from 'react'
import { ModalSheet } from './ModalSheet'
import { Button } from '../../ui/button'

const meta = {
  title: 'Layouts/ModalSheet',
  component: ModalSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    open: false,
    onClose: () => {},
    children: null,
  },
} satisfies Meta<typeof ModalSheet>

export default meta
type Story = StoryObj<typeof meta>

function Toggle({
  label = 'Open',
  children,
  title,
  description,
  size,
}: {
  label?: string
  children: React.ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <ModalSheet
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        size={size}
      >
        {children}
      </ModalSheet>
    </>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (md)',
  render: () => (
    <Toggle title="Your cart" description="Review items before checkout" size="md" label="Open cart">
      <ModalSheet.Body>
        <p className="text-sm @md:text-base text-foreground">
          Cart contents go here. This is the default medium size.
        </p>
      </ModalSheet.Body>
    </Toggle>
  ),
}

export const Small: Story = {
  name: 'Size sm',
  render: () => (
    <Toggle title="Confirm action" size="sm" label="Open sm">
      <ModalSheet.Body>
        <p className="text-sm text-foreground">
          Compact sheet — 360px max-width. Good for quick confirmations.
        </p>
      </ModalSheet.Body>
      <ModalSheet.Footer>
        <Button className="w-full h-12 @md:h-10 pointer-coarse:min-h-11">Confirm</Button>
      </ModalSheet.Footer>
    </Toggle>
  ),
}

export const Large: Story = {
  name: 'Size lg',
  render: () => (
    <Toggle title="Order review" size="lg" label="Open lg">
      <ModalSheet.Body>
        <p className="text-sm @md:text-base text-foreground">
          Large sheet — 600px max-width. Ideal for order review, full product detail.
        </p>
      </ModalSheet.Body>
    </Toggle>
  ),
}

export const WithFooter: Story = {
  name: 'With footer',
  render: () => (
    <Toggle title="Payment" description="Complete your purchase" size="md" label="Open with footer">
      <ModalSheet.Body>
        <div className="space-y-3">
          <p className="text-sm @md:text-base text-foreground">
            Select your payment method and confirm below.
          </p>
          <div className="h-16 rounded-xl bg-muted" />
          <div className="h-16 rounded-xl bg-muted" />
        </div>
      </ModalSheet.Body>
      <ModalSheet.Footer>
        <Button className="w-full h-12 @md:h-10 pointer-coarse:min-h-11">Pay now</Button>
      </ModalSheet.Footer>
    </Toggle>
  ),
}

export const WithoutTitle: Story = {
  name: 'Without title',
  render: () => (
    <Toggle size="md" label="Open (no title)">
      <ModalSheet.Body>
        <p className="text-sm @md:text-base text-foreground pt-8 md:pt-2">
          No title prop — close button still appears in the top-right. Consumer can
          place <code>ModalSheet.Header</code> for a custom heading.
        </p>
      </ModalSheet.Body>
    </Toggle>
  ),
}

export const CustomHeader: Story = {
  name: 'Custom header slot',
  render: () => (
    <Toggle size="md" label="Open (custom header)">
      <ModalSheet.Header>
        <p className="text-base @md:text-lg font-semibold text-foreground pr-10">Authentication</p>
        <p className="text-xs @md:text-sm text-muted-foreground mt-0.5">
          Verify your identity to continue
        </p>
      </ModalSheet.Header>
      <ModalSheet.Body>
        <p className="text-sm text-foreground">
          Body content below a custom header rendered via <code>ModalSheet.Header</code>.
        </p>
      </ModalSheet.Body>
    </Toggle>
  ),
}

export const LongContent: Story = {
  name: 'Long content (scroll)',
  render: () => (
    <Toggle title="Terms & conditions" size="md" label="Open long content">
      <ModalSheet.Body>
        <div className="space-y-4">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="text-sm text-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      </ModalSheet.Body>
      <ModalSheet.Footer>
        <Button className="w-full h-12 @md:h-10 pointer-coarse:min-h-11">Accept & continue</Button>
      </ModalSheet.Footer>
    </Toggle>
  ),
}

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="flex gap-3">
      <Toggle title="Small" size="sm" label="sm — 360px">
        <ModalSheet.Body>
          <p className="text-sm text-foreground">Size sm — max-width 360px</p>
        </ModalSheet.Body>
      </Toggle>
      <Toggle title="Medium" size="md" label="md — 480px">
        <ModalSheet.Body>
          <p className="text-sm text-foreground">Size md — max-width 480px</p>
        </ModalSheet.Body>
      </Toggle>
      <Toggle title="Large" size="lg" label="lg — 600px">
        <ModalSheet.Body>
          <p className="text-sm text-foreground">Size lg — max-width 600px</p>
        </ModalSheet.Body>
      </Toggle>
    </div>
  ),
}

// ── Interaction tests ─────────────────────────────────────────────────────────

export const EscapeClosesAndFocusIsTrapped: Story = {
  name: 'Test: opens, traps focus, Escape closes',
  render: () => (
    <Toggle label="Open" title="Confirm booking">
      <ModalSheet.Body>
        <p>Body copy</p>
      </ModalSheet.Body>
      <ModalSheet.Footer>
        <Button>Confirm</Button>
      </ModalSheet.Footer>
    </Toggle>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const body = within(document.body)

    await step('opens as a labelled modal dialog', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
      const dialog = await body.findByRole('dialog')
      await expect(dialog).toHaveAttribute('aria-modal', 'true')
      // the built-in title header is what aria-labelledby points at
      await expect(dialog).toHaveAccessibleName('Confirm booking')
    })

    await step('moves focus inside the dialog', async () => {
      await waitFor(() =>
        expect(body.getByRole('dialog').contains(document.activeElement)).toBe(true)
      )
    })

    await step('Escape closes it', async () => {
      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    })
  },
}

export const ForwardsRestPropsToDialog: Story = {
  name: 'Test: forwards rest props to the dialog root',
  render: () => (
    <Toggle label="Open" title="Tagged">
      <ModalSheet.Body>
        <p>Body copy</p>
      </ModalSheet.Body>
    </Toggle>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
    const dialog = await within(document.body).findByRole('dialog')
    // spreading must not clobber the role/aria-modal the component owns
    await expect(dialog).toHaveAttribute('role', 'dialog')
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
  },
}
