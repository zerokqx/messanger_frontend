import { type MantineColorScheme } from '@mantine/core';
import type { IconNode, LucideIcon } from 'lucide-react';

export type ThemeIconRecord = Record<MantineColorScheme, LucideIcon>;
export type UseThemeHook = () => {
  Icon: LucideIcon;
  set: () => void;
  colorScheme: MantineColorScheme;
};
