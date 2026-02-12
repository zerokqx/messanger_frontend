import { createBaseUrl } from '../base-url';
import { createFetcher } from '../fetcher';

export const userClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('user'),
  },
});
