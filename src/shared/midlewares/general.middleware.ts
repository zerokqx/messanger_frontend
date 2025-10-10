import type { Middleware } from 'openapi-fetch';

export const generalMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.append('X-Client-Type', 'web');
  },
  async onError(error) {
    console.log(error);
  },
};
