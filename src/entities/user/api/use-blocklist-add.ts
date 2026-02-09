import { $api } from '@/shared/api/repository/$api';

export const useBlocklistAdd = () => {
  const mutation = $api.jwtAuth.query.useMutation('post', '/blacklist/add');
  return mutation;
};
