import { useIsAuth } from '@/entities/session';
import { useGetContactCountContactCountGet } from '@/shared/api/orval/user-service/v1-user/v1-user';

/**
 * @description Хук для получения количества контактов пользователя
 */
export const useContactCountQuery = () => {
  const isAuth = useIsAuth();
  const query = useGetContactCountContactCountGet({
    query: {
      select: (s) => s.data.count,
      enabled: isAuth,
      staleTime: 1000 * 64,
    },
  });
  return query;
};
