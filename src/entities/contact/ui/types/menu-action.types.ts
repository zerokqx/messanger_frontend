import type { MenuItemProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface MenuActionProps
  extends Omit<MenuItemProps, 'onClick' | 'children'> {
  onClick?: (userId: string) => void;
  children?: ReactNode;
}
