import { useSideBarStore } from '@/shared/ui/SideBar/store/useMenuStore';
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
    ],
    initial: 'main',
  });
