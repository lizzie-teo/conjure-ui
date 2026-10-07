import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import ThemeProvider from './ThemeProvider'
import { Button } from './ui/button'

/* A warm brand that sets only Tier 1. Everything else on screen is derived. */
const WARM = {
  '--background': 'oklch(0.96 0.03 70)',
  '--foreground': 'oklch(0.25 0.04 50)',
  '--primary': 'oklch(0.45 0.12 45)',
  '--primary-foreground': 'oklch(0.98 0 0)',
  '--radius': '1rem',
}

const WARM_DARK = {
  '--background': 'oklch(0.18 0.03 50)',
  '--foreground': 'oklch(0.94 0.02 70)',
  '--primary': 'oklch(0.75 0.12 60)',
  '--primary-foreground': 'oklch(0.18 0.03 50)',
}

const SURFACES = ['background', 'card', 'secondary', 'muted', 'accent', 'border', 'primary'] as const

function Swatches({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6 bg-background text-foreground rounded-lg">
      <p className="font-heading font-semibold text-sm md:text-base">{label}</p>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {SURFACES.map((name) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div
              data-testid={`${label}-${name}`}
              className={`size-12 md:size-14 rounded-md border border-border bg-${name}`}
            />
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
      <div>
        <Button>Book now</Button>
      </div>
    </div>
  )
}

/* Tailwind only generates classes it can see written out in full. */
// bg-background bg-card bg-secondary bg-muted bg-accent bg-border bg-primary

const bg = (el: Element) => getComputedStyle(el).backgroundColor

const meta = {
  title: 'Theming/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  args: { tokens: WARM, darkTokens: WARM_DARK },
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

/** Only Tier 1 is set. Cards, muted panels, hover, borders and the focus ring follow the warm brand. */
export const DerivedSurfaces: Story = {
  name: 'Derived surfaces',
  render: (args) => (
    <div className="flex flex-col gap-4 md:gap-6">
      <Swatches label="default" />
      <ThemeProvider {...args}>
        <Swatches label="brand" />
      </ThemeProvider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const name of ['muted', 'secondary', 'accent', 'border'] as const) {
      await expect(bg(canvas.getByTestId(`brand-${name}`))).not.toBe(
        bg(canvas.getByTestId(`default-${name}`))
      )
    }
  },
}

/** The `dark` prop switches to `darkTokens`. The light brand colours must not leak through. */
export const Dark: Story = {
  args: { dark: true },
  render: (args) => (
    <div className="flex flex-col gap-4 md:gap-6">
      <ThemeProvider {...args}>
        <Swatches label="dark" />
      </ThemeProvider>
      <ThemeProvider tokens={WARM}>
        <Swatches label="light" />
      </ThemeProvider>
      <ThemeProvider tokens={WARM} dark>
        <Swatches label="no-dark-tokens" />
      </ThemeProvider>
      <div className="dark">
        <Swatches label="library-dark" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const darkPrimary = bg(canvas.getByTestId('dark-primary'))
    await expect(darkPrimary).not.toBe(bg(canvas.getByTestId('light-primary')))
    // Without darkTokens, dark mode falls back to the library's dark palette.
    await expect(bg(canvas.getByTestId('no-dark-tokens-primary'))).toBe(
      bg(canvas.getByTestId('library-dark-primary'))
    )
    await expect(bg(canvas.getByTestId('no-dark-tokens-card'))).toBe(
      bg(canvas.getByTestId('library-dark-card'))
    )
  },
}
