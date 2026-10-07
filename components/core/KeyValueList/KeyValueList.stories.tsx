import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBadge } from '@/components/primitives'
import { KeyValueList } from './KeyValueList'

const meta = {
  title: 'Components/KeyValueList',
  component: KeyValueList,
  tags: ['autodocs'],
} satisfies Meta<typeof KeyValueList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-xs @md:max-w-md rounded-xl border border-border bg-card overflow-hidden">
      <KeyValueList>
        <KeyValueList.Row label="Departs" value="06:45 SYD" />
        <KeyValueList.Row label="Arrives" value="22:30 NRT" />
        <KeyValueList.Row label="Duration" value="9h 45m" />
        <KeyValueList.Row label="Stops" value="Direct" />
      </KeyValueList>
    </div>
  ),
}

export const FlightDetails: Story = {
  name: 'Flight details (travel)',
  render: () => (
    <div className="max-w-xs @md:max-w-md rounded-xl border border-border bg-card overflow-hidden">
      <KeyValueList>
        <KeyValueList.Row label="Departs" value="06:45 SYD" />
        <KeyValueList.Row label="Arrives" value="22:30 NRT" />
        <KeyValueList.Row label="Duration" value="9h 45m" />
        <KeyValueList.Row label="Stops" value="Direct" />
        <KeyValueList.Row label="Aircraft" value="Boeing 787" />
      </KeyValueList>
    </div>
  ),
}

export const MedicationInfo: Story = {
  name: 'Medication info (pharmacy)',
  render: () => (
    <div className="max-w-xs @md:max-w-md rounded-xl border border-border bg-card overflow-hidden">
      <KeyValueList>
        <KeyValueList.Row label="Dosage" value="500mg" />
        <KeyValueList.Row label="Frequency" value="3 × daily" />
        <KeyValueList.Row label="Duration" value="7 days" />
        <KeyValueList.Row label="With food" value="Yes" />
        <KeyValueList.Row
          label="Status"
          value={<StatusBadge label="Active" variant="success" />}
        />
      </KeyValueList>
    </div>
  ),
}

export const CartItem: Story = {
  name: 'Cart item (grocery)',
  render: () => (
    <div className="max-w-xs @md:max-w-md rounded-xl border border-border bg-card overflow-hidden">
      <KeyValueList>
        <KeyValueList.Row label="Product" value="Organic Oat Milk 1L" />
        <KeyValueList.Row label="Quantity" value="2" />
        <KeyValueList.Row label="Unit price" value="$4.50" />
        <KeyValueList.Row label="Total" value="$9.00" />
      </KeyValueList>
    </div>
  ),
}
