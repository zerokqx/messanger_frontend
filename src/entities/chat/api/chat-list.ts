import { useIsAuth } from '@/entities/session';
import { db } from '@/shared/api';
import { useGetListPrivateChatsListGetInfinite } from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import { pagesMap } from '@/shared/lib/pages-map';
import { hasUserId } from '../lib/has-user-id';
import { useEffect } from 'react';
import Logger from '@/shared/lib/logger/logger';
import { keepPreviousData } from '@tanstack/react-query';

export const useChatList = (limit = 20) => {
  const isAuth = useIsAuth();
  const query = useGetListPrivateChatsListGetInfinite(
    { limit },
    {
      query: {
        enabled: isAuth,
        select: (data) => pagesMap(data),
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _: unknown, lastPageParam) => {
          if (lastPage.data.has_more) {
            Logger.debug('useContactsQuery', 'has_more=true', {
              preData: lastPage.data,
            });
            return (lastPageParam ?? 0) + lastPage.data.items.length;
          }

          return undefined;
        },
      },
    }
  );

  useEffect(() => {
    if (query.data) {
      void db.chats.bulkPut(
        query.data.map((chat) => ({
          chat_id: chat.chat_id,
          user_id: hasUserId(chat.chat_data ?? null),
        }))
      );
    }
  }, [query.data]);
  return query;
};
