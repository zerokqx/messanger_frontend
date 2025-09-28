import createClient, { type Client } from "openapi-fetch";
import type { paths } from "../types/schemaV1";
export type Services =
  | "auth_service"
  | "user_service"
  | "profile_service"
  | "feed_service"
  | "chat_private_service";
export type Version = "v1";

const createApi = (
  service: Services,
  version: Version = "v1",
): Client<paths> => {
  if (!service) {
    throw Error("Not put service in param");
  }
  const link = `https://api.yobble.org/docs/proxy/${service}/${version}`;
  return createClient<paths>({ baseUrl: link });
};
export const authClient = createApi("auth_service");
export const userClient = createApi("user_service");
export const profileClient = createApi("user_service");
export const chatPriveteClient = createApi("chat_private_service");
export const feedClient = createApi("feed_service");
