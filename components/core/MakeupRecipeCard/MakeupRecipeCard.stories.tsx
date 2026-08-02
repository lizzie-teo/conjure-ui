import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MakeupRecipeCard, type MakeupRecipe, type MakeupProduct } from './MakeupRecipeCard'

// ── Mock data ──────────────────────────────────────────────────────────────────

const WARM_DAY_RECIPE: MakeupRecipe = {
  id: 'warm-day-1',
  occasion: 'day',
  format: 'individual',
  lookName: 'Rested and together',
  story: {
    harmony: 'Bronze eye, barely-there lip — warm tones that stay in the same family.',
    skinTone: 'Sits right with golden-olive skin without fighting it.',
  },
  products: [
    {
      id: 'p1',
      type: 'eye',
      label: 'Eyeshadow',
      shade: 'Warm Bronze',
      swatch: { hex: '#c8864a', name: 'warm bronze' },
      image: 'https://picsum.photos/seed/bronze-eye/400/300',
      imageAlt: 'Warm bronze eyeshadow palette',
      isFocalPoint: true,
      undertoneNote: 'Good for golden-olive undertones',
    },
    {
      id: 'p2',
      type: 'lip',
      label: 'Lip Colour',
      shade: 'Nude Peach',
      swatch: { hex: '#d4957a', name: 'nude peach' },
      image: 'https://picsum.photos/seed/peach-lip/400/300',
      imageAlt: 'Nude peach lip colour',
    },
    {
      id: 'p3',
      type: 'cheek',
      label: 'Blush',
      shade: 'Sun Bronze',
      swatch: { hex: '#c47848', name: 'sun bronze' },
      image: 'https://picsum.photos/seed/bronze-blush/400/300',
      imageAlt: 'Sun bronze blush',
    },
  ],
  undertone: 'olive-warm',
  depth: 'medium',
}

const WARM_NIGHT_RECIPE: MakeupRecipe = {
  id: 'warm-night-1',
  occasion: 'night',
  format: 'individual',
  lookName: 'One strong thing',
  story: {
    harmony: 'Deep terracotta lip, minimal eye — the lip does all the work.',
    skinTone: 'Warm brick tones sit beautifully against golden-olive skin — depth without heaviness.',
  },
  products: [
    {
      id: 'p1',
      type: 'lip',
      label: 'Lip Colour',
      shade: 'Terracotta',
      swatch: { hex: '#a05a2c', name: 'terracotta' },
      image: 'https://picsum.photos/seed/terracotta-lip/400/300',
      imageAlt: 'Terracotta lip colour',
      isFocalPoint: true,
    },
    {
      id: 'p2',
      type: 'eye',
      label: 'Mascara',
      shade: 'Black',
      swatch: { hex: '#1a1a1a', name: 'black' },
      image: 'https://picsum.photos/seed/mascara-black/400/300',
      imageAlt: 'Black mascara',
    },
  ],
  undertone: 'olive-warm',
  depth: 'medium',
}

const COOL_DAY_RECIPE: MakeupRecipe = {
  id: 'cool-day-1',
  occasion: 'day',
  format: 'individual',
  lookName: 'Quietly polished',
  story: {
    harmony: 'Champagne eye, soft mauve lip — everything stays cool and in the same family.',
    skinTone: 'The rose and mauve echo the cool-pink in your complexion.',
  },
  products: [
    {
      id: 'p1',
      type: 'eye',
      label: 'Eyeshadow',
      shade: 'Champagne Rose',
      swatch: { hex: '#d4a5a0', name: 'champagne rose' },
      image: 'https://picsum.photos/seed/rose-eye/400/300',
      imageAlt: 'Champagne rose eyeshadow',
      isFocalPoint: true,
    },
    {
      id: 'p2',
      type: 'lip',
      label: 'Lip Colour',
      shade: 'Soft Mauve',
      swatch: { hex: '#c4909a', name: 'soft mauve' },
      image: 'https://picsum.photos/seed/mauve-lip/400/300',
      imageAlt: 'Soft mauve lip colour',
    },
    {
      id: 'p3',
      type: 'cheek',
      label: 'Blush',
      shade: 'Cool Pink',
      swatch: { hex: '#d4a0aa', name: 'cool pink blush' },
      image: 'https://picsum.photos/seed/pink-blush/400/300',
      imageAlt: 'Cool pink blush',
      undertoneNote: 'Light hand — just a flush',
    },
  ],
  undertone: 'cool',
  depth: 'light',
}

