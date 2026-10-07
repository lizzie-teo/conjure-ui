'use client'

import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Plane, Briefcase, Package } from 'lucide-react'
import { OptionGroup } from './OptionGroup'

const meta = {
  title: 'Components/OptionGroup',
  component: OptionGroup,
  tags: ['autodocs'],
  args: { type: 'radio' },
} satisfies Meta<typeof OptionGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { type: 'radio', defaultValue: 'economy' },
  render: (args) => (
    <div className="max-w-sm @md:max-w-md">
      <OptionGroup {...args}>
        <OptionGroup.Option value="economy" description="Standard seat, 1 carry-on bag included">Economy class</OptionGroup.Option>
        <OptionGroup.Option value="business" description="Lie-flat seat, lounge access, 2 checked bags">Business class</OptionGroup.Option>
      </OptionGroup>
    </div>
  ),
}

export const RadioUncontrolled: Story = {
  name: 'Radio (uncontrolled)',
  args: { defaultValue: 'economy' },
  render: (args) => (
    <div className="max-w-sm @md:max-w-md">
      <OptionGroup {...args}>
        <OptionGroup.Option
          value="economy"
          description="Standard seat, 1 carry-on bag included"
        >
          Economy class
        </OptionGroup.Option>
        <OptionGroup.Option
          value="premium"
          description="Extra legroom, 1 checked bag included"
        >
          Premium economy
        </OptionGroup.Option>
        <OptionGroup.Option
          value="business"
          description="Lie-flat seat, lounge access, 2 checked bags"
        >
          Business class
        </OptionGroup.Option>
      </OptionGroup>
    </div>
  ),
}

export const RadioWithIcons: Story = {
  name: 'Radio with icons',
  render: () => {
    const [value, setValue] = useState('economy')
    return (
      <div className="max-w-sm @md:max-w-md flex flex-col gap-3">
        <OptionGroup
          type="radio"
          value={value}
          onChange={(v) => setValue(v as string)}
        >
          <OptionGroup.Option
            value="economy"
            icon={<Plane className="size-4" />}
            description="From $899 · Standard fare"
          >
            Economy
          </OptionGroup.Option>
          <OptionGroup.Option
            value="premium"
            icon={<Package className="size-4" />}
            description="From $1,450 · Extra legroom + bag"
          >
            Premium economy
          </OptionGroup.Option>
          <OptionGroup.Option
            value="business"
            icon={<Briefcase className="size-4" />}
            description="From $3,200 · Lie-flat, lounge access"
          >
            Business
          </OptionGroup.Option>
        </OptionGroup>
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
    <div className="max-w-sm @md:max-w-md">
      <OptionGroup {...args}>
        <OptionGroup.Option value="wifi" description="High-speed, available on all flights">
          Wi-Fi included
        </OptionGroup.Option>
        <OptionGroup.Option value="meal" description="Select from 3 meal options">
          Meal included
        </OptionGroup.Option>
        <OptionGroup.Option value="baggage" description="1 × 23kg checked bag">
          Checked baggage
        </OptionGroup.Option>
        <OptionGroup.Option value="seat" description="Choose any available seat">
          Seat selection
        </OptionGroup.Option>
      </OptionGroup>
    </div>
  ),
}

export const InsurancePlans: Story = {
  name: 'Insurance plan selection',
  render: () => {
    const [plan, setPlan] = useState('basic')
    return (
      <div className="max-w-sm @md:max-w-md flex flex-col gap-3">
        <OptionGroup
          type="radio"
          value={plan}
          onChange={(v) => setPlan(v as string)}
        >
          <OptionGroup.Option
            value="basic"
            description="Hospital cover only · $500 excess"
          >
            Basic Hospital
          </OptionGroup.Option>
          <OptionGroup.Option
            value="mid"
            description="Hospital + dental, optical, physio · $250 excess"
          >
            Mid Hospital + Extras
          </OptionGroup.Option>
          <OptionGroup.Option
            value="premium"
            description="Comprehensive cover, no excess"
          >
            Premium Hospital + Extras
          </OptionGroup.Option>
        </OptionGroup>
      </div>
    )
  },
}

// ── Interaction tests ─────────────────────────────────────────────────────────

export const RadioSelectsOne: Story = {
  name: 'Test: radio selects exactly one',
  args: { type: 'radio', defaultValue: 'economy' },
  render: (args) => (
    <div className="max-w-sm @md:max-w-md">
      <OptionGroup {...args}>
        <OptionGroup.Option value="economy">Economy class</OptionGroup.Option>
        <OptionGroup.Option value="business">Business class</OptionGroup.Option>
      </OptionGroup>
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
    <div className="max-w-sm @md:max-w-md">
      <OptionGroup {...args}>
        <OptionGroup.Option value="bags">Extra bags</OptionGroup.Option>
        <OptionGroup.Option value="seat">Seat choice</OptionGroup.Option>
      </OptionGroup>
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
