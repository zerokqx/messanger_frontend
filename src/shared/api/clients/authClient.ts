import { createBaseUrl } from '../baseUrl';
import { createFetcher } from '../fetcher';

export const authClient = createFetcher({
  clientOptions: {
    credentials: 'include',
    baseUrl: createBaseUrl('auth'),
  },
});
