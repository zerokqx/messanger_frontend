import type {
  PrivateChatListItem,
  PrivateChatListResponse,
} from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import {
  getGetListPrivateChatsListGetInfiniteQueryKey,
  useDeletePrivateChatDeleteDelete,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { infinityQueryOptimisticRemove } from '@/shared/lib/infinity-query-optimistic-update';
import type { InfiniteData } from '@tanstack/react-query';

export const useDeleteChat = () => {
  return useDeletePrivateChatDeleteDelete({
    mutation: {
      onMutate(variables, { client }) {
        const privateChatListQueryKey =
          getGetListPrivateChatsListGetInfiniteQueryKey();
        const prevPrivateChatList = client.getQueriesData<
          InfiniteData<PrivateChatListResponse>
        >({
          queryKey: privateChatListQueryKey,
        });

        client.setQueriesData<InfiniteData<PrivateChatListResponse>>(
          { queryKey: privateChatListQueryKey },
          (old) => {
            if (!old) return old;

            return infinityQueryOptimisticRemove<
              PrivateChatListResponse,
              PrivateChatListItem
            >(
              old,
              (page) => page.data.items,
              (item) => item.chat_id === variables.data.chat_id
            );
          }
        );
        return { prevPrivateChatList, privateChatListQueryKey };
      },
      onError(error, variables, onMutateResult, { client }) {
        if (onMutateResult?.prevPrivateChatList)
          client.setQueriesData<InfiniteData<PrivateChatListResponse>>(
            { queryKey: onMutateResult.privateChatListQueryKey },
            onMutateResult.prevPrivateChatList
          );
      },
    },
  });
};
