import { RadiusSchema } from '@/shared/lib/settings/settings/model/types';
import {
    ActionIcon,
  AppShell,
  AppShellAside,
  AppShellNavbar,
  Button,
  createTheme,
  Drawer,
  MenuDropdown,
  Modal,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
  ThemeIcon,
  virtualColor,
  type MantineColorsTuple,
} from '@mantine/core';

const dark: MantineColorsTuple = [
  '#F5F5F5',
  '#8a8a8a',
  '#737373',
  '#5c5c5c',
  '#454545',
  '#1c1c1c',
  '#121212',
  '#0d0d0d',
  '#141414',
  '#0b0b0b',
];

const colors: Record<string, MantineColorsTuple> = {
  dark,
  deepRed: [
    '#fceeef',
    '#f2d9da',
    '#e8afb2',
    '#df8286',
    '#d75c61',
    '#d3454a',
    '#d2393e',
    '#ba2d31',
    '#a6262a',
    '#691419',
  ],
  blue: [
    '#e5f3ff',
    '#cde2ff',
    '#9ac2ff',
    '#64a0ff',
    '#3884fe',
    '#1d72fe',
    '#0063ff',
    '#0058e4',
    '#004ecd',
    '#0043b5',
  ],
};

export const theme = createTheme({
  colors: {
    vdarkGray: virtualColor({
      name: 'vdarkGray',
      light: 'gray',
      dark: 'dark',
    }),
    ...colors,
  },

  primaryColor: 'violet',
  primaryShade: { light: 6, dark: 9 },
  other: {
    borders: {
      darkXs: '1px solid dark.9',
      darkSm: '2px solid dark.9',
      darkMd: '3px solid dark.9',
    },
  },

  
  cursorType: 'pointer',
  white: '#FFFFFF',
  black: '#000000',

  fontFamily:
    "'JetBrains Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
  fontFamilyMonospace: "'JetBrains Mono', monospace",

  headings: {
    fontFamily: "'Montserrat', 'Inter', sans-serif",
    fontWeight: '700',
    textWrap: 'balance',
    sizes: {
      h1: { fontSize: '2.5rem', fontWeight: '700' },
      h2: { fontSize: '2rem', fontWeight: '700' },
      h3: { fontSize: '1.75rem', fontWeight: '700' },
      h4: { fontSize: '1.5rem', fontWeight: '700' },
      h5: { fontSize: '1.25rem', fontWeight: '700' },
      h6: { fontSize: '1rem', fontWeight: '700' },
    },
  },

  radius: RadiusSchema.parse({}),
  defaultRadius: 'md',

  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },

  lineHeights: {
    xs: '1.1',
    sm: '1.2',
    md: '1.4',
    lg: '1.6',
    xl: '1.8',
  },

  breakpoints: { xs: '36em', sm: '48em', md: '62em', lg: '75em', xl: '88em' },

  shadows: {
    xs: 'none',
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
  },
  defaultGradient: {
    from: 'blue',
    to: 'indigo',
  },
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'md',
        variant: 'filled',

        styles() {
          return {
            input: {},
          };
        },
      },
    }),

    Textarea: Textarea.extend({
      defaultProps: {
        radius: 'md',
        variant: 'filled',

        styles() {
          return {
            input: {},
          };
        },
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: 'md',
        variant: 'filled',
      },
    }),
    Button: Button.extend({
      defaultProps: {
        bdrs: 'xl',
      },
    }),
    Drawer: Drawer.extend({
      defaultProps: {
        offset: 0,
      },
    }),

    AppShell: AppShell.extend({
      defaultProps: {
        navbar: {
          width: '20rem',
          breakpoint: 'xs',
          collapsed: { mobile: false },
        },
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: 'transparent',
      },
    }),

    AppShellNavbar: AppShellNavbar.extend({}),
    AppShellAside: AppShellAside.extend({}),
    MenuDropdown: MenuDropdown.extend({
      defaultProps: {},
    }),
    Modal: Modal.extend({
      styles: () => ({
        header: {},
        content: {
          overflowX: 'hidden',
        },
      }),
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps:{
        bdrs:'xl'
      }
    }),
    Select: Select.extend({
      defaultProps: {
        styles() {
          return {
            input: {},
            dropdown: {},
          };
        },
      },
    }),
  },
});
