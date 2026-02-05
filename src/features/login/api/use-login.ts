import { tokenAction } from '@/shared/token';
import { useRouter, useSearch } from '@tanstack/react-router';
import { $api } from '@/shared/api/repository/$api';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = () => {
  const router = useRouter();
  const search = useSearch({ from: '/auth' });
  const redirectTo = search.redirect ?? '/y';
  return $api.queryAuth.useMutation('post', '/login/password', {
    onSuccess: async ({ data: { access_token } }) => {
      tokenAction.doSetToken(access_token);
      await router.navigate({ to: redirectTo });
      await router.invalidate();
    },
  });
};
