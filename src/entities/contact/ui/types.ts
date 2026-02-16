import type { components } from '@/shared/types/v1';
import type { GridProps, MenuItemProps } from '@mantine/core';
import type { ReactNode } from 'react';
import type { MenuContextType } from '../model/menu-context';

export interface IContactElementProp {
  user: components['schemas']['ContactInfo'];
  onClick?: GridProps['onClick'];
  onRemove?: (id: string) => void;
}

export interface MenuActionProps
  extends Omit<MenuItemProps, 'onClick' | 'children'> {
  onClick?: (userId: string) => void;
  children?: ReactNode;
}

export interface MenuProps {
  children: ReactNode;
  context: MenuContextType;
}

export interface MenuComponent {
  (props: MenuProps): ReactNode;
  Action: (props: MenuActionProps) => ReactNode;
}
