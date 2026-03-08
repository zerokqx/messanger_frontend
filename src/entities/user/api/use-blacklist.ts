import { $api } from '@/shared/api/repository/$api';


export const useAddBlacklist = () => {
  return $api.jwtUser.query.useMutation('post', '/blacklist/add');
};

export const useRemoveFromBlacklist = () => {
  return $api.jwtUser.query.useMutation('delete', '/blacklist/remove');
};
