import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api/repository/$api';
import Logger from '@/shared/lib/logger/logger';
import { keepPreviousData } from '@tanstack/react-query';

export const useChatList = (limit = 20) => {
  const isAuth = useIsAuth();
  return $api['chat/private'].jwt.useInfiniteQuery(
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
        lastPage: { data: { items: unknown[]; has_more: boolean } },
        _: unknown,
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
};
