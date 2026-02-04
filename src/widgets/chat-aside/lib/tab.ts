import { createTaber } from '@/shared/ui/tabs';

export const [
  AppShellTaber,
  useTabAppShell,
  AppShellTabButtons,
  appShellReset,
] = createTaber({
  windows: ['chats', 'search', 'user', 'profile'],
  initial: 'chats',
});
