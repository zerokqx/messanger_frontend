import { profileClient } from '@/shared/api';
import { useEffect } from 'react';
import { useUserStore } from '../model/userStore';
import { authMiddleware } from './middlewares';

/** Hook for fetch user profile data */
export const useMe = () => {
  const { setUser } = useUserStore();
  const { isSuccess, data } = profileClient(authMiddleware)().useQuery(
    'get',
    '/me',
    {},
    {
      staleTime: 2 * 1000,
      retry: 3,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setUser(data.data);
    }
  }, [isSuccess, data, setUser]);
};
