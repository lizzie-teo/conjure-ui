'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Plane, Briefcase, Package } from 'lucide-react'
import { SelectionGroup } from './SelectionGroup'

const meta = {
  title: 'Components/SelectionGroup',
  component: SelectionGroup,
  tags: ['autodocs'],
  args: { type: 'radio' },
} satisfies Meta<typeof SelectionGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { type: 'radio', defaultValue: 'economy' },
  render: (args) => (
    <div className="max-w-sm">
      <SelectionGroup {...args}>
        <SelectionGroup.Option value="economy" description="Standard seat, 1 carry-on bag included">Economy class</SelectionGroup.Option>
        <SelectionGroup.Option value="business" description="Lie-flat seat, lounge access, 2 checked bags">Business class</SelectionGroup.Option>
      </SelectionGroup>
    </div>
  ),
}

export const RadioUncontrolled: Story = {
  name: 'Radio (uncontrolled)',
  args: { defaultValue: 'economy' },
  render: (args) => (
    <div className="max-w-sm">
      <SelectionGroup {...args}>
        <SelectionGroup.Option
          value="economy"
          description="Standard seat, 1 carry-on bag included"
        >
          Economy class
        </SelectionGroup.Option>
        <SelectionGroup.Option
          value="premium"
          description="Extra legroom, 1 checked bag included"
        >
          Premium economy
        </SelectionGroup.Option>
        <SelectionGroup.Option
          value="business"
          description="Lie-flat seat, lounge access, 2 checked bags"
        >
          Business class
        </SelectionGroup.Option>
      </SelectionGroup>
    </div>
  ),
}

export const RadioWithIcons: Story = {
  name: 'Radio with icons',
  render: () => {
    const [value, setValue] = useState('economy')
    return (
      <div className="max-w-sm flex flex-col gap-3">
        <SelectionGroup
          type="radio"
          value={value}
          onChange={(v) => setValue(v as string)}
        >
          <SelectionGroup.Option
            value="economy"
            icon={<Plane className="size-4" />}
            description="From $899 · Standard fare"
          >
            Economy
          </SelectionGroup.Option>
          <SelectionGroup.Option
            value="premium"
            icon={<Package className="size-4" />}
            description="From $1,450 · Extra legroom + bag"
          >
            Premium economy
          </SelectionGroup.Option>
          <SelectionGroup.Option
            value="business"
            icon={<Briefcase className="size-4" />}
            description="From $3,200 · Lie-flat, lounge access"
          >
            Business
          </SelectionGroup.Option>
        </SelectionGroup>
        <p className="text-xs text-muted-foreground">
          Selected: <strong className="text-foreground">{value}</strong>
        </p>
      </div>
    )
  },
}

export const CheckboxUncontrolled: Story = {
  name: 'Checkbox (uncontrolled)',
  args: { type: 'checkbox', defaultValue: ['wifi'] },
  render: (args) => (
    <div className="max-w-sm">
      <SelectionGroup {...args}>
        <SelectionGroup.Option value="wifi" description="High-speed, available on all flights">
          Wi-Fi included
        </SelectionGroup.Option>
        <SelectionGroup.Option value="meal" description="Select from 3 meal options">
          Meal included
        </SelectionGroup.Option>
        <SelectionGroup.Option value="baggage" description="1 × 23kg checked bag">
          Checked baggage
        </SelectionGroup.Option>
        <SelectionGroup.Option value="seat" description="Choose any available seat">
          Seat selection
        </SelectionGroup.Option>
      </SelectionGroup>
    </div>
  ),
}

export const InsurancePlans: Story = {
  name: 'Insurance plan selection',
  render: () => {
    const [plan, setPlan] = useState('basic')
    return (
      <div className="max-w-sm flex flex-col gap-3">
        <SelectionGroup
          type="radio"
          value={plan}
          onChange={(v) => setPlan(v as string)}
        >
          <SelectionGroup.Option
            value="basic"
            description="Hospital cover only · $500 excess"
          >
            Basic Hospital
          </SelectionGroup.Option>
          <SelectionGroup.Option
            value="mid"
            description="Hospital + dental, optical, physio · $250 excess"
          >
            Mid Hospital + Extras
          </SelectionGroup.Option>
          <SelectionGroup.Option
            value="premium"
            description="Comprehensive cover, no excess"
          >
            Premium Hospital + Extras
          </SelectionGroup.Option>
        </SelectionGroup>
      </div>
    )
  },
}

// ── Interaction tests ─────────────────────────────────────────────────────────

export const RadioSelectsOne: Story = {
  name: 'Test: radio selects exactly one',
  args: { type: 'radio', defaultValue: 'economy' },
  render: (args) => (
    <div className="max-w-sm">
      <SelectionGroup {...args}>
        <SelectionGroup.Option value="economy">Economy class</SelectionGroup.Option>
        <SelectionGroup.Option value="business">Business class</SelectionGroup.Option>
      </SelectionGroup>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const economy = canvas.getByRole('radio', { name: /economy/i })
    const business = canvas.getByRole('radio', { name: /business/i })

    await expect(economy).toHaveAttribute('aria-checked', 'true')
    await expect(business).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(business)
    // selecting one must deselect the other — that is what makes it a radio
    await expect(business).toHaveAttribute('aria-checked', 'true')
    await expect(economy).toHaveAttribute('aria-checked', 'false')
  },
}

export const CheckboxSelectsMany: Story = {
  name: 'Test: checkbox accumulates selections',
  args: { type: 'checkbox' },
  render: (args) => (
    <div className="max-w-sm">
      <SelectionGroup {...args}>
        <SelectionGroup.Option value="bags">Extra bags</SelectionGroup.Option>
        <SelectionGroup.Option value="seat">Seat choice</SelectionGroup.Option>
      </SelectionGroup>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const bags = canvas.getByRole('checkbox', { name: /extra bags/i })
    const seat = canvas.getByRole('checkbox', { name: /seat choice/i })

    await userEvent.click(bags)
    await userEvent.click(seat)
    await expect(bags).toHaveAttribute('aria-checked', 'true')
    await expect(seat).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(bags)
    await expect(bags).toHaveAttribute('aria-checked', 'false')
    await expect(seat).toHaveAttribute('aria-checked', 'true')
  },
}
