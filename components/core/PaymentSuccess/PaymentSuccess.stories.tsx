import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PaymentSuccess } from './PaymentSuccess'

const wrapper = (Story: React.ComponentType) => (
  <div className="w-full max-w-[360px] @md:max-w-[400px] border border-border rounded-[calc(var(--radius)+4px)] bg-card shadow-[var(--shadow-elevated)] overflow-hidden">
    <Story />
  </div>
)

const meta = {
  title: 'Components/PaymentSuccess',
  component: PaymentSuccess,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [wrapper],
  args: {
    referenceNumber: '#DQ3FH5E0',
    onCta: () => {},
  },
} satisfies Meta<typeof PaymentSuccess>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// ---------------------------------------------------------------------------
// Minimal
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  name: 'Minimal — reference only',
  args: {
    referenceNumber: '#DQ3FH5E0',
    subtitle: 'A receipt was sent to your email.',
  },
}

// ---------------------------------------------------------------------------
// Supermarket / e-commerce
// ---------------------------------------------------------------------------

export const Supermarket: Story = {
  name: 'Supermarket — order confirmed',
  args: {
    referenceNumber: 'Order #28401',
    badgeLabel: 'Order confirmed',
    subtitle: 'A receipt was sent to your email.',
    rows: [
      { label: 'Items', value: '6 items' },
      { label: 'Delivery', value: 'Tue 10 Jun, 2–4 pm' },
      { label: 'Address', value: '12 Maple St, London' },
      { label: 'Total', value: 'CHF 54.90' },
    ],
    ctaLabel: 'Track order',
    secondaryLabel: 'Email receipt',
    onSecondary: () => {},
  },
}

// ---------------------------------------------------------------------------
// Flight / travel
// ---------------------------------------------------------------------------

export const Flight: Story = {
  name: 'Flight — booking confirmed',
  args: {
    referenceNumber: 'ABC123',
    badgeLabel: 'Booking confirmed',
    subtitle: 'Your e-ticket will be emailed within 15 minutes.',
    rows: [
      { label: 'Route', value: 'LHR → JFK' },
      { label: 'Date', value: '12 Jun 2026 · 09:45' },
      { label: 'Passengers', value: '2 adults' },
      { label: 'Class', value: 'Economy' },
      { label: 'Fare', value: 'USD 680.00' },
    ],
    ctaLabel: 'View booking',
    secondaryLabel: 'Add to wallet',
    onSecondary: () => {},
  },
}

// ---------------------------------------------------------------------------
// Insurance
// ---------------------------------------------------------------------------

export const Insurance: Story = {
  name: 'Insurance — policy active',
  args: {
    referenceNumber: 'Policy #P-884421',
    badgeLabel: 'Policy active',
    subtitle: 'Your documents will arrive by email.',
    rows: [
      { label: 'Policy', value: 'Comprehensive Travel' },
      { label: 'Coverage', value: '12 months' },
      { label: 'Starts', value: '15 Jun 2026' },
      { label: 'Premium', value: 'CHF 249 / year' },
    ],
    ctaLabel: 'View policy',
    secondaryLabel: 'Download certificate',
    onSecondary: () => {},
  },
}

// ---------------------------------------------------------------------------
// With no secondary action
// ---------------------------------------------------------------------------

export const NoSecondary: Story = {
  name: 'No secondary action',
  args: {
    referenceNumber: 'Order #92011',
    badgeLabel: 'Order confirmed',
    rows: [
      { label: 'Total', value: '$34.00' },
      { label: 'Delivery', value: 'Mon 9 Jun' },
    ],
    ctaLabel: 'Done',
  },
}

// ---------------------------------------------------------------------------
// All industries overview
// ---------------------------------------------------------------------------

export const AllIndustries: Story = {
  name: 'All industries',
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-[360px] py-4">
      {[
        {
          label: 'Supermarket',
          props: {
            referenceNumber: 'Order #28401',
            badgeLabel: 'Order confirmed',
            subtitle: 'A receipt was sent to your email.',
            rows: [
              { label: 'Items', value: '6 items' },
              { label: 'Delivery', value: 'Tue 10 Jun, 2–4 pm' },
              { label: 'Total', value: 'CHF 54.90' },
            ],
            ctaLabel: 'Track order',
          },
        },
        {
          label: 'Flight',
          props: {
            referenceNumber: 'ABC123',
            badgeLabel: 'Booking confirmed',
            rows: [
              { label: 'Route', value: 'LHR → JFK' },
              { label: 'Date', value: '12 Jun · 09:45' },
              { label: 'Passengers', value: '2 adults' },
              { label: 'Total', value: 'USD 680.00' },
            ],
            ctaLabel: 'View booking',
          },
        },
        {
          label: 'Insurance',
          props: {
            referenceNumber: 'Policy #P-884421',
            badgeLabel: 'Policy active',
            rows: [
              { label: 'Policy', value: 'Comprehensive Travel' },
              { label: 'Starts', value: '15 Jun 2026' },
              { label: 'Premium', value: 'CHF 249 / year' },
            ],
            ctaLabel: 'View policy',
          },
        },
      ].map(({ label, props }) => (
        <div key={label}>
          <p className="text-xs text-muted-foreground mb-2 px-1">{label}</p>
          <div className="border border-border rounded-[calc(var(--radius)+4px)] bg-card shadow-[var(--shadow-elevated)] overflow-hidden">
            <PaymentSuccess onCta={() => {}} {...props} />
          </div>
        </div>
      ))}
    </div>
  ),
}
