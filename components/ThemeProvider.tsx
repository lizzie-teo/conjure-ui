import { useId, type ComponentPropsWithRef } from 'react';
import { cn } from '../lib/utils';

export interface ThemeProviderProps extends ComponentPropsWithRef<'div'> {
  /**
   * Token overrides, e.g. { '--primary': 'oklch(0.45 0.12 160)' }.
   * Colours apply in light mode only. Shape and type tokens (`--radius`,
   * `--font-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--spacing`) apply
   * in both modes.
   */
  tokens?: Record<string, string>;
  /** Colour overrides for dark mode. Without them, dark mode keeps the library's dark palette. */
  darkTokens?: Record<string, string>;
  /** Apply dark mode by adding the .dark class */
  dark?: boolean;
}

/** Tokens that are not colours, so one value serves both modes. */
const SHARED_TOKEN = /^--(radius|font|text|leading|tracking|spacing)/;
const VALID_NAME = /^--[\w-]+$/;
/** Anything that could close the rule or the <style> element. */
const UNSAFE_VALUE = /[{};<>]/;

function declarations(entries: [string, string][]) {
  return entries
    .filter(([name, value]) => VALID_NAME.test(name) && !UNSAFE_VALUE.test(value))
    .map(([name, value]) => `${name}:${value};`)
    .join('');
}

/*
 * Tokens are written to a scoped <style>, not the inline `style` attribute.
 * Inline styles cannot tell light from dark, so a brand's light colours used
 * to stay put in dark mode. The scoped rules can:
 *   - light colours match only outside `.dark`
 *   - dark colours match only inside `.dark` — set by the `dark` prop or by
 *     any ancestor, such as a `.dark` the app puts on <html>
 * The wrapper's `data-conjure-theme` attribute also makes theme.css re-derive
 * the Tier 2 surfaces from these tokens.
 */
export default function ThemeProvider({
  tokens = {},
  darkTokens = {},
  dark = false,
  className,
  children,
  ...props
}: ThemeProviderProps) {
  const id = useId();
  const scope = `[data-conjure-theme="${id}"]`;

  const entries = Object.entries(tokens);
  const shared = declarations(entries.filter(([name]) => SHARED_TOKEN.test(name)));
  const light = declarations(entries.filter(([name]) => !SHARED_TOKEN.test(name)));
  const darkOnly = declarations(Object.entries(darkTokens));

  const css = [
    shared && `${scope}{${shared}}`,
    light && `${scope}:not(.dark, .dark *){${light}}`,
    darkOnly && `${scope}:is(.dark, .dark *){${darkOnly}}`,
  ]
    .filter(Boolean)
    .join('');

  return (
    <>
      {css && <style>{css}</style>}
      <div
        {...props}
        data-conjure-theme={id}
        className={cn(dark && 'dark', className) || undefined}
      >
        {children}
      </div>
    </>
  );
}
