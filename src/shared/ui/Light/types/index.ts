import type { motion } from 'motion/react';
import type { ComponentProps } from 'react';

export interface LightProp extends ComponentProps<typeof motion.div> {
  w: number;
  h: number;
}
