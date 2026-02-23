import '@mantine/core';
import type { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';
type CustomColors = 'vdarkGray' | DefaultMantineColor;
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}
