import { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { useRefreshRequest } from '../api';
import { useLogger } from 'react-use';

/**
 * @deprecated
 */
export const useRefresh = () => {
  const { mutate, isPending } = useRefreshRequest();
  const { isExpired, reEvaluateToken } = useJwt(access);
  useLogger('Token Status: ', isExpired);
  useLogger('New access token', { access });
  useEffect(() => {
    if (isPending || !isAuth) return;
    if (isExpired) {
      mutate(
        {
          body: {
            access_token: access,
          },
        },
        {
          onSuccess({ data: { access_token } }) {
            setToken(access_token);
            reEvaluateToken(access_token);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isExpired, isAuth, mutate, setToken, reEvaluateToken]);
};
