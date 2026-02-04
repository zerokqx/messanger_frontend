import { $api } from '@/shared/api/repository/$api';

export const useProfilePut = () => {
  const mutate = $api.jwtProfile.query.useMutation('put', '/edit');
  return mutate;
};
