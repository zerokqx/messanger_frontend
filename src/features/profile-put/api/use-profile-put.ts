import { $api } from '@/shared/api/repository/$api';

export const useProfilePut = () => {
  const mutate = $api.profile.jwt.useMutation('put', '/edit');
  return mutate;
};
