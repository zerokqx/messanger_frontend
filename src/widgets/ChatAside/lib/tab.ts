import { createTaber } from '@/shared/ui/Tabs';

export const [
  AppShellTaber,
  useTabAppShell,
  AppShellTabButtons,
  appShellReset,
] = createTaber({
  windows: ['chats', 'search', 'user', 'profile'],
  initial: 'chats',
});
