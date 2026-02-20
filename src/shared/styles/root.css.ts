import { globalStyle } from '@vanilla-extract/css';

globalStyle('body,#root,html', {
  overflowX: 'hidden',
});

globalStyle('html', {
  vars: {
    '--app-scroll-track': 'var(--mantine-color-gray-2)',
    '--app-scroll-thumb': 'var(--mantine-color-blue-5)',
    '--app-scroll-thumb-hover': 'var(--mantine-color-blue-6)',
    '--app-scroll-thumb-active': 'var(--mantine-color-blue-7)',
  },
});

globalStyle('[data-mantine-color-scheme="dark"]', {
  vars: {
    '--app-scroll-track': 'var(--mantine-color-dark-6)',
    '--app-scroll-thumb': 'var(--mantine-color-blue-7)',
    '--app-scroll-thumb-hover': 'var(--mantine-color-blue-6)',
    '--app-scroll-thumb-active': 'var(--mantine-color-blue-5)',
  },
});

globalStyle('*', {
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--app-scroll-thumb) var(--app-scroll-track)',
});

globalStyle('*::-webkit-scrollbar', {
  width: '11px',
  height: '11px',
});

globalStyle('*::-webkit-scrollbar-track', {
  background: 'var(--app-scroll-track)',
  borderRadius: '999px',
});

globalStyle('*::-webkit-scrollbar-thumb', {
  backgroundColor: 'var(--app-scroll-thumb)',
  borderRadius: '999px',
  border: '2px solid var(--app-scroll-track)',
  backgroundClip: 'padding-box',
  minHeight: '28px',
});

globalStyle('*::-webkit-scrollbar-thumb:hover', {
  backgroundColor: 'var(--app-scroll-thumb-hover)',
});

globalStyle('*::-webkit-scrollbar-thumb:active', {
  backgroundColor: 'var(--app-scroll-thumb-active)',
});

globalStyle('*::-webkit-scrollbar-corner', {
  background: 'var(--app-scroll-track)',
});
