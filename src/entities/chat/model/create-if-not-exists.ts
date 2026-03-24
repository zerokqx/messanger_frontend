import {
  db,
  type Chat,
  type DexieChatId,
} from '@/shared/api';
import { useChatCreate } from '../api';
import { useCallback } from 'react';

export const useCreateIfNotExistsChat = (): ((
  userId: DexieChatId
) => Promise<Chat>) => {
  const { mutateAsync: createChat } = useChatCreate();
  return useCallback(
    async (userId) => {
      const chat = await db.chats.get(userId);
      if (chat) {
        return chat;
      }
      const request = await createChat({
        params: {
          target_user_id: userId,
        },
      });
      return {
        chat_id: request.data.chat_id,
        user_id: userId,
      };
    },
    [createChat]
  );
};
