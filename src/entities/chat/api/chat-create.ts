import { $api, db } from '@/shared/api';
import { $chatPrivateService } from '@/shared/api/generated';

export const useChatCreate = () => {
  const query = $chatPrivateService.useMutation('post', '/create');
  const _createChat = query.mutateAsync;

  const newMutate: typeof _createChat = async (data) => {
    const userId = data.params.query.target_user_id
    const chat = await db.chats.get(userId);
    if (chat) {
      return chat;
    }
    const request = await _createChat(data);
    return {
      chat_id: request.data.chat_id,
      user_id: userId,
    };
      return 
  };
  query.mutateAsync = newMutate
  return query
};
