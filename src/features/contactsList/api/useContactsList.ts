import { useIsAuth } from '@/entities/session';
import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';

export const useContactsList = (limit: number, offset: number) => {
  const isAuth = useIsAuth();
  const query = userClient(authMiddleware)().useQuery(
    'get',
    '/contact/list',
    {
      params: {
        query: {
          limit,
          offset,
        },
      },
    },
    {
      enabled: isAuth,
      select: (s) => s.data,
    }
  );
  return query;
};
