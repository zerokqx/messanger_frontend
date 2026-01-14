import { createTaber } from '@/shared/ui/Tabs';

export const [
  SideBarTaber,
  useTabSidebar,
  SideBarButtons,
  sideBarReset,
  inferSideBarTaberWindows,
] = createTaber({
  windows: [
    'main',
    'profile',
    'profile_edit',
    'settings',
    'profile_settings',
    'interface_edit',
    'sessions',
    'contacts',
  ] as const,
  initial: 'main',
});
