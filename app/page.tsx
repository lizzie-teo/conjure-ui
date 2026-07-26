import { LinkButton, AnchorButton } from './_site/LinkButton'
import { IndustryBadge } from './_site/IndustryBadge'
import type { Industry } from './_data/component-catalog'

const STORYBOOK_URL = 'https://6a251cdcacca87566659252b-mxrwfqmaxy.chromatic.com/'

const INDUSTRIES: { id: Industry; label: string; tagline: string }[] = [
  { id: 'travel',    label: 'Travel',    tagline: 'Search, compare, book' },
  { id: 'banking',   label: 'Banking',   tagline: 'Auth, pay, confirm' },
  { id: 'merchants', label: 'Merchants', tagline: 'Browse, cart, checkout' },
  { id: 'insurance', label: 'Insurance', tagline: 'Quote, compare, cover' },
]

export default function HomePage() {
  return (
    <div>

      {/* Hero */}
      <section className="site-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 md:px-8 py-20 md:py-28 lg:py-36">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            @lizzie-teo/conjure-ui
          </p>
          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] max-w-2xl">
            White-label AI chat components
          </h1>
          <p className="mb-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            37 production-ready components for travel, banking, merchants, and insurance. Fully themeable — swap a client brand without touching component code.
          </p>

          {/* Primary CTA — Storybook */}
          <div className="flex flex-col sm:flex-row gap-3">
            <AnchorButton
              href={STORYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="text-base"
            >
              Browse components in Storybook ↗
            </AnchorButton>
            <LinkButton href="/figma-make" variant="outline" size="lg" className="text-base">
              Designer setup guide
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Storybook callout */}
      <section className="border-b border-border bg-foreground text-background">
        <a
          href={STORYBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 md:px-8 py-6 md:py-8"
        >
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <div className="shrink-0 flex size-10 md:size-12 items-center justify-center rounded-xl bg-background/10 text-xl">
              📖
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-0.5">
                Live on Chromatic
              </p>
              <p className="text-sm md:text-base font-semibold truncate">
                All 37 components — interactive, with full story docs
              </p>
            </div>
          </div>
          <span className="shrink-0 text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
            Open Storybook ↗
          </span>
        </a>
      </section>

      {/* Industries */}
      <section className="mx-auto max-w-5xl px-4 md:px-8 py-14 md:py-20">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">Built for 4 verticals</h2>
        <p className="text-muted-foreground mb-8">Every component is tagged by industry so you pick only what fits.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {INDUSTRIES.map(({ id, label, tagline }) => (
            <div key={id} className="rounded-xl border border-border bg-card p-4 md:p-5 shadow-sm">
              <IndustryBadge industry={id} className="mb-3" />
              <p className="text-sm font-semibold mb-0.5">{label}</p>
              <p className="text-xs text-muted-foreground">{tagline}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Figma Make */}
      <section className="mx-auto max-w-5xl px-4 md:px-8 py-14 md:py-20">
        <div className="rounded-2xl border border-border bg-card px-6 md:px-10 py-8 md:py-12 shadow-sm">
          <div className="max-w-lg">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              For designers
            </p>
            <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-tight">
              White-label a client in Figma Make
            </h2>
            <p className="mb-6 text-muted-foreground leading-relaxed text-sm md:text-base">
              Four steps with copy-ready AI prompts — clone the library, extract brand colours, remap tokens, done.
            </p>
            <LinkButton href="/figma-make">Read the setup guide →</LinkButton>
          </div>
        </div>
      </section>

    </div>
  )
}
