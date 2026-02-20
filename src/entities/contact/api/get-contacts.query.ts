import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api/repository/$api';
import Logger from '@/shared/lib/logger/logger';
import type { UserSearchItem } from '@/shared/types/api/schemas';
import { keepPreviousData } from '@tanstack/react-query';

/**
 * @description Хук для получения всех контктов текущего пользователя
 * @param limit Сколько записей максимально можно вернуть (Backend Option)
 */
export const useContactsQuery = (limit: number) => {
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
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60 * 24,
      placeholderData: keepPreviousData,
      initialPageParam: 0,
      pageParamName: 'offset',
      getNextPageParam: (
        lastPage: { data: { items: UserSearchItem[]; has_more: boolean } },
        _,
        lastPageParam: number
      ) => {
        if (lastPage.data.has_more) {
          Logger.debug('useContactsQuery', 'has_more=true', {
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
