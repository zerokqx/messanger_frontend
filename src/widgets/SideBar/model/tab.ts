import { createTaber } from '@/shared/ui/Tabs';

export const sidebarTab = createTaber({
  windows: ['main', 'profile', 'profile_edit'],
  initial: 'main',
});
