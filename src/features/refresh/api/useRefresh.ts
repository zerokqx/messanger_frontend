import { authClient } from '@/shared/api';
import { useEffect } from 'react';

import { authMiddleware } from '@/entities/user';
import { useAuth } from '@/shared/model/authProviderContext';
import { useJwt } from 'react-jwt';

export const useRefresh = () => {
  const {
    token: { access, setToken },
    isAuth,
  } = useAuth();
  const { reEvaluateToken, isExpired } = useJwt(access);

  const { mutate } = authClient(authMiddleware)().useMutation(
    'post',
    '/token/refresh',

    {
      onSuccess: ({ data }) => {
        setToken(data.access_token);
        reEvaluateToken(data.access_token);
      },

      retry: 1,
    }
  );
  useEffect(() => {
    if (!isAuth) return;
    if (isExpired) {
      mutate({
        body: {
          access_token: access,
        },
      });
    }
  }, [isExpired, access, isAuth, mutate]);
};
