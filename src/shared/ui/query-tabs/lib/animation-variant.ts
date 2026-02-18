import type { Transition, Variants } from 'motion/react';
export type DirectionVariants = 'back' | 'next';

const PX = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 40,
  offX: 80,
  offX2: 120,
  offY: 100,
  offY2: 160,
} as const;

export const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    open: { opacity: 1 },
    closed: { opacity: 0 },
  },

  scale: {
    initial: { scale: 0.96, opacity: 0 },
    open: { scale: 1, opacity: 1 },
    closed: { scale: 0.96, opacity: 0 },
  },

  'small-slide-y': {
    initial: { y: -PX.sm, opacity: 0 },
    open: { y: 0, opacity: 1 },
    closed: { y: PX.sm, opacity: 0 },
  },

  'slide-x': {
    initial: { x: -PX.offX2, opacity: 0 },
    open: { x: 0, opacity: 1 },
    closed: { x: PX.offX2, opacity: 0 },
  },

  stack: {
    initial: { opacity: 0, y: PX.sm, scale: 0.98 },
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: PX.md, scale: 0.96 },
  },

  'slide-y': {
    initial: { y: -PX.xl, opacity: 0 },
    open: { y: 0, opacity: 1 },
    closed: { y: PX.xl, opacity: 0 },
  },

  none: {
    initial: {},
    open: {},
    closed: {},
  },

  /**
   * drop-card (оптимизированная версия)
   * ⚠️ Рекомендация: вынеси в style на компонент:
   * style={{ transformPerspective: 800, transformOrigin: 'top left' }}
   */
  'drop-card': {
    initial: { opacity: 0, y: -60, scale: 0.98, rotate: -2 },
    open: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
    closed: { opacity: 0, x: PX.offX2, y: PX.offY2, scale: 1.1, rotate: -6 },
  },

  /**
   * blur — heavy (дороже, чем transform/opacity)
   * Используй точечно (модалки/hero), не для больших списков.
   */
  blur: {
    initial: { filter: 'blur(4px)', opacity: 0 },
    open: { filter: 'blur(0px)', opacity: 1 },
    closed: { filter: 'blur(4px)', opacity: 0 },
  },

  /**
   * slide-right-shrink (лёгкая версия без blur)
   */
  'slide-right-shrink': {
    initial: { x: -PX.xs, scale: 0.98, opacity: 0 },
    open: { x: 0, scale: 1, opacity: 1 },
    closed: { x: PX.sm, scale: 0.96, opacity: 0 },
  },

  /**
   * blur-slide-x — heavy (был blur, оставлен)
   */
  'blur-slide-x': {
    initial: { x: -PX.lg, opacity: 0, filter: 'blur(6px)' },
    open: { x: 0, opacity: 1, filter: 'blur(0px)' },
    closed: { x: PX.lg, opacity: 0, filter: 'blur(6px)' },
  },

  lift: {
    initial: { y: PX.sm, opacity: 0, scale: 0.99 },
    open: { y: 0, opacity: 1, scale: 1 },
    closed: { y: -6, opacity: 0, scale: 0.98 },
  },

  'blur-reveal': {
    initial: { opacity: 0, filter: 'blur(6px)' },
    open: { opacity: 1, filter: 'blur(0px)' },
    closed: { opacity: 0, filter: 'blur(4px)' },
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

/** опционально, если хочешь единые transition рядом */
export const animationTransitions = {
  in: { duration: 0.18, ease: 'easeOut' },
  out: { duration: 0.12, ease: 'easeIn' },
  soft: { duration: 0.22, ease: 'easeOut' },
} satisfies Record<string, Transition>;
