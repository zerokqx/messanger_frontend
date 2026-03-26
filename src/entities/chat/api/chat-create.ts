import { db, type Chat } from '@/shared/api';
import { useCreatePrivateChatByUuidCreatePost } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { useCallback } from 'react';

export const useChatCreate = () => {
  const { mutateAsync, ...query } = useCreatePrivateChatByUuidCreatePost();


  const smartCreateMutate = useCallback(
    async (userId: string): Promise<Chat> => {
      console.log(userId);
      
      const chat = await db.chats.get(userId);
      if (chat) {
        return chat;
      }
      const request = await mutateAsync({
        params: { target_user_id: userId },
      });
      void db.chats.add({
        chat_id: request.data.chat_id,
        user_id: userId,
      });
      return {
        chat_id: request.data.chat_id,
        user_id: userId,
      };
    },
    [mutateAsync]
  );
  return { ...query, mutateAsync, smartCreateMutate };
};
