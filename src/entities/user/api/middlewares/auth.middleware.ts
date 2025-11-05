import { refreshTokenWithoutQuery } from '@/features/refresh/api/refreshTokenWitoutQuery';
import { authHeaderSet } from '@/shared/api';
import type { Middleware } from 'openapi-fetch';
export const authMiddleware: Middleware = {
  onRequest({ request }) {
    return authHeaderSet(request);
  },
  async onResponse({ response, request }) {
    console.log(1);
    if (response.status === 401) {
      await refreshTokenWithoutQuery();
      const newRequest = request.clone();
      return await fetch(authHeaderSet(newRequest));
    }
    return response;
  },
};
