import { authMiddleware } from '@/shared/middlewares/auth';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '../types/rating-service';

const fetchClient = createFetchClient<paths>({
  baseUrl: 'https://dev.api.yobble.org/v1/rating',
  credentials: 'include',
});

fetchClient.use(authMiddleware);

export const $ratingService = createClient(fetchClient);
