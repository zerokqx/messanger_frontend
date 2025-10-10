import { useMantineColorScheme, type MantineColorScheme } from '@mantine/core';
import { FaMoon } from 'react-icons/fa';
import { IoIosSunny } from 'react-icons/io';
import type { IconType } from 'react-icons/lib';
import { MdAutoAwesome } from 'react-icons/md';
import type { UseThemeHook } from '../types/useTheme.type';

export const useTheme: UseThemeHook = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const Icons: Record<MantineColorScheme, IconType> = {
    dark: FaMoon,
    light: IoIosSunny,
    auto: MdAutoAwesome,
  };
  const IconComponent = Icons[colorScheme];
  const set = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  return {
    Icon: IconComponent,
    set,
  };
};
