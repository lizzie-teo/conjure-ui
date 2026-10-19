// Theming
export { default as ThemeProvider } from './components/ThemeProvider';

// Motion tokens and presets — the same values the components use
export {
  duration,
  ease,
  spring,
  stagger,
  revealPresetNames,
  getRevealPreset,
  useRevealPreset,
} from './lib/motion';
export type { RevealPresetName, RevealPresetOptions, RevealPreset } from './lib/motion';

// Primitives
export * from './components/primitives';

// Core components
export * from './components/core';

// Layouts
export * from './components/layouts';
