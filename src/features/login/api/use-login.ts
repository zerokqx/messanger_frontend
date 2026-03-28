import { tokenAction } from '@/shared/token';
import { useRouter } from '@tanstack/react-router';
import { useLoginLoginPasswordPost } from '@/shared/api/orval/auth-service/v1-auth/v1-auth';
import { reInitDb } from '@/shared/api';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = () => {
  const router = useRouter();
  return useLoginLoginPasswordPost({
    mutation: {
      onSuccess: async ({ data: { access_token } }) => {
        tokenAction.doSetToken(access_token);
        await router.invalidate();
        await reInitDb();
      },
    },
  });
};
