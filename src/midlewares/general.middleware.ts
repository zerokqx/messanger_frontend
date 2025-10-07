import type { Middleware } from "openapi-fetch";
import { combine } from "zustand/middleware";

export const generalMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.append("X-Client-Type", "web");
  },
  async onError(error) {
    console.log(error);
  },
};
