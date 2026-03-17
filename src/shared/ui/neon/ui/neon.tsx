import { Box } from '@mantine/core';
import type { CSSProperties } from 'react';
import type { NeonProps } from './types';

export const Neon = ({
  color = '#22d3ee',
  size = 180,
  blur = 24,
  intensity = 0.9,
  withCore = true,
  style,
  ...props
}: NeonProps) => {
  const safeIntensity = Math.max(0, Math.min(1, intensity));
  const neonStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: `blur(${blur}px)`,
    opacity: safeIntensity,
    background: withCore
      ? `radial-gradient(circle, ${color} 0%, color-mix(in srgb, ${color} 70%, transparent) 32%, transparent 72%)`
      : `radial-gradient(circle, color-mix(in srgb, ${color} 75%, transparent) 0%, transparent 72%)`,
    boxShadow: `0 0 ${Math.max(size * 0.45, 1)}px color-mix(in srgb, ${color} 70%, transparent)`,
    transform: 'translateZ(0)',
  };

  return (
    <Box style={{ ...neonStyle, ...(style as CSSProperties | undefined) }} {...props} />
  );
};
