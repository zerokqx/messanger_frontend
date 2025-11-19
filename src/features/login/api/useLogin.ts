import { useTokenStore } from '@/entities/token';
import { authClient } from '@/shared/api';
import { useRouter } from '@tanstack/react-router';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */

export const useLogin = () => {
  const router = useRouter();
  const setToken = useTokenStore((s) => s.update);
  const mutate = authClient()().useMutation('post', '/login', {
    onSuccess: async ({ data: { access_token } }) => {
      setToken((s) => (s.access = access_token));
      await router.invalidate();
    },
  });
  return mutate;
};
