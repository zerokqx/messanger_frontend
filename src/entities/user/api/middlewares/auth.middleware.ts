import type { Middleware } from 'openapi-fetch';
import { useTokenStore } from '@/entities/token/@x/user';
export const authMiddleware: Middleware = {
  onRequest({ request }) {
    const { access } = useTokenStore.getState();

    request.headers.set('Authorization', `Bearer ${access}`);
  },
};
