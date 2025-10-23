import type { FlexProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface InfoBlockProp {
  accent?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  inline?: boolean;
  flexProps?: FlexProps;
}
