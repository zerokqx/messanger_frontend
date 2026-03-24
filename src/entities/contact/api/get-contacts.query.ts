import { useIsAuth } from '@/entities/session';
import {
  getContactsContactListGet,
  getGetContactsContactListGetInfiniteQueryKey,
  getGetContactsContactListGetSuspenseInfiniteQueryOptions,
  useGetContactsContactListGetSuspenseInfinite,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
import Logger from '@/shared/lib/logger/logger';
import {
  keepPreviousData,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

export const makeContactsInfinityOptions = (limit = 10) => {
  return getGetContactsContactListGetSuspenseInfiniteQueryOptions(
    { limit },
    {
      query: {
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
          Logger.debug('useContactsQuery', 'has_more=true', {
            preData: lastPage.data,
          });
          return lastPageParam + lastPage.data.items.length;
        }

        return undefined;
      },
      },
    }
  );
};

/**
 * @description Хук для получения всех контктов текущего пользователя
 * @param limit Сколько записей максимально можно вернуть (Backend Option)
 */
export const useContactsQuery = (limit = 10) => {
  return useGetContactsContactListGetSuspenseInfinite(
    { limit },
    {
      query: {
        initialPageParam: 0,
        getNextPageParam: (lastPage, _pages, lastOffset) => {
          if (!lastPage.data.has_more) {
            return undefined;
          }

          return (lastOffset ?? 0) + lastPage.data.items.length;
        },
      },
    }
  );
};
