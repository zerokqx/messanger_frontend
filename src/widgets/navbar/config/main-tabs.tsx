import { Home, User, Users } from 'lucide-react';
import type { PanelProps } from '@/shared/ui/query-tabs/ui/panel';

export const mainPanel: PanelProps['data'] = [
  {
    value: 'main',
    icon: <Home />,
  },

  {
    value: 'contacts',
    icon: <Users />,
  },

  {
    value: 'profile',
    icon: <User />,
  },
];
