import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge } from '@/components/primitives'
import { DetailList } from './DetailList'

const meta = {
  title: 'Components/DetailList',
  component: DetailList,
  tags: ['autodocs'],
} satisfies Meta<typeof DetailList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      <DetailList>
        <DetailList.Row label="Departs" value="06:45 SYD" />
        <DetailList.Row label="Arrives" value="22:30 NRT" />
        <DetailList.Row label="Duration" value="9h 45m" />
        <DetailList.Row label="Stops" value="Direct" />
      </DetailList>
    </div>
  ),
}

export const FlightDetails: Story = {
  name: 'Flight details (travel)',
  render: () => (
    <div className="max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      <DetailList>
        <DetailList.Row label="Departs" value="06:45 SYD" />
        <DetailList.Row label="Arrives" value="22:30 NRT" />
        <DetailList.Row label="Duration" value="9h 45m" />
        <DetailList.Row label="Stops" value="Direct" />
        <DetailList.Row label="Aircraft" value="Boeing 787" />
      </DetailList>
    </div>
  ),
}

export const MedicationInfo: Story = {
  name: 'Medication info (pharmacy)',
  render: () => (
    <div className="max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      <DetailList>
        <DetailList.Row label="Dosage" value="500mg" />
        <DetailList.Row label="Frequency" value="3 × daily" />
        <DetailList.Row label="Duration" value="7 days" />
        <DetailList.Row label="With food" value="Yes" />
        <DetailList.Row
          label="Status"
          value={<StatusBadge label="Active" variant="success" />}
        />
      </DetailList>
    </div>
  ),
}

export const CartItem: Story = {
  name: 'Cart item (grocery)',
  render: () => (
    <div className="max-w-xs rounded-xl border border-border bg-card overflow-hidden">
      <DetailList>
        <DetailList.Row label="Product" value="Organic Oat Milk 1L" />
        <DetailList.Row label="Quantity" value="2" />
        <DetailList.Row label="Unit price" value="$4.50" />
        <DetailList.Row label="Total" value="$9.00" />
      </DetailList>
    </div>
  ),
}
