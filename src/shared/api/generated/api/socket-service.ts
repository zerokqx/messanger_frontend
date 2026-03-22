import { authMiddleware } from '@/shared/middlewares/auth';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from '../types/socket-service';

const fetchClient = createFetchClient<paths>({
  baseUrl: 'https://dev.api.yobble.org/v1/socket',
  credentials: 'include',
});

fetchClient.use(authMiddleware);

export const $socketService = createClient(fetchClient);
