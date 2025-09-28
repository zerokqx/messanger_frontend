import createClient, { type Client } from "openapi-fetch";
import type { paths } from "../types/schemaV1";
export type Services = "auth" | "user" | "profile" | "feed" | "chat";
export type Version = "v1";

const createApi = (
  service: Services,
  version: Version = "v1",
): Client<paths> => {
  if (!service) {
    throw Error("Not put service in param");
  }
  const link = `https://api.yobble.org/${version}/${service}`;
  return createClient<paths>({ baseUrl: link });
};
export const authClient = createApi("auth");
export const userClient = createApi("user");
export const profileClient = createApi("user");
export const chatPriveteClient = createApi("chat");
export const feedClient = createApi("feed");
