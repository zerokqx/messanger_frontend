import type { Middleware } from 'openapi-fetch';
import { useTokenStore } from '@/entities/token/@x/user';
export const authMiddleware: Middleware = {
  onRequest({ request }) {
    const token = useTokenStore.getState().access;
    request.headers.set('Authorization', `Bearer ${token}`);
  },
};
