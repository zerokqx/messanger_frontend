import type { Middleware } from 'openapi-fetch';
import { useUserStore } from '../../model/userStore';
export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = useUserStore.getState().accessToken.token;
    request.headers.set('Authorization', `Bearer ${token}`);
    request.headers.append('X-Client-Type', 'web');
  },
  async onError({ error }) {
    console.log(error);
  },
};
