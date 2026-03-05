import type { Variants } from 'motion/react';

type DirectionVariants = 'back' | 'next';

const PX = {
  sm: 12,
  md: 16,
  xl: 40,
  offX2: 120,
} as const;

export const animationVariants = {
  scale: {
    initial: {
      scale: 0,
      opacity: 0,
    },
    open: { scale: 1, opacity: 1 },
    closed: { scale: 0, opacity: 0 },
  },

  'slide-x': {
    initial: { x: '-100%', opacity: 0 },
    open: { x: '0', opacity: 1 },
    closed: { x: '100%', opacity: 0 },
  },

  stack: {
    initial: { opacity: 0, y: PX.sm, scale: 0.98 },
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: PX.md, scale: 0.96 },
  },

  'slide-y-up': {
    initial: { y: -PX.xl, opacity: 0 },
    open: { y: 0, opacity: 1 },
    closed: { y: -PX.xl, opacity: 0 },
  },

  none: {
    initial: {},
    open: {},
    closed: {},
  },
} satisfies Record<string, Variants>;


export type TabAnimationVariant = keyof typeof animationVariants;
