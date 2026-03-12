import { $api } from '@/shared/api/repository/$api';


export const useAddBlacklist = () => {
  return $api.user.jwt.useMutation('post', '/blacklist/add');
};

export const useRemoveFromBlacklist = () => {
  return $api.user.jwt.useMutation('delete', '/blacklist/remove');
};
