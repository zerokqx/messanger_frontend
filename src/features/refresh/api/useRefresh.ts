import { authClient } from '@/shared/api';
import { useEffect } from 'react';

import { useJwt } from 'react-jwt';
import { useTokenStore } from '@/entities/token';
import { authMiddleware } from '@/entities/user';
import { useAuth } from '@/shared/model/authProviderContext';

export const useRefresh = () => {
  const isAuth = useAuth().isAuth;
  const { access, setToken } = useTokenStore();
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
        // WARNING: Deprected types swagger. In currend doc swagger not exists refresh token in body key
        body: {
          access_token: access,
        },
      });
    }
  }, [isExpired, access, isAuth, mutate]);
};
