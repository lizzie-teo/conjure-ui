import type { StorybookConfig } from '@storybook/nextjs-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  viteFinal: (config): InlineConfig => {
    config.optimizeDeps ??= {};
    config.optimizeDeps.include ??= [];
    config.optimizeDeps.include.push('motion', 'motion/react');
    return config;
  },
  // Components own their stories beside their source. There is no top-level
  // `stories/` folder — a glob for one would match nothing and warn every run.
  "stories": [
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/nextjs-vite",
  // There is no `../public` entry, and no `public/` folder — the custom domain
  // is parked, and publishing a CNAME before its DNS record exists would take
  // the site down rather than move it (see CLAUDE.md). Restoring it needs no
  // config change: Vite's default publicDir copies `public/` on its own, which
  // is why the staticDirs entry this replaced was redundant, and why deleting
  // the entry alone did not stop the file shipping.
  "staticDirs": [
    { from: "../components/primitives/payment-logos", to: "/payment-logos" }
  ]
};
export default config;