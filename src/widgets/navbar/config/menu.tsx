import { Cog } from 'lucide-react';
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
] satisfies MenuTabs[];
