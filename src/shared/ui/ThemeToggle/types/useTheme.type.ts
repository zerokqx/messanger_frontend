import { type MantineColorScheme } from '@mantine/core';
import type { IconType } from 'react-icons/lib';

export type ThemeIconRecord = Record<MantineColorScheme, IconType>;
export type UseThemeHook = <T extends HTMLElementEventMap['click']>() => {
  icon: IconType;
  set: () => void;
};
