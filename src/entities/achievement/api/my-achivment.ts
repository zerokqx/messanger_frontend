import { useIsAuth } from '@/entities/session';
import { useGetMyAchievementsMyGet } from '@/shared/api/orval/achievement-service/v1-achievement/v1-achievement';

export const useMyAchivment = () => {
  const isAuth = useIsAuth();
  return useGetMyAchievementsMyGet({
    query: {
      enabled: isAuth,
      staleTime: 1000 * 60,
    },
  });
};

export const useMyAchievement = useMyAchivment;
