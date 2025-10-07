import { useUserStore } from "@/store";
import { checkAuth } from "@/utils/accessToken";
import type { Middleware } from "openapi-fetch";


export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = useUserStore.getState().accessToken.token;
    request.headers.set("Authorization", `Bearer ${token}`);
    request.headers.append("X-Client-Type", "web");
  },
  async onError({ request, error }) {
    console.log(error);
    const onExists = checkAuth();
    console.log(onExists);
  },
};
