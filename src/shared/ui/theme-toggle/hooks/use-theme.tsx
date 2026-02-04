import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun, SunMoon } from 'lucide-react';
import type { ThemeIconRecord, UseThemeHook } from '../types/use-theme.type';

export const useTheme: UseThemeHook = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  const Icons: ThemeIconRecord = {
    dark: Moon,
    light: Sun,
    auto: SunMoon,
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
