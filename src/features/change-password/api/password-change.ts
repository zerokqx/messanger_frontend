import { $api } from '@/shared/api/repository/$api';

export const usePasswordChange = () => {
  return $api.jwtAuth.query.useMutation('post', '/password/change');
};
