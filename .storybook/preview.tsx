import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { cn } from '../lib/utils';
import '../app/globals.css';
import './themes.css';

const preview: Preview = {
  decorators: [
    // Components scale against the box they sit in (a container query), not the
    // screen. A consumer gives them that box with `@container`; this wrapper is
    // Storybook's stand-in, so the viewport toolbar and Chromatic's widths reach
    // the components. Without it every story would render at its compact size.
    // It must have a definite width — an inline-size container sizes to 0 when
    // shrink-wrapped — so centred stories are centred inside it instead.
    (Story, { parameters }) => (
      <div className={cn('@container w-full', parameters.layout === 'centered' && 'flex justify-center')}>
        <Story />
      </div>
    ),
    // The addon swaps a single class but accepts a space-separated string, which
    // is how the two axes (light/dark, styled/wireframe) coexist in one toolbar.
    // Wireframe ships in app/theme.css — unlike the client themes in themes.css,
    // it is a real package surface, not a demo.
    withThemeByClassName({
      themes: {
        'Light': '',
        'Dark': 'dark',
        'Wireframe': 'theme-wireframe',
        'Wireframe Dark': 'dark theme-wireframe',
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
    viewport: {
      options: {
        phone: { name: 'Phone', styles: { width: '375px', height: '812px' }, type: 'mobile' },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' }, type: 'desktop' },
      },
    },
    // Two widths per story: one each side of the container breakpoint. Doubles
    // the snapshot count, which is the price of seeing a layout break on a phone.
    chromatic: {
      modes: {
        phone: { viewport: 375 },
        desktop: { viewport: 1280 },
      },
    },
  },
};

export default preview;
