import { $api } from '@/shared/api/repository/$api';

export const useGetUserById = () => {
  return $api.jwtProfile.query.useMutation('get', '/{user_id}', {});
};
