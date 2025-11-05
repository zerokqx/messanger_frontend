import { type MantineColorScheme } from '@mantine/core';
import type { IconType } from 'react-icons/lib';

export type ThemeIconRecord = Record<MantineColorScheme, IconType>;
export type UseThemeHook = () => {
  Icon: IconType;
  set: () => void;
};
