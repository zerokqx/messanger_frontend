import { createTabStore } from '@/shared/ui/Tabs/model';

export type ChatAsideTab = 'search' | 'chats';

export const useChatAsideTabStore = createTabStore<ChatAsideTab>('chats');
