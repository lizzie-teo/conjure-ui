import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor } from 'storybook/test'
import { PriceDisplay } from '@/components/primitives'
import { KeyValueList } from '../KeyValueList/KeyValueList'
import { ExpandableCard } from './ExpandableCard'

const meta = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ExpandableCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <ExpandableCard>
        <ExpandableCard.Header>Booking Summary</ExpandableCard.Header>
        <ExpandableCard.Body>
          <KeyValueList>
            <KeyValueList.Row label="Route" value="SYD → NRT" />
            <KeyValueList.Row label="Date" value="Tue 10 Jun" />
            <KeyValueList.Row label="Passenger" value="John Smith" />
            <KeyValueList.Row label="Class" value="Economy" />
          </KeyValueList>
        </ExpandableCard.Body>
      </ExpandableCard>
    </div>
  ),
}

export const Collapsible: Story = {
  name: 'Collapsible panel',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <ExpandableCard collapsible defaultOpen>
        <ExpandableCard.Header>Order Summary</ExpandableCard.Header>
        <ExpandableCard.Body>
          <div className="flex flex-col gap-3 pt-1 pb-2">
            <KeyValueList>
              <KeyValueList.Row label="Organic Oat Milk" value="$4.50" />
              <KeyValueList.Row label="Sourdough Loaf" value="$8.00" />
              <KeyValueList.Row label="Free Range Eggs" value="$6.50" />
              <KeyValueList.Row label="Delivery" value="$4.95" />
            </KeyValueList>
            <div className="flex items-center justify-between px-4 @md:px-5 pt-2 border-t border-border">
              <span className="text-sm font-semibold">Total</span>
              <PriceDisplay amount={23.95} currency="AUD" />
            </div>
          </div>
        </ExpandableCard.Body>
      </ExpandableCard>
    </div>
  ),
}

export const CollapsedByDefault: Story = {
  name: 'Collapsed by default',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <ExpandableCard collapsible defaultOpen={false}>
        <ExpandableCard.Header>Policy Details</ExpandableCard.Header>
        <ExpandableCard.Body>
          <KeyValueList>
            <KeyValueList.Row label="Provider" value="Bupa" />
            <KeyValueList.Row label="Type" value="Hospital + Extras" />
            <KeyValueList.Row label="Excess" value="$500" />
            <KeyValueList.Row label="Premium" value="$385 / month" />
          </KeyValueList>
        </ExpandableCard.Body>
      </ExpandableCard>
    </div>
  ),
}

// ── Interaction tests ─────────────────────────────────────────────────────────

export const CollapsibleTogglesBody: Story = {
  name: 'Test: collapsible header toggles the body',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <ExpandableCard collapsible defaultOpen>
        <ExpandableCard.Header>Order Summary</ExpandableCard.Header>
        <ExpandableCard.Body>
          <KeyValueList>
            <KeyValueList.Row label="Total" value="$42.00" />
          </KeyValueList>
        </ExpandableCard.Body>
      </ExpandableCard>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const header = canvas.getByRole('button', { name: /order summary/i })

    await expect(header).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByText('$42.00')).toBeInTheDocument()

    await userEvent.click(header)
    await expect(header).toHaveAttribute('aria-expanded', 'false')
    // body unmounts via AnimatePresence, so wait it out rather than asserting instantly
    await waitFor(() => expect(canvas.queryByText('$42.00')).not.toBeInTheDocument())

    await userEvent.click(header)
    await expect(header).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(canvas.getByText('$42.00')).toBeInTheDocument())
  },
}

export const CollapsibleIsKeyboardOperable: Story = {
  name: 'Test: collapsible header works from the keyboard',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <ExpandableCard collapsible defaultOpen>
        <ExpandableCard.Header>Order Summary</ExpandableCard.Header>
        <ExpandableCard.Body>
          <KeyValueList>
            <KeyValueList.Row label="Total" value="$42.00" />
          </KeyValueList>
        </ExpandableCard.Body>
      </ExpandableCard>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const header = canvas.getByRole('button', { name: /order summary/i })

    // A control that claims role="button" has to be reachable by Tab and
    // operable by Enter and Space, or it is a mouse-only control lying about it.
    await userEvent.tab()
    await expect(header).toHaveFocus()

    await userEvent.keyboard('{Enter}')
    await expect(header).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(canvas.queryByText('$42.00')).not.toBeInTheDocument())

    await userEvent.keyboard(' ')
    await expect(header).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(canvas.getByText('$42.00')).toBeInTheDocument())
  },
}

export const NonCollapsibleHasNoButton: Story = {
  name: 'Test: non-collapsible header is not a button',
  render: () => (
    <div className="max-w-sm @md:max-w-md">
      <ExpandableCard>
        <ExpandableCard.Header>Booking Summary</ExpandableCard.Header>
        <ExpandableCard.Body>
          <KeyValueList>
            <KeyValueList.Row label="Route" value="SYD → NRT" />
          </KeyValueList>
        </ExpandableCard.Body>
      </ExpandableCard>
    </div>
  ),
  play: async ({ canvas }) => {
    // a static panel must not advertise itself as interactive to screen readers
    await expect(canvas.queryByRole('button', { name: /booking summary/i })).not.toBeInTheDocument()
    await expect(canvas.getByText('SYD → NRT')).toBeInTheDocument()
  },
}
