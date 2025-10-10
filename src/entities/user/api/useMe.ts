import { profileClient } from '@/shared/api';

/** Hook for fetch user profile data */
export const useMe = () => {
  return profileClient()().useMutation('get', '/me', {
    onSuccess: ({ data }) => {},
  });
};
