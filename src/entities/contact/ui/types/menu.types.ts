import type { ReactNode } from 'react';
import type { MenuActionProps } from './menu-action.types';
import type { MenuContextType } from '../../model/menu-context';

export interface MenuProps {
  children: ReactNode;
  context: MenuContextType;
}

export interface MenuComponent {
  (props: MenuProps): ReactNode;
  Action: (props: MenuActionProps) => ReactNode;
}
