import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';

export const useContactCount = () => {
  const isAuth = useAuth((s) => s.isAuth);
  const query = userClient(authMiddleware)().useQuery(
    'get',
    '/contact/count',
    {},
    { select: (s) => s.data.count, enabled: isAuth }
  );
  return query;
};
