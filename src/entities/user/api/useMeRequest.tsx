import { profileClient } from '@/shared/api';
import { authMiddleware } from './middlewares';
import { useIsAuth } from '@/entities/session';
import { useLogger } from '@mantine/hooks';

export const useMeRequest = () => {
  const isAuth = useIsAuth();
  useLogger('IS AUTH', [isAuth]);
  return profileClient(authMiddleware)().useQuery(
    'get',
    '/me',
    {},
    {
      staleTime: 60 * 1000,
      select: (data) => data.data,
      retry: 3,
      enabled: isAuth,
      refetchOnReconnect: true,
    }
  );
};
