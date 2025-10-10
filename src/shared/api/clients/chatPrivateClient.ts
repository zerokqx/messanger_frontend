import { createBaseUrl } from '../baseUrl';
import { createFetcher } from '../fetcher';

export const chatPrivateClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('chat'),
  },
});
