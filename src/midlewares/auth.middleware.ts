import { checkAuth } from "@/utils/accessToken";
import type { Middleware } from "openapi-fetch";

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.append("X-Client-Type", "Web");
  },
  async onError({ request, error }) {
    console.log(error);
    const onExists = checkAuth();
    console.log(onExists);
  },
};
