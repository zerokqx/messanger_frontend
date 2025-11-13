import type { GridColProps, GridProps, ThemeIconProps } from '@mantine/core';
import type { ReactNode } from 'react';

type Span = 'icon';

export interface WithIconProp
  extends GridProps,
    Partial<Record<`${Span}Span`, GridColProps['span']>> {
  themeIconProps?: ThemeIconProps;
  children: ReactNode;
  icon: ReactNode;
}
