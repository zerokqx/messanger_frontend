import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api/repository/$api';

export const useContactsCountFetch = () => {
  const isAuth = useIsAuth();
  const query = $api.jwtUser.query.useQuery(
    'get',
    '/contact/count',
    {},
    { select: (s) => s.data.count, enabled: isAuth }
  );
  return query;
};
