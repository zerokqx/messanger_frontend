import createFetchClient, {
  type ClientOptions,
  type Middleware,
} from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { generalMiddleware } from '../midlewares';
import type { paths } from '../types/v1';

export const createFetcher = <P extends paths = paths>({
  clientOptions,
}: {
  midlewares?: Middleware[];
  clientOptions?: ClientOptions;
}) => {
  const fetcher = createFetchClient<P>({
    ...clientOptions,
  });
  return (...midlewares: Middleware[]) => {
    if (midlewares.length > 0) {
      midlewares.forEach((midleware) => {
        fetcher.use(midleware);
      });
    }

    fetcher.use(generalMiddleware);
    createClient<P>(fetcher);
    return () => createClient<P>(fetcher);
  };
};

export const createFetcherNotQuery = <P extends paths = paths>({
  clientOptions,
}: {
  clientOptions?: ClientOptions;
} = {}) => {
  const fetcher = createFetchClient<P>({
    ...clientOptions,
  });

  return (...midlewares: Middleware[]) => {
    if (midlewares.length > 0) {
      midlewares.forEach((midleware) => {
        fetcher.use(midleware);
      });
    }
    fetcher.use(generalMiddleware);
    return fetcher;
  };
};
