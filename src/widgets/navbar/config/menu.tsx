import { Cog, Trophy, UserLock } from 'lucide-react';
import type { ReactNode } from 'react';

interface MenuTabs {
  label: string;
  icon: ReactNode;
}

export const menuTabsConfig = [
  {
    label: 'settings',
    icon: <Cog />,
  } as const,

  {
    label: 'block-users',
    icon: <UserLock />,
  } as const,

  {
    label: 'achievements',
    icon: <Trophy />,
  } as const,
] satisfies MenuTabs[];
