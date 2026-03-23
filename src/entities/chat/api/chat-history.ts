import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api';
import { $chatPrivateService } from '@/shared/api/generated';
import Logger from '@/shared/lib/logger/logger';
import type { components } from '@/shared/types/v1';

export const useChatHistory = (chatId: string, limit = 10) => {
  const isAuth = useIsAuth();

  return $chatPrivateService.useInfiniteQuery(
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
      initialPageParam: null,
      suspense: true,
      pageParamName: 'before_message_id',
      getNextPageParam: (
        lastPage: components['schemas']['PrivateChatHistoryResponse']
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

        return lastMessage.message_id.toString();
      },

      enabled: isAuth && typeof chatId === 'string' && chatId.length > 0,
    }
  );
};
