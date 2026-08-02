import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { QuantityStepper } from './QuantityStepper'

const meta = {
  title: 'Primitives/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
  args: { value: 3, min: 1, max: 99, onChange: () => {} },
} satisfies Meta<typeof QuantityStepper>

export default meta
type Story = StoryObj<typeof meta>

function Controlled(props: Partial<React.ComponentProps<typeof QuantityStepper>>) {
  const [value, setValue] = useState(props.value ?? 1)
  return <QuantityStepper min={1} max={99} {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: () => <Controlled value={3} />,
}

export const AtMin: Story = {
  name: 'At minimum',
  render: () => <Controlled value={1} min={1} />,
}

export const AtMax: Story = {
  name: 'At maximum',
  render: () => <Controlled value={10} max={10} />,
}

export const Disabled: Story = {
  render: () => <QuantityStepper value={2} min={1} max={99} onChange={() => {}} disabled />,
}

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground w-16">Default</span>
        <Controlled value={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground w-16">At min</span>
        <Controlled value={1} min={1} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground w-16">At max</span>
        <Controlled value={5} max={5} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground w-16">Disabled</span>
        <QuantityStepper value={2} min={1} max={99} onChange={() => {}} disabled />
      </div>
    </div>
  ),
}
