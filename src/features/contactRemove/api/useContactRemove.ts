import { authMiddleware } from '@/entities/user';
import { userClient } from '@/shared/api';

export const useContactRemove = () => {
  return userClient(authMiddleware)().useMutation('delete', '/contact/remove');
};
