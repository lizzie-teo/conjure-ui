import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { TimeSlotPicker } from './TimeSlotPicker'
import type { PickableDate, PickableSlot } from './TimeSlotPicker'

const meta: Meta<typeof TimeSlotPicker> = {
  title: 'Components/TimeSlotPicker',
  component: TimeSlotPicker,
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div className="w-full max-w-[360px] @md:max-w-[440px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TimeSlotPicker>

// ── Fixtures (module-local — never exported, or CSF renders them as stories) ──

/** Dates are relative so the rail always shows a live "Today". */
function isoOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const DATES: PickableDate[] = [
  { date: isoOffset(0), availability: 'limited', cutoffAt: new Date().toISOString() },
  { date: isoOffset(1), availability: 'available' },
  { date: isoOffset(2), availability: 'available' },
  { date: isoOffset(3), availability: 'limited' },
  { date: isoOffset(4), availability: 'unavailable' },
  { date: isoOffset(5), availability: 'available' },
]

const DELIVERY_SLOTS: PickableSlot[] = [
  { id: 'm1', startTime: '7:00 am', endTime: '9:00 am', availability: 'available', fee: 9.95, currency: 'AUD' },
  { id: 'm2', startTime: '9:00 am', endTime: '11:00 am', availability: 'limited', fee: 7.5, currency: 'AUD' },
  { id: 'a1', startTime: '12:00 pm', endTime: '2:00 pm', availability: 'available', fee: 0, currency: 'AUD' },
  { id: 'a2', startTime: '2:00 pm', endTime: '4:00 pm', availability: 'available', fee: 5, currency: 'AUD' },
  { id: 'e1', startTime: '6:00 pm', endTime: '8:00 pm', availability: 'limited', fee: 12, currency: 'AUD' },
  { id: 'e2', startTime: '8:00 pm', endTime: '10:00 pm', availability: 'unavailable', fee: 12, currency: 'AUD' },
]

/** No fees at all — a consultation calendar rather than a delivery window. */
const APPOINTMENT_SLOTS: PickableSlot[] = [
  { id: 'c1', startTime: '9:30 am', endTime: '10:00 am', availability: 'available' },
  { id: 'c2', startTime: '10:30 am', endTime: '11:00 am', availability: 'available' },
  { id: 'c3', startTime: '1:00 pm', endTime: '1:30 pm', availability: 'limited' },
  { id: 'c4', startTime: '3:30 pm', endTime: '4:00 pm', availability: 'available' },
]

function Controlled({
  slots = DELIVERY_SLOTS,
  labels,
}: {
  slots?: PickableSlot[]
  labels?: React.ComponentProps<typeof TimeSlotPicker>['labels']
}) {
  const [date, setDate] = useState<string>()
  const [slotId, setSlotId] = useState<string>()

  return (
    <TimeSlotPicker
      dates={DATES}
      slots={slots}
      selectedDate={date}
      selectedSlotId={slotId}
      onDateSelect={setDate}
      onSlotSelect={setSlotId}
      labels={labels}
    />
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Delivery windows (priced)',
  render: () => <Controlled />,
}

export const Appointments: Story = {
  name: 'Appointments (no fees, reworded)',
  render: () => (
    <Controlled
      slots={APPOINTMENT_SLOTS}
      labels={{
        dateHeading: 'Pick a day',
        dateGroup: 'Select an appointment day',
        slotPrompt: 'Choose a day to see open appointments',
      }}
    />
  ),
}

export const DateAlreadyChosen: Story = {
  name: 'Date already chosen',
  render: () => {
    function Prechosen() {
      const [slotId, setSlotId] = useState<string>('a1')
      return (
        <TimeSlotPicker
          dates={DATES}
          slots={DELIVERY_SLOTS}
          selectedDate={DATES[1].date}
          selectedSlotId={slotId}
          onDateSelect={() => {}}
          onSlotSelect={setSlotId}
        />
      )
    }
    return <Prechosen />
  },
}

// ── Interaction ───────────────────────────────────────────────────────────────

/** Date cells and slot chips are both radios — scope date lookups to the rail. */
function dateCells(canvas: ReturnType<typeof within>) {
  return within(canvas.getByRole('radiogroup', { name: 'Select a date' })).getAllByRole('radio')
}

export const ChoosingADateRevealsSlots: Story = {
  name: 'Choosing a date reveals its slots',
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Nothing to pick from until a date is chosen.
    await expect(canvas.getByText('Pick a date above to see available times')).toBeInTheDocument()
    await expect(canvas.queryByRole('tablist')).not.toBeInTheDocument()

    await userEvent.click(dateCells(canvas)[1])

    // The grid animates in, so it is not mounted on the next tick.
    await expect(await canvas.findByRole('tablist')).toBeInTheDocument()
    await expect(
      await canvas.findByRole('radio', { name: /7:00 am to 9:00 am/ })
    ).toBeInTheDocument()
  },
}

export const UnavailableDatesAreNotSelectable: Story = {
  name: 'Unavailable dates cannot be chosen',
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('radio', { name: /unavailable/ })).toBeDisabled()
  },
}

export const ChangingDateClearsTheSlot: Story = {
  name: 'Changing the date clears the chosen slot',
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(dateCells(canvas)[1])

    await userEvent.click(await canvas.findByRole('radio', { name: /7:00 am to 9:00 am/ }))
    await expect(canvas.getByRole('radio', { name: /7:00 am to 9:00 am/ })).toHaveAttribute(
      'aria-checked',
      'true'
    )

    // Moving to another date must not carry the old date's slot with it. The
    // outgoing panel stays mounted for its exit animation holding the props it
    // last rendered with, so poll until only the new grid remains.
    await userEvent.click(dateCells(canvas)[2])
    await waitFor(() => {
      const chips = canvas.getAllByRole('radio', { name: /7:00 am to 9:00 am/ })
      expect(chips).toHaveLength(1)
      expect(chips[0]).toHaveAttribute('aria-checked', 'false')
    })
  },
}
