import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../app/globals.css';
import './themes.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        'Light': '',
        'Dark': 'dark',
      },
      defaultTheme: 'Light',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      // Every public component forwards rest props to its root, so its prop type
      // extends ComponentPropsWithRef<'div'> (etc). Docgen would otherwise fill the
      // Controls panel with a few hundred inherited DOM attributes and bury the
      // props that actually describe the component. Hide the passthrough noise.
      exclude: /^(aria-|data-|on[A-Z]|(class|item|content|input|auto|spell|dangerously|unselectable|radio|security|results|vocab|inert|is|about|datatype|prefix|property|rel|resource|rev|typeof|color)|ref$|key$|slot$|style$|dir$|lang$|role$|tabIndex$|id$|title$|hidden$|draggable$|translate$|nonce$|suppress|access|contextMenu$|inlist$|placeholder$|defaultChecked$|defaultValue$|children$)/,
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
