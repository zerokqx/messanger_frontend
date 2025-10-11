import { createBaseUrl } from '../baseUrl';
import { createFetcher } from '../fetcher';

export const feedClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('feed'),
  },
});
