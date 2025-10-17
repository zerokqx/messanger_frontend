import type { FlexProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface SideItemProps {
  children?: ReactNode;
  text: string;
  onClick?: FlexProps['onClick'];
}
