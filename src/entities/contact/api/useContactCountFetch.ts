import { useIsAuth } from '@/entities/session';
import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';

export const useContactsCountFetch = () => {
  const isAuth = useIsAuth();
  const query = userClient(authMiddleware)().useQuery(
    'get',
    '/contact/count',
    {},
    { select: (s) => s.data.count, enabled: isAuth }
  );
  return query;
};
