import type { Variants } from 'motion/react';
import type { TabAnimationVariant } from '../ui/tabs.type';

export const animationVariants: Record<TabAnimationVariant, Variants> = {
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
  'slide-x': {
    open: { x: '0', opacity: 1 },
    closed: { x: '100%', opacity: 0 },
    initial: { x: '-100%', opacity: 0 },
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
  blur: {
    open: {
      willChange: 'filter',
      filter: 'blur(0px)',
      opacity: 1,
      transition: { type: 'tween' },
    },

    closed: {
      willChange: 'filter',
      filter: 'blur(4px)',
      opacity: 0,
      transition: { type: 'tween' },
    },

    initial: {
      willChange: 'filter',
      filter: 'blur(4px)',
      opacity: 0,
      transition: { type: 'tween' },
    },
  },
};
