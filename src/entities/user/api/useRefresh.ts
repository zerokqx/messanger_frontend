import { authClient } from '@/shared/api';
import { useEffect } from 'react';

import { useJwt } from 'react-jwt';
import { useUserStore } from '../model/userStore';
import { authMiddleware } from './middlewares';

export const useRefresh = () => {
  const { accessToken, setToken } = useUserStore();
  const { reEvaluateToken, isExpired } = useJwt(accessToken.token);
  const { mutate, data, isSuccess, isError } = authClient(
    authMiddleware
  )().useMutation(
    'post',
    '/token/refresh',

    {
      onSuccess: ({ data }) => {
        setToken(data.access_token);
        reEvaluateToken(data.access_token);
      },
    }
  );
  useEffect(() => {
    isExpired &&
      mutate({
        // WARNING: Deprected types swagger. In currend doc swagger not exists refresh token in body key
        body: {
          access_token: accessToken.token,
        },
      });
  }, [isExpired, accessToken.token]);
};
