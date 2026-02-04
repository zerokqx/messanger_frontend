import { createBaseUrl } from '../base-url';
import { createFetcher } from '../fetcher';

export const feedClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('feed'),
  },
});
