import { createStoreAction } from '@/shared/lib/zustand/create-store-action/create-store-action';
import type { PrivateChatListItem } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { createStore } from '@colorfy-software/zfy';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Chat = PrivateChatListItem;

export const useSelectedChat = createStore('selected-chat', '', {
  persist: {
    getStorage: () => AsyncStorage,
  },

  log: true,
});

export const selectedChatAction = createStoreAction(
  [
    (chat_id: Chat['chat_id']) => {
      useSelectedChat.setState({ data: chat_id });
    },
  ],
  ['select']
);
