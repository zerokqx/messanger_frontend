import { profileClient } from '@/shared/api';
import { useEffect } from 'react';
import { authMiddleware } from './middlewares';
import { useAuth } from '@/shared/model/authProviderContext';

/** Hook for fetch user profile data */
export const useMe = () => {
  const {
    user: { setUser },
    isAuth,
  } = useAuth();
  const { isSuccess, data } = profileClient(authMiddleware)().useQuery(
    'get',
    '/me',
    {},
    {
      staleTime: 2 * 1000,
      retry: 3,
      enabled: isAuth,
    }
  );
  useEffect(() => {
    if (isSuccess) setUser(data.data);
  }, [isSuccess, data, setUser]);
};
