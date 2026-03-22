import { authMiddleware } from '@/shared/middlewares/auth';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '../types/auth-service';

const fetchClient = createFetchClient<paths>({
  baseUrl: 'https://dev.api.yobble.org/docs/openapi',
  credentials: 'include',
});

fetchClient.use(authMiddleware);

export const $authService = createClient(fetchClient);
