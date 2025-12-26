import { profileClient } from '@/shared/api';
import { authMiddleware } from '@/shared/middlewares/auth';

export const useProfilePut = () => {
  const mutate = profileClient(authMiddleware)().useMutation('put', '/edit');
  return mutate;
};
