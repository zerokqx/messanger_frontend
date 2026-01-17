import { $api } from '@/shared/api/repository/$api';

export const useContactRemove = () => {
  return $api.jwtUser.query.useMutation('delete', '/contact/remove');
};
