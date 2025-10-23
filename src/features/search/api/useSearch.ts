import { authMiddleware } from '@/entities/user';
import { feedClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';

export const useSearch = (query: string) => {
  const isAuth = useAuth((s) => s.isAuth);
  const mutate = feedClient(authMiddleware)().useQuery(
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
      enabled: query.length > 0 && isAuth,
    }
  );
  return mutate.data;
};
