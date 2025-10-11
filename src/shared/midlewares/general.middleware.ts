import type { Middleware } from 'openapi-fetch';

export const generalMiddleware: Middleware = {
  onRequest({ request }) {
    request.headers.set('X-Client-Type', 'web');
  },
};
