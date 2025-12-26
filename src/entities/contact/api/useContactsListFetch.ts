import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api/repository/$api';
import type { UserSearchItem } from '@/shared/types/api/schemas';
import { keepPreviousData } from '@tanstack/react-query';

export const useContactsListFetch = (limit: number) => {
  const isAuth = useIsAuth();

  return $api.jwtUser.query.useInfiniteQuery(
    'get',
    '/contact/list',
    {
      params: {
        query: {
          limit,
        },
      },
    },
    {
      staleTime: 1000 * 60 * 10, // 10 минут данные считаются свежими
      gcTime: 1000 * 60 * 60 * 24, // сутки не вычищать из кэша
      placeholderData: keepPreviousData,
      initialPageParam: 0,
      pageParamName: 'offset',
      getNextPageParam: (
        lastPage: { data: { items: UserSearchItem[]; has_more: boolean } },
        _,
        lastPageParam: number
      ) => {
        if (lastPage.data.has_more) {
          return lastPageParam + lastPage.data.items.length;
        }

        return undefined;
      },
      enabled: isAuth,
    }
  );
};
