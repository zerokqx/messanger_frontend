import { useIsAuth } from '@/entities/session';
import { db } from '@/shared/api';
import Logger from '@/shared/lib/logger/logger';
import { pagesMap } from '@/shared/lib/pages-map';
import { keepPreviousData } from '@tanstack/react-query';
import { hasUserId } from '../lib/has-user-id';
import { useEffect } from 'react';
import { $chatPrivateService } from '@/shared/api/generated';

export const useChatList = (limit = 20) => {
  const isAuth = useIsAuth();
  const query = $chatPrivateService.useInfiniteQuery(
    'get',
    '/list',

    {
      params: {
        query: {
          limit,
        },
      },
    },

    {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60 * 24,
      placeholderData: keepPreviousData,
      initialPageParam: 0,
      suspense: true,
      pageParamName: 'offset',
      getNextPageParam: (
        lastPage,
        _,
        lastPageParam: number
      ) => {
        if (lastPage.data.has_more) {
          Logger.debug('useChatList', 'has_more=true', {
            preData: lastPage.data,
          });
          return lastPageParam + lastPage.data.items.length;
        }
        return undefined;
      },
      enabled: isAuth,
    }
  );
  useEffect(() => {
    if (query.data) {
      const allChats = pagesMap(query.data);
      void db.chats.bulkPut(
        allChats.map((chat) => ({
          chat_id: chat.chat_id,
          user_id: hasUserId(chat.chat_data ?? null),
        }))
      );
    }
  }, [query.data]);
  return query;
};
