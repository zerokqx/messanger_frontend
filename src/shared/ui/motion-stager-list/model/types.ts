import type { Variant, Variants } from 'motion/react';

export interface MotionStagerListAnimationVariant {
  hidden: Variants;
  visible: Variants;
}

export interface VariantsType {
  container?: Variants;
  item?: Variants;
}
