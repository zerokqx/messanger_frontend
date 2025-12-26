import { tokenAction } from '@/shared/token';
import { authClient } from '@/shared/api';
import { useRouter, useSearch } from '@tanstack/react-router';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */

export const useLogin = () => {
  const router = useRouter();
  const search = useSearch({ from: '/auth' });
  const mutate = authClient()().useMutation('post', '/login/password', {
    onSuccess: async ({ data: { access_token } }) => {
      tokenAction.doSetToken(access_token);
      await router.invalidate();
      await router.navigate({ to: search.redirect });
    },
  });
  return mutate;
};
