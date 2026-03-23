import { tokenAction } from '@/shared/token';
import { useRouter, useSearch } from '@tanstack/react-router';
import { $authService } from '@/shared/api/generated';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_auth/auth' });
  return $authService.useMutation('post', '/login/password', {
    onSuccess: async ({ data: { access_token } }) => {
      tokenAction.doSetToken(access_token);
      await router.navigate({ to: search.redirect });
      await router.invalidate();
    },
  });
};
