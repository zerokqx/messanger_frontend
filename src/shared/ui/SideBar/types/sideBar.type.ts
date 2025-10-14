import type { JSX, ReactNode } from 'react';
import type { SideItem } from '../ui/Item';

export interface Compouned {
  Item: typeof SideItem;
}
export interface SideBarProps {
  children: ReactNode;
  renderUserBadge?: () => ReactNode;
}

export type SideBarCompouned = ((props: SideBarProps) => JSX.Element) &
  Compouned;
