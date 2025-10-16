import { authClient } from '@/shared/api';
import { authMiddleware } from './middlewares';

export const useChangePassword = () => {
  const mutate = authClient(authMiddleware)().useMutation(
    'post',
    '/password/change'
  );
  
  return mutate;
};
