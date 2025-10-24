import { authMiddleware } from '@/entities/user';
import { feedClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';

/**
 * A hook to fetch users from the search API based on a query.
 * It handles the API request and returns the query results without managing global search state.
 * @param query The search query string.
 * @returns The result of the TanStack Query hook for fetching users.
 */
export const useFetchUsersSearch = (query: string) => {
  const isAuth = useAuth((s) => s.isAuth);

  return feedClient(authMiddleware)().useQuery(
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
      select(data) {
        return data.data.users;
      },
      enabled: query.length > 0 && isAuth,
    }
  );
};
