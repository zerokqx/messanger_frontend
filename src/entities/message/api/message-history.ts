import { useIsAuth } from '@/entities/session';
import { useGetPrivateChatHistoryHistoryGetInfinite } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { pagesMap } from '@/shared/lib/pages-map';

/**
 * Загружает историю сообщений приватного чата и разворачивает
 * infinite-query страницы в плоский список для UI.
 */
export const useMessageHistory = (chatId: string, limit = 10) => {
  const isAuth = useIsAuth();

  return useGetPrivateChatHistoryHistoryGetInfinite(
    {
      limit,
      chat_id: chatId,
    },
    {
      query: {
        select: (data) => pagesMap(data),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 60 * 24,
        initialPageParam: null,
        enabled: isAuth && typeof chatId === 'string' && chatId.length > 0,
        getNextPageParam: (lastPage) => {
          if (!lastPage.data.has_more) {
            return undefined;
          }

          const items = lastPage.data.items;
          if (!items.length) {
            return undefined;
          }

          return items.reduce<number>(
            (oldestMessageId, item) =>
              item.message_id < oldestMessageId
                ? item.message_id
                : oldestMessageId,
            items[0].message_id
          );
        },
      },
    }
  );
};
