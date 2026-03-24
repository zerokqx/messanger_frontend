import { useIsAuth } from '@/entities/session';
import {
  getBlacklistBlacklistListGet,
  getGetBlacklistBlacklistListGetQueryKey,
} from '@/shared/api/orval/user-service/v1-user/v1-user';
import type { BlacklistInfoResponse } from '@/shared/api/orval/user-service/user-service.schemas';
import Logger from '@/shared/lib/logger/logger';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useBlacklist = (limit = 10) => {
  const isAuth = useIsAuth();
  return useInfiniteQuery<BlacklistInfoResponse>({
      queryKey: getGetBlacklistBlacklistListGetQueryKey({ limit }),
      queryFn: ({ pageParam, signal }) =>
        getBlacklistBlacklistListGet(
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
          Logger.debug('useBlacklist', 'has_more=true', {
            preData: lastPage.data,
          });
          return (lastPageParam ?? 0) + lastPage.data.items.length;
        }

        return undefined;
      },
      enabled: isAuth,
  });
};

export type UseBlackList = ReturnType<typeof useBlacklist>['data'];
