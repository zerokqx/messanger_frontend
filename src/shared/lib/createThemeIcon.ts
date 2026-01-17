import {
  ThemeIcon,
  type MantineColor,
  type ThemeIconProps,
} from '@mantine/core';
import type { ReactNode } from 'react';

export const createThemeIcon = (
  children: ReactNode,
  color?: MantineColor,
  props?: Omit<ThemeIconProps, 'children' | 'color'>
) => ThemeIcon({ children, color, ...props });
