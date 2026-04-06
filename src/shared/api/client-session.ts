import Axios from 'axios';
import { tokenAction } from '../token';
import {
  CLIENT_TYPE,
  type RefreshTokenResponse,
  getSessionStoreToken,
  isClientSessionAuthorized,
} from './auth-session';

const rawAuthAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace(/\/+$/, ''),
  withCredentials: true,
});

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Client-Type': CLIENT_TYPE,
});

export const syncClientSession = (accessToken?: string | null): boolean => {
  const nextStoreToken = getSessionStoreToken(accessToken);

  if (!nextStoreToken) {
    return false;
  }

  tokenAction.doSetToken(nextStoreToken);
  return true;
};

export const resetClientSession = () => {
  tokenAction.doReset();
};

export const refreshClientSession = async (): Promise<string> => {
  const { data } = await rawAuthAxios.post<RefreshTokenResponse>(
    '/v1/auth/token/refresh',
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  const nextStoreToken = getSessionStoreToken(data.data?.access_token ?? null);

  if (!nextStoreToken) {
    throw new Error('No active session after refresh');
  }

  tokenAction.doSetToken(nextStoreToken);
  return nextStoreToken;
};

export const bootstrapClientSession = async (): Promise<boolean> => {
  const currentToken = tokenAction.doGetToken();

  if (isClientSessionAuthorized(currentToken)) {
    const syncedStoreToken = getSessionStoreToken(currentToken);

    if (syncedStoreToken && syncedStoreToken !== currentToken) {
      tokenAction.doSetToken(syncedStoreToken);
    }

    return true;
  }

  try {
    await refreshClientSession();
    return true;
  } catch {
    resetClientSession();
    return false;
  }
};
