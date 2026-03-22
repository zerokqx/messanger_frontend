import { db, type Chat } from '@/shared/api';
import { $chatPrivateService } from '@/shared/api/generated';

export const useChatCreate = () => {
  const query = $chatPrivateService.useMutation('post', '/create');

  const smartCreateMutate = async (userId: string): Promise<Chat> => {
    const chat = await db.chats.get(userId);
    if (chat) {
      return chat;
    }
    const request = await query.mutateAsync({
      params: {
        query: {
          target_user_id: userId,
        },
      },
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
