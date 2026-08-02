import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
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

// ── Interaction tests ─────────────────────────────────────────────────────────

export const IncrementsAndDecrements: Story = {
  name: 'Test: increments and decrements',
  render: () => <Controlled value={3} />,
  play: async ({ canvas, userEvent }) => {
    const value = () => canvas.getByText(/^\d+$/)

    await expect(value()).toHaveTextContent('3')
    await userEvent.click(canvas.getByRole('button', { name: /increase/i }))
    await expect(value()).toHaveTextContent('4')
    await userEvent.click(canvas.getByRole('button', { name: /decrease/i }))
    await expect(value()).toHaveTextContent('3')
  },
}

export const ClampsAtBounds: Story = {
  name: 'Test: will not step past min or max',
  render: () => <Controlled value={2} min={1} max={3} />,
  play: async ({ canvas, userEvent }) => {
    const value = () => canvas.getByText(/^\d+$/)
    const inc = canvas.getByRole('button', { name: /increase/i })
    const dec = canvas.getByRole('button', { name: /decrease/i })

    await userEvent.click(inc)
    await expect(value()).toHaveTextContent('3')
    await expect(inc).toBeDisabled() // at max, so the control stops rather than overshooting

    await userEvent.click(dec)
    await userEvent.click(dec)
    await expect(value()).toHaveTextContent('1')
    await expect(dec).toBeDisabled()
  },
}
