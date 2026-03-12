import { $api } from '@/shared/api/repository/$api';

export const usePasswordChange = () => {
  return $api.auth.jwt.useMutation('post', '/password/change');
};
