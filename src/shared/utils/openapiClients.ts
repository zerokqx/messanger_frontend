import { authMiddleware, generalMiddleware } from "@/midlewares";
import type { paths } from "@type/schemaV1";
import createFetchClient, {
  type ClientOptions,
  type Middleware,
} from "openapi-fetch";
import createClient from "openapi-react-query";
import  { createBaseUrl } from "./createBaseUrl";


const createFetcher = <P extends paths = paths>({
  clientOptions,
}: {
  midlewares?: Middleware[];
  clientOptions?: ClientOptions;
}) => {
  const fetcher = createFetchClient<P>({
    ...clientOptions,
  });
  return (...midlewares: Middleware[]) => {
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
})(authMiddleware)();

export const userClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl("user"),
  },
})()();

export const profileClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl("profile"),
  },
})()();

export const chatPriveteClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl("chat"),
  },
})()();

export const feedClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl("feed"),
  },
})()();
