import { Portal, useMantineTheme } from '@mantine/core';
import { motion } from 'motion/react';
import { useRef } from 'react';
import type { LightProp } from '../types';
export const Light = ({ w = 100, h = 100, style, ...props }: LightProp) => {
  const t = useMantineTheme();
  const ref = useRef<HTMLDivElement>(null);
  const size = w + h;

  const Z_MAX = 0.9;

  const C = 500;

  const maxOpacity = Z_MAX * (size / (C + size));

  const minOpacity = maxOpacity * 0.7;

  return (
    <Portal>
      <motion.div
        ref={ref}
        animate={{
          opacity: [maxOpacity, minOpacity, maxOpacity],
        }}
        transition={{
          delay: 7,
          duration: 20,
          repeat: Infinity, // бесконечный цикл
          ease: 'linear',
        }}
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
          width: w,
          height: h,
          background: t.colors.blue[8],
          position: 'fixed',
          top: 0,
          right: 0,
          opacity: minOpacity,
          borderRadius: C,
          filter: `blur(${((w + h) / 2).toString()}px)`,
          ...style,
        }}
        {...props}
      />
    </Portal>
  );
};
