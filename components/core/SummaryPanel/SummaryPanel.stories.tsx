import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor } from 'storybook/test'
import { PriceDisplay } from '@/components/primitives'
import { DetailList } from '../DetailList/DetailList'
import { SummaryPanel } from './SummaryPanel'

const meta = {
  title: 'Components/SummaryPanel',
  component: SummaryPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof SummaryPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <SummaryPanel>
        <SummaryPanel.Header>Booking Summary</SummaryPanel.Header>
        <SummaryPanel.Body>
          <DetailList>
            <DetailList.Row label="Route" value="SYD → NRT" />
            <DetailList.Row label="Date" value="Tue 10 Jun" />
            <DetailList.Row label="Passenger" value="John Smith" />
            <DetailList.Row label="Class" value="Economy" />
          </DetailList>
        </SummaryPanel.Body>
      </SummaryPanel>
    </div>
  ),
}

export const Collapsible: Story = {
  name: 'Collapsible panel',
  render: () => (
    <div className="max-w-sm">
      <SummaryPanel collapsible defaultOpen>
        <SummaryPanel.Header>Order Summary</SummaryPanel.Header>
        <SummaryPanel.Body>
          <div className="flex flex-col gap-3 pt-1 pb-2">
            <DetailList>
              <DetailList.Row label="Organic Oat Milk" value="$4.50" />
              <DetailList.Row label="Sourdough Loaf" value="$8.00" />
              <DetailList.Row label="Free Range Eggs" value="$6.50" />
              <DetailList.Row label="Delivery" value="$4.95" />
            </DetailList>
            <div className="flex items-center justify-between px-4 md:px-5 pt-2 border-t border-border">
              <span className="text-sm font-semibold">Total</span>
              <PriceDisplay amount={23.95} currency="AUD" />
            </div>
          </div>
        </SummaryPanel.Body>
      </SummaryPanel>
    </div>
  ),
}

export const CollapsedByDefault: Story = {
  name: 'Collapsed by default',
  render: () => (
    <div className="max-w-sm">
      <SummaryPanel collapsible defaultOpen={false}>
        <SummaryPanel.Header>Policy Details</SummaryPanel.Header>
        <SummaryPanel.Body>
          <DetailList>
            <DetailList.Row label="Provider" value="Bupa" />
            <DetailList.Row label="Type" value="Hospital + Extras" />
            <DetailList.Row label="Excess" value="$500" />
            <DetailList.Row label="Premium" value="$385 / month" />
          </DetailList>
        </SummaryPanel.Body>
      </SummaryPanel>
    </div>
  ),
}

// ── Interaction tests ─────────────────────────────────────────────────────────

export const CollapsibleTogglesBody: Story = {
  name: 'Test: collapsible header toggles the body',
  render: () => (
    <div className="max-w-sm">
      <SummaryPanel collapsible defaultOpen>
        <SummaryPanel.Header>Order Summary</SummaryPanel.Header>
        <SummaryPanel.Body>
          <DetailList>
            <DetailList.Row label="Total" value="$42.00" />
          </DetailList>
        </SummaryPanel.Body>
      </SummaryPanel>
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

export const NonCollapsibleHasNoButton: Story = {
  name: 'Test: non-collapsible header is not a button',
  render: () => (
    <div className="max-w-sm">
      <SummaryPanel>
        <SummaryPanel.Header>Booking Summary</SummaryPanel.Header>
        <SummaryPanel.Body>
          <DetailList>
            <DetailList.Row label="Route" value="SYD → NRT" />
          </DetailList>
        </SummaryPanel.Body>
      </SummaryPanel>
    </div>
  ),
  play: async ({ canvas }) => {
    // a static panel must not advertise itself as interactive to screen readers
    await expect(canvas.queryByRole('button', { name: /booking summary/i })).not.toBeInTheDocument()
    await expect(canvas.getByText('SYD → NRT')).toBeInTheDocument()
  },
}
