import type { BoxProps } from '@mantine/core';

export interface NeonProps extends Omit<BoxProps, 'children'> {
  color?: string;
  size?: number;
  blur?: number;
  intensity?: number;
  withCore?: boolean;
}
