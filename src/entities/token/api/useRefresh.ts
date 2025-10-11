import { authClient } from '@/shared/api';
import { useEffect } from 'react';

import { useJwt } from 'react-jwt';
import { useTokenStore } from '../model';
import { authMiddleware } from '@/entities/user/@x/token';

export const useRefresh = () => {
  const { access, setToken } = useTokenStore();
  const { decodedToken, reEvaluateToken, isExpired } = useJwt(access);
  console.log(decodedToken);
  console.log(isExpired);

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
      retry: 1,
    }
  );
  useEffect(() => {
    if (isExpired) {
      mutate({
        // WARNING: Deprected types swagger. In currend doc swagger not exists refresh token in body key
        body: {
          access_token: access,
        },
      });
    }
  }, [isExpired, access, mutate]);
};
