import { authMiddleware } from '@/entities/user';
import { profileClient } from '@/shared/api';

export const useGetUserById = () => {
  return profileClient(authMiddleware)().useMutation('get', '/{user_id}', {});
};
