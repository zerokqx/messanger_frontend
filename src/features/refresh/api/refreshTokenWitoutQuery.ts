import { useTokenStore } from '@/entities/token';
import type { UseTokenStoreState } from '@/entities/token/types/useTokenStore.type';
import { useCheckAuth } from '@/features/checkAuth';
import { authClientNotQuery } from '@/shared/api/clients/authClient';

export const refreshTokenWithoutQueryRequest = async (
  access: UseTokenStoreState['access']
) => {
  return await authClientNotQuery().POST('/token/refresh', {
    body: {
      access_token: access,
    },
  });
};
export const refreshTokenWithoutQuery = async () => {
  const setToken = useTokenStore.getState().setToken;
  const access = useTokenStore.getState().access;
  const response = await refreshTokenWithoutQueryRequest(access);
  const {
    response: { ok },
    data,
  } = response;
  const newAccess = data?.data.access_token;
  if (ok && newAccess) {
    setToken(newAccess);
    return response;
  }
  throw new Error('request not success')
};
export const refreshTokenWithoutQueryWithGuard = async () => {
  if (useCheckAuth.check()) return;

  return refreshTokenWithoutQuery();
};
