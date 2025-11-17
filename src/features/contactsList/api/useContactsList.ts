import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';

export const useContactsList = (limit: number, offset: number) => {
  const isAuth = useAuth((s) => s.isAuth);
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
