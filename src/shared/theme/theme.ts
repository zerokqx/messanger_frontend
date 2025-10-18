import { createTheme, type MantineColorsTuple } from '@mantine/core';

import chroma from 'chroma-js';
const colors: Record<string, MantineColorsTuple> = {
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
  black: [
    '#ffffff',
    '#e7e7e7',
    '#cdcdcd',
    '#b2b2b2',
    '#9a9a9a',
    '#8b8b8b',
    '#848484',
    '#717171',
    '#656565',
    '#000000',
  ],
};
export const theme = createTheme({
  colors,

  primaryColor: 'blue',
  primaryShade: { light: 6, dark: 8 },

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

  radius: {
    xs: '0px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
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
});
