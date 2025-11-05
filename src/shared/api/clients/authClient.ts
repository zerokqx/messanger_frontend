import { createBaseUrl } from '../baseUrl';
import { createFetcher, createFetcherNotQuery } from '../fetcher';

export const authClient = createFetcher({
  clientOptions: {
    credentials: 'include',
    baseUrl: createBaseUrl('auth'),
  },
});
export const authClientNotQuery = createFetcherNotQuery({
  clientOptions: {
    credentials: 'include',
    baseUrl: createBaseUrl('auth'),
  },
});
