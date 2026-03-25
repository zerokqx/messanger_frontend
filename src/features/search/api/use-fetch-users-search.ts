import {
  getSearchByQueryUserSearchGetQueryOptions,
  useSearchByQueryUserSearchGet,
} from '@/shared/api/orval/feed-service/v1-feed-user-search/v1-feed-user-search';

export const makeSearchOptions = (query = '') => {
  return getSearchByQueryUserSearchGetQueryOptions({ query });
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
  const query = rawQuery ?? '';
  return useSearchByQueryUserSearchGet(
    { query },
    {
      query: {
        gcTime: 60 * 1000,
        retry: 2,
        select(data) {
          return data.data.users;
        },
        enabled: query.length >= 3,
      },
    }
  );
};
