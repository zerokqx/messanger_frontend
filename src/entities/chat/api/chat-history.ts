import { useIsAuth } from '@/entities/session';
import {
  useGetPrivateChatHistoryHistoryGetInfinite,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';

export const useChatHistory = (chatId: string, limit = 10) => {
  const isAuth = useIsAuth();

  return useGetPrivateChatHistoryHistoryGetInfinite(
    {
      limit,
      chat_id: chatId,
    },
    {
      query: {
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

          return items[items.length - 1].message_id;
        },
      },
    },
  );
};
