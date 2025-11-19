import { createBaseUrl } from '../baseUrl';
import { createFetcher, createFetcherNotQuery } from '../fetcher';

export const profileClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('profile'),
  },
});

export const profileClientNotQuery = createFetcherNotQuery({
  clientOptions: {
    credentials: 'include',
    baseUrl: createBaseUrl('profile'),
  },
});
