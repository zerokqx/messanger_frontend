import { createBaseUrl } from '../baseUrl';
import { createFetcher, createFetcherWithCreateClient } from '../fetcher';

export const userClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('user'),
  },
});
