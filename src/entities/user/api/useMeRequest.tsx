import { profileClient } from '@/shared/api';
import { useAuth } from '@/shared/model/authProviderContext';
import { authMiddleware } from './middlewares';

export const useMeRequest = () => {
  const { isAuth } = useAuth();

  return profileClient(authMiddleware)().useQuery(
    'get',
    '/me',
    {},
    {
      staleTime: 60 * 1000,
      retry: 3,
      enabled: isAuth,
      refetchOnReconnect: true,
    }
  );
};
