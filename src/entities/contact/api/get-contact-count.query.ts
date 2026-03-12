import { useIsAuth } from '@/entities/session';
import { $api } from '@/shared/api/repository/$api';

/**
 * @description Хук для получения количества контактов пользователя
 */
export const useContactCountQuery = () => {
  const isAuth = useIsAuth();
  const query = $api.user.jwt.useQuery(
    'get',
    '/contact/count',
    {},
    { select: (s) => s.data.count, enabled: isAuth, staleTime: 1000 * 64 }
  );
  return query;
};
