import { createBaseUrl } from '../baseUrl';
import { createFetcher } from '../fetcher';

export const profileClient = createFetcher({
  clientOptions: {
    baseUrl: createBaseUrl('profile'),
  },
});
