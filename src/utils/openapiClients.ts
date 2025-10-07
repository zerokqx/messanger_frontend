import { authMiddleware, generalMiddleware } from "@/midlewares";
import type { paths } from "@type/schemaV1";
import createFetchClient, {
  type ClientOptions,
  type Middleware,
} from "openapi-fetch";
import createClient from "openapi-react-query";
export type Services = "auth" | "user" | "profile" | "feed" | "chat";
export type Version = "v1";

const createBaseUrl = (
  service: Services,
  url: `https://${string}` = "https://api.yobble.org",
  version: Version = "v1",
) => `${url}/${version}/${service}`;

createBaseUrl("auth");
const createFetcher = <P extends paths = paths>({
  clientOptions,
}: {
  midlewares?: Middleware[];
  clientOptions?: ClientOptions;
}) => {
  const fetcher = createFetchClient<P>({
    ...clientOptions,
  });
  return (midlewares?: Middleware[]) => {
    if (midlewares && midlewares.length > 0) {
      midlewares.forEach((midleware) => fetcher.use(midleware));
    }

    fetcher.use(generalMiddleware);
    return () => createClient<paths>(fetcher);
  };
};

export const authClient = createFetcher({
  clientOptions: {
    credentials: "include",
    baseUrl: createBaseUrl("auth"),
  },
})([authMiddleware])();

export const userClient = createFetcher({
  clientOptions: {
    credentials: "include",
    baseUrl: createBaseUrl("user"),
  },
})()();

export const profileClient = createFetcher({
  clientOptions: {
    credentials: "include",
    baseUrl: createBaseUrl("profile"),
  },
})()();

export const chatPriveteClient = createFetcher({
  clientOptions: {
    credentials: "include",
    baseUrl: createBaseUrl("chat"),
  },
})()();

export const feedClient = createFetcher({
  clientOptions: {
    credentials: "include",
    baseUrl: createBaseUrl("feed"),
  ллллллллллллл,
})()();
