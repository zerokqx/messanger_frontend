import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';

export const useContactAdd = () => {
  const mutate = userClient(authMiddleware)().useMutation(
    'post',
    '/contact/add'
  );
  return mutate;
};
