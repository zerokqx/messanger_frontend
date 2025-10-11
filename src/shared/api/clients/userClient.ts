import { createBaseUrl } from '../baseUrl';
import { createFetcher } from '../fetcher';

export const userClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('user'),
  },
});
