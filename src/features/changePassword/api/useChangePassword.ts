import { authClient } from '@/shared/api';
import { authMiddleware } from '../../../entities/user/api/middlewares';

export const useChangePassword = () => {
  const mutate = authClient(authMiddleware)().useMutation(
    'post',
    '/password/change'
  );
  
  return mutate;
};
