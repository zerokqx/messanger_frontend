import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api';
import Logger from '@/shared/lib/logger/logger';
import { keepPreviousData } from '@tanstack/react-query';

export const useChatHistory = (chatId: string, limit = 10) => {
  const isAuth = useIsAuth();

  return $api['chat/private'].jwt.useInfiniteQuery(
    'get',
    '/history',

    {
      params: {
        query: {
          limit,
          chat_id: chatId,
        },
      },
    },

    {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60 * 24,
      placeholderData: keepPreviousData,
      initialPageParam: 0,
      suspense: true,
      pageParamName: 'before_message_id',
      getNextPageParam: (lastPage) => {
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
          nextCursor: lastMessage.id,
        });

        return lastMessage.id;
      },

      enabled: isAuth && Boolean(chatId),
    }
  );
};
