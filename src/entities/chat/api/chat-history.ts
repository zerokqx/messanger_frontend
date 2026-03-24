import { useIsAuth } from '@/entities/session';
import {
  getGetPrivateChatHistoryHistoryGetQueryKey,
  getPrivateChatHistoryHistoryGet,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import Logger from '@/shared/lib/logger/logger';
import type { PrivateChatHistoryResponse } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useChatHistory = (chatId: string, limit = 10) => {
  const isAuth = useIsAuth();

  return useInfiniteQuery<PrivateChatHistoryResponse, Error, PrivateChatHistoryResponse, ReturnType<typeof getGetPrivateChatHistoryHistoryGetQueryKey>, number | null>({
      queryKey: getGetPrivateChatHistoryHistoryGetQueryKey({
        limit,
        chat_id: chatId,
      }),
      queryFn: ({ pageParam, signal }) =>
        getPrivateChatHistoryHistoryGet(
          {
            limit,
            chat_id: chatId,
            before_message_id:
              typeof pageParam === 'number' || pageParam === null
                ? pageParam ?? undefined
                : undefined,
          },
          undefined,
          signal
        ),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60 * 24,
      initialPageParam: null,
      getNextPageParam: (
        lastPage: PrivateChatHistoryResponse
      ) => {
        if (!lastPage.data.has_more) {
          return undefined;
        }

        const items = lastPage.data.items;
        if (!items.length) {
          return undefined;
        }

        const lastMessage = items[items.length - 1];

        Logger.debug('useChatHistory', 'has_more=true', {
          preData: lastPage.data,
          nextCursor: lastMessage.message_id,
        });

        return lastMessage.message_id;
      },

      enabled: isAuth && typeof chatId === 'string' && chatId.length > 0,
  });
};
