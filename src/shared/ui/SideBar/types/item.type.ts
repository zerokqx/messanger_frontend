import type { GridProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface SideItemProps {
  children?: ReactNode;
  text: string;
  inDev?: boolean;
  onClick?: GridProps['onClick'];
}
