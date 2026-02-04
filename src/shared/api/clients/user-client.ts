import { createBaseUrl } from '../base-url';
import { createFetcher, createFetcherWithCreateClient } from '../fetcher';

export const userClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('user'),
  },
});
