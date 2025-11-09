import {
  useComputedColorScheme,
  useMantineColorScheme,
  type MantineColorScheme,
} from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import type { IconType } from 'react-icons/lib';
import { MdAutoAwesome } from 'react-icons/md';
import type { UseThemeHook } from '../types/useTheme.type';

export const useTheme: UseThemeHook = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  const Icons: Record<MantineColorScheme, IconType> = {
    dark: Moon,
    light: Sun,
    auto: MdAutoAwesome,
  };

  const IconComponent = Icons[colorScheme];

  const set = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return {
    Icon: IconComponent,
    set,
    colorScheme,
  };
};
