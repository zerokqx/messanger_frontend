import { createBaseUrl } from '../base-url';
import { createFetcher } from '../fetcher';

export const chatPrivateClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('chat'),
  },
});
