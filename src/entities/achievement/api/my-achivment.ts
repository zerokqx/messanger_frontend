import { $api } from '@/shared/api/repository/$api';
import { useIsAuth } from '@/entities/session';

export const useMyAchivment = () => {
  const isAuth = useIsAuth();
  return $api.jwtAchievement.query.useSuspenseQuery(
    'get',
    '/my',
    {},
    {
      enabled: isAuth,
      staleTime: 1000 * 60,
    }
  );
};

export const useMyAchievement = useMyAchivment;
