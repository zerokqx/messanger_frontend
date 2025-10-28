import { authClient } from '@/shared/api';

import { authMiddleware } from '@/entities/user';

export const useRefreshRequest = () => {
  const mutate = authClient(authMiddleware)().useMutation(
    'post',
    '/token/refresh',

    {
      retry: 1,
    }
  );
  return mutate;
};
