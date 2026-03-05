import { $api } from '@/shared/api/repository/$api';

const useBlacklist = () => {
  return $api.jwtUser.query.useSuspenseQuery('get', '/blacklist/list');
};

export const useAddBlacklist = () => {
  return $api.jwtUser.query.useMutation('post', '/blacklist/add');
};

export const useRemoveFromBlacklist = () => {
  return $api.jwtUser.query.useMutation('delete', '/blacklist/remove');
};
