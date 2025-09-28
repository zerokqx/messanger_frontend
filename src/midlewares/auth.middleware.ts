import { checkAuth } from "@/utils";
import { redirect } from "@tanstack/react-router";
import type { Middleware } from "openapi-fetch";

export const authMiddleware: Middleware = {
  async onError({ request, error }) {
    console.log(error);
    const onExists = checkAuth();
    console.log(onExists);
  },
};
