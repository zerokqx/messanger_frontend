import { authMiddleware } from '@/entities/user';
import { profileClient } from '@/shared/api';

export const useProfilePut = () => {
  const mutate = profileClient(authMiddleware)().useMutation('put', '/edit');
  return mutate;
};
