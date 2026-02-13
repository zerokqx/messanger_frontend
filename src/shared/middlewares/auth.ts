import type { Middleware } from 'openapi-fetch';
import { useTokenStore, tokenAction } from '../token';
import { createBaseUrl } from '../api/base-url';
import { authHeaderSet } from '../api';
import type { components } from '../types/v1';

type RefreshResponse = components['schemas']['TokenRefreshResponse'];

const refreshByFetch = async (access: string) => {
  const url = `${createBaseUrl('auth')}/token/refresh`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ access_token: access }),
  });

  if (!res.ok) throw new Error('refresh request not ok');

  const json = (await res.json()) as { data?: RefreshResponse['data'] };
  const newAccess = json.data?.access_token;

  if (!newAccess) throw new Error('no access_token in refresh response');

  tokenAction.doSetToken(newAccess);
  return newAccess;
};

let refreshPromise: Promise<string> | null = null;

export const authMiddleware: Middleware = {
  onRequest({ request }) {
    return authHeaderSet(request);
  },

  async onResponse({ response, request }) {
    if (response.status !== 401) return response;

    const access = useTokenStore.getState().data.access;
    if (!access) return response;

    refreshPromise ??= refreshByFetch(access).finally(() => {
      refreshPromise = null;
    });

    await refreshPromise;

    const retryReq = authHeaderSet(request.clone());
    return fetch(retryReq);
  },
};
