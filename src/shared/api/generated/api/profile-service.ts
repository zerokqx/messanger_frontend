import { authMiddleware } from '@/shared/middlewares/auth';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '../types/profile-service';

const fetchClient = createFetchClient<paths>({
  baseUrl: 'https://dev.api.yobble.org/v1/profile',
  credentials: 'include',
});

fetchClient.use(authMiddleware);

export const $profileService = createClient(fetchClient);
