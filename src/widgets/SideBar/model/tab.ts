import { createTaber } from '@/shared/ui/Tabs';

export const sidebarTab = createTaber({
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
