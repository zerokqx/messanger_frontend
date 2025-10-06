import { authMiddleware } from "@/midlewares";
import createClient, { type OpenapiQueryClient } from "openapi-react-query";
import type { paths } from "../types/schemaV1";
import createFetchClient, { type Client } from "openapi-fetch";
export type Services = "auth" | "user" | "profile" | "feed" | "chat";
export type Version = "v1";

// WARN: credentials sends on all endpoinds
type ApiFunctionCreate = (service: Services, version: Version) => Client<paths>;
const openapiFetcher: ApiFunctionCreate = (service, version) => {
  const fetcher = createFetchClient<paths>({
    credentials: "include",
    baseUrl: `https://api.yobble.org/${version}/${service}`,
  });

  fetcher.use(authMiddleware);

  return fetcher;
};

const createApi = (
  service: Services,
  version: Version = "v1",
): OpenapiQueryClient<paths> => {
  if (!service) {
    throw Error("Not put service in param");
  }
  const client = createClient<paths>(openapiFetcher(service, version));
  return client;
};

export const authClient = createApi("auth");
export const userClient = createApi("user");
export const profileClient = createApi("user");
export const chatPriveteClient = createApi("chat");
export const feedClient = createApi("feed");
