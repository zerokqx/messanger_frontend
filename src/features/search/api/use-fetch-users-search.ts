import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api/repository/$api';

export const makeSearchOptions = (query = '') => {
  return $api.feed.jwt.queryOptions('get', '/user/search', {
    params: {
      query: {
        query,
      },
    },
  });
};

/**
 * A hook to fetch users from the search API based on a query.
 * It handles the API request and returns the query results without managing global search state.
 * Use via hook use search.
 * @param query The search query string.
 * @see `useSearch`
 * @returns The result of the TanStack Query hook for fetching users.
 */
export const useFetchUsersSearch = (rawQuery: string | undefined | null) => {
  const isAuth = useIsAuth();

  const query = rawQuery ?? '';
  return $api.feed.jwt.useQuery(
    'get',
    '/user/search',
    {
      params: {
        query: {
          query,
        },
      },
    },
    {
      staleTime: 60 * 20,
      retry: 2,
      select(data) {
        return data.data.users;
      },
      enabled: query.length > 0 && isAuth,
    }
  );
};
