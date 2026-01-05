import { createTaber } from '@/shared/ui/Tabs';

export const [SideBarTaber, useTabSidebar, SideBarButtons, sideBarReset] =
  createTaber({
    windows: [
      'main',
      'profile',
      'profile_edit',
      'settings',
      'profile_settings',
      'interface_edit',
      'sessions',
      'contacts',
    ],
    initial: 'main',
  });
