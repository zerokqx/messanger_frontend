import { db, type Chat } from '@/shared/api';
import { useCreatePrivateChatByUuidCreatePost } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';

export const useChatCreate = () => {
  const query = useCreatePrivateChatByUuidCreatePost();

  const smartCreateMutate = async (userId: string): Promise<Chat> => {
    const chat = await db.chats.get(userId);
    if (chat) {
      return chat;
    }
    const request = await query.mutateAsync({
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
  };
  return { ...query, smartCreateMutate };
};
