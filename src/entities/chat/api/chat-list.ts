import { useIsAuth } from '@/entities/session';
import { db } from '@/shared/api';
import {
  getGetListPrivateChatsListGetQueryKey,
  getListPrivateChatsListGet,
} from '@/shared/api/orval/chat-private-service/v1-chat-private/v1-chat-private';
import type { PrivateChatListResponse } from '@/shared/api/orval/chat-private-service/chat-private-service.schemas';
import Logger from '@/shared/lib/logger/logger';
import { pagesMap } from '@/shared/lib/pages-map';
import { useInfiniteQuery } from '@tanstack/react-query';
import { hasUserId } from '../lib/has-user-id';
import { useEffect } from 'react';

export const useChatList = (limit = 20) => {
  const isAuth = useIsAuth();
  const query = useInfiniteQuery<PrivateChatListResponse>({
      queryKey: getGetListPrivateChatsListGetQueryKey({ limit }),
      queryFn: ({ pageParam, signal }) =>
        getListPrivateChatsListGet(
          {
            limit,
            offset: typeof pageParam === 'number' ? pageParam : 0,
          },
          undefined,
          signal
      ),
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60 * 24,
      initialPageParam: 0,
      getNextPageParam: (
        lastPage,
        _,
        lastPageParam
      ) => {
        if (lastPage.data.has_more) {
          Logger.debug('useChatList', 'has_more=true', {
            preData: lastPage.data,
          });
          return (lastPageParam ?? 0) + lastPage.data.items.length;
        }
        return undefined;
      },
      enabled: isAuth,
  });
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
