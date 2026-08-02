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
  "staticDirs": [
    "../public",
    { from: "../components/primitives/payment-logos", to: "/payment-logos" }
  ]
};
export default config;