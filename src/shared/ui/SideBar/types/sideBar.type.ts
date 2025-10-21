import type { JSX, ReactNode } from 'react';
import type { SideItem } from '../ui/Item';
import type { InfoBlock } from '../ui/InfoBlock';

export interface Compouned {
  Item: typeof SideItem;
  InfoBlock: typeof InfoBlock;
}
export interface SideBarProps {
  children: ReactNode;
  renderUserBadge?: () => ReactNode;
}

export type SideBarCompouned = ((props: SideBarProps) => JSX.Element) &
  Compouned;