const PALETTE_NIGHT_RECIPE: MakeupRecipe = {
  id: 'palette-night-1',
  occasion: 'night',
  format: 'palette',
  lookName: 'Warm smoky in one step',
  story: {
    harmony: 'One palette carries the whole look — build from champagne lid to deep bronze crease.',
    skinTone: 'The warm bronze family sits right with olive undertones — nothing looks muddy or grey.',
  },
  products: [
    {
      id: 'p1',
      type: 'palette',
      label: 'Eyeshadow Palette',
      shade: 'Warm Neutrals',
      swatch: { hex: '#c4864a', name: 'warm neutrals palette' },
      image: 'https://picsum.photos/seed/warm-palette/400/300',
      imageAlt: 'Warm neutrals eyeshadow palette',
      isFocalPoint: true,
      undertoneNote: 'Shades 1–3 for day, 5–7 to deepen for night',
    },
    {
      id: 'p2',
      type: 'lip',
      label: 'Lip Colour',
      shade: 'Nude Brick',
      swatch: { hex: '#b07060', name: 'nude brick' },
      image: 'https://picsum.photos/seed/brick-lip/400/300',
      imageAlt: 'Nude brick lip colour',
    },
  ],
  undertone: 'olive-warm',
  depth: 'medium',
}

// Same as WARM_DAY but no images — exercises the swatch strip fallback
const NO_IMAGES_RECIPE: MakeupRecipe = {
  ...WARM_DAY_RECIPE,
  id: 'no-images-1',
  products: WARM_DAY_RECIPE.products.map(({ image: _img, imageAlt: _alt, ...p }) => p),
}

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Core/MakeupRecipeCard',
  component: MakeupRecipeCard,
  tags: ['autodocs'],
  args: {
    recipe: WARM_DAY_RECIPE,
    onAddToCart: (products: MakeupProduct[]) => console.log('Add to cart', products),
    onSave: (recipe: MakeupRecipe) => console.log('Save look', recipe.lookName),
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-[340px] md:w-[380px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MakeupRecipeCard>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {}

export const NightOut: Story = {
  name: 'Night out — lip-led, 2 products',
  args: { recipe: WARM_NIGHT_RECIPE },
}

export const CoolUndertone: Story = {
  name: 'Cool undertone — East Asian, 3 products',
  args: { recipe: COOL_DAY_RECIPE },
}

export const PaletteFormat: Story = {
  name: 'Palette format — 2 products',
  args: { recipe: PALETTE_NIGHT_RECIPE },
}

export const SwatchFallback: Story = {
  name: 'No images — swatch strip fallback',
  args: { recipe: NO_IMAGES_RECIPE },
}

export const NoActions: Story = {
  name: 'Display only — no cart or save',
  args: { recipe: WARM_DAY_RECIPE, onAddToCart: undefined, onSave: undefined },
}

export const CarouselHero: Story = {
  name: 'Carousel hero — swipe through products',
  args: { recipe: WARM_DAY_RECIPE, hero: 'carousel' },
}

export const Interactive: Story = {
  name: 'Interactive — live callbacks',
  render: args => {
    const [lastProduct, setLastProduct] = useState<MakeupProduct | null>(null)
    const [saved, setSaved] = useState(false)
    const [cartProducts, setCartProducts] = useState<MakeupProduct[]>([])

    return (
      <div className="flex flex-col gap-4 w-[340px] md:w-[380px]">
        <MakeupRecipeCard
          {...args}
          onProductClick={p => setLastProduct(p)}
          onAddToCart={ps => setCartProducts(ps)}
          onSave={() => setSaved(true)}
        />

        {lastProduct && (
          <p className="text-xs text-muted-foreground text-center">
            Tapped:{' '}
            <span className="font-medium text-foreground">
              {lastProduct.label} — {lastProduct.shade}
            </span>
          </p>
        )}

        {saved && (
          <p className="text-xs text-center text-muted-foreground">Look saved ✓</p>
        )}

        {cartProducts.length > 0 && (
          <div className="bg-muted rounded-xl p-3 md:p-4 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Cart — {cartProducts.length} product{cartProducts.length !== 1 ? 's' : ''}
            </p>
            {cartProducts.map(p => (
              <div key={p.id} className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                <span
                  className="size-4 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: p.swatch.hex }}
                />
                <span>{p.label}</span>
                <span className="text-muted-foreground ml-auto">{p.shade}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}
