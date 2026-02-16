import type { Variants } from 'motion/react';

export const animationVariants = {
  fade: {
    open: { opacity: 1 },
    closed: { opacity: 0 },
    initial: { opacity: 0 },
  },

  scale: {
    open: { scale: 1, opacity: 1 },
    closed: { scale: 0, opacity: 0 },
    initial: { scale: 0, opacity: 0 },
  },

  'small-slide-y': {
    open: { y: '0', opacity: 1 },
    closed: { y: '10%', opacity: 0 },
    initial: { y: '-10%', opacity: 0 },
  },

  'slide-x': {
    open: { x: '0', opacity: 1 },
    closed: { x: '100%', opacity: 0 },
    initial: { x: '-100%', opacity: 0 },
  },

  stack: {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.98,
    },

    open: {
      opacity: 1,
      y: 0,
      scale: 1,
    },

    closed: {
      opacity: 0,
      y: 16,
      scale: 0.95,
    },
  },

  'slide-y': {
    open: { y: '0', opacity: 1 },
    closed: { y: '100%', opacity: 0 },
    initial: { y: '-100%', opacity: 0 },
  },

  none: {
    open: {},
    closed: {},
    initial: {},
  },

  'drop-card': {
    initial: {
      opacity: 0,
      y: -100,
      scale: 0.96,
      rotate: -2,
      transformPerspective: 800,
    },

    open: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transformPerspective: 800,
    },

    closed: {
      opacity: 0,
      x: 120,
      y: 160,
      scale: 2,
      rotate: -10,
      transformOrigin: 'top left',
      transformPerspective: 800,
    },
  },

  blur: {
    open: {
      willChange: 'filter, opacity',
      filter: 'blur(0px)',
      opacity: 1,
    },

    closed: {
      willChange: 'filter, opacity',
      filter: 'blur(4px)',
      opacity: 0,
    },

    initial: {
      willChange: 'filter, opacity',
      filter: 'blur(4px)',
      opacity: 0,
    },
  },

  'slide-right-shrink': {
    initial: {
      x: '-8%',
      scale: 0.98,
      opacity: 0,
      filter: 'blur(2px)',
      willChange: 'transform, filter, opacity',
    },

    open: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      willChange: 'transform, filter, opacity',
    },

    closed: {
      x: '12%',
      scale: 0.94,
      opacity: 0,
      filter: 'blur(2px)',
      willChange: 'transform, filter, opacity',
    },
  },

  'blur-slide-x': {
    initial: {
      x: -24,
      opacity: 0,
      filter: 'blur(6px)',
      willChange: 'transform, filter, opacity',
    },
    open: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      willChange: 'transform, filter, opacity',
    },
    closed: {
      x: 24,
      opacity: 0,
      filter: 'blur(6px)',
      willChange: 'transform, filter, opacity',
    },
  },

  lift: {
    initial: { y: 10, opacity: 0, scale: 0.99 },
    open: { y: 0, opacity: 1, scale: 1 },
    closed: { y: -6, opacity: 0, scale: 0.98 },
  },

  'blur-reveal': {
    initial: {
      opacity: 0,
      filter: 'blur(6px)',
      willChange: 'filter, opacity',
    },
    open: {
      opacity: 1,
      filter: 'blur(0px)',
      willChange: 'filter, opacity',
    },
    closed: {
      opacity: 0,
      filter: 'blur(4px)',
      willChange: 'filter, opacity',
    },
  },

  'slide-shrink': {
    initial: { x: -30, scale: 0.98, opacity: 0 },
    open: { x: 0, scale: 1, opacity: 1 },
    closed: { x: 40, scale: 0.96, opacity: 0 },
  },

  'scale-fade': {
    initial: { scale: 0.97, opacity: 0 },
    open: { scale: 1, opacity: 1 },
    closed: { scale: 0.97, opacity: 0 },
  },

  'slide-fade': {
    initial: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
    closed: { x: 20, opacity: 0 },
  },
} satisfies Record<string, Variants>;

export type TabAnimationVariant = keyof typeof animationVariants;
