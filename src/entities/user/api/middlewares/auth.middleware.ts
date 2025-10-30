import { useTokenStore } from '@/entities/token/@x/user';
import { useCheckAuth } from '@/features/checkAuth';
import { authClientNotQuery } from '@/shared/api/clients/authClient';
import type { Middleware } from 'openapi-fetch';
export const authMiddleware: Middleware = {
  onRequest({ request }) {
    const { access } = useTokenStore.getState();
    if (!useCheckAuth.check()) return new Response(null, { status: 401 });
    request.headers.set('Authorization', `Bearer ${access}`);
  },
  onResponse: async ({ request, response }) => {
    const { setToken, access } = useTokenStore.getState();
    if (response.status === 401) {
      const {
        response: { ok },
        data,
      } = await authClientNotQuery(authMiddleware).POST('/token/refresh', {
        body: {
          access_token: access,
        },
      });

      if (ok && data?.data.access_token) {
        setToken(data.data.access_token);
        const cloned = request.clone();
        cloned.headers.set('Authorization', `Bearer ${data.data.access_token}`);
        return await fetch(cloned);
      }
      useTokenStore.getState().clearStore();
    }
  },
};
