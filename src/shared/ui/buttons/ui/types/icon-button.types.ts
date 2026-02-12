import type { ButtonProps, ThemeIconProps } from '@mantine/core';
import { type ComponentProps } from 'react';

export interface IIconButtonProps
  extends Omit<ButtonProps & ComponentProps<'button'>, 'variant'> {
  themeIconProps?: Omit<ThemeIconProps, 'children'>;
}
