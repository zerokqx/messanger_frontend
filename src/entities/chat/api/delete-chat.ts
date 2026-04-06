import { ChatCacheDescriptor } from '../model/chat-cache-descriptor';
import { useDeletePrivateChatDeleteDelete } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';

export const useDeleteChat = () => {
  return useDeletePrivateChatDeleteDelete({
    mutation: {
      async onMutate(variables, { client }) {
        const descriptor = ChatCacheDescriptor.getInstance(
          variables.data.chat_id,
          client
        );
        const prevPrivateChatList = client.getQueriesData({
          queryKey: descriptor.getChatListQueryKey(),
        });
        const prevPrivateChatHistory = client.getQueriesData({
          queryKey: descriptor.getChatHistoryQueryKey(),
        });

        await descriptor.delete();

        return {
          prevPrivateChatList,
          prevPrivateChatHistory,
        };
      },
      onError(error, variables, onMutateResult, { client }) {
        if (onMutateResult?.prevPrivateChatList) {
          onMutateResult.prevPrivateChatList.forEach(([queryKey, data]) => {
            client.setQueryData(queryKey, data);
          });
        }

        if (onMutateResult?.prevPrivateChatHistory) {
          onMutateResult.prevPrivateChatHistory.forEach(([queryKey, data]) => {
            client.setQueryData(queryKey, data);
          });
        }
      },
    },
  });
};
