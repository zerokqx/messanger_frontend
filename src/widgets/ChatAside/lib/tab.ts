import { createTaber } from '@/shared/ui/Tabs';

export const assideTaber = createTaber({
  windows: ['chats', 'search', 'user', 'profile'],
  initial: 'chats',
});
