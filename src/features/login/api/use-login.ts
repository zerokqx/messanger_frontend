import { tokenAction } from '@/shared/token';
import { useRouter } from '@tanstack/react-router';
import { useLoginLoginPasswordPost } from '@/shared/api/orval/auth-service/v1-auth/v1-auth';
import { reInitDb, getCookie, ACCESS_COOKIE_NAME } from '@/shared/api';

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = () => {
  const router = useRouter();
  return useLoginLoginPasswordPost({
    mutation: {
      onSuccess: async ({ data: { access_token } }) => {
        const isProd = import.meta.env.PROD;
        // В прод режиме сервер ставит куку, читаем её
        const token = isProd ? getCookie(ACCESS_COOKIE_NAME) : access_token;
        if (token) {
          tokenAction.doSetToken(token);
        }
        await router.invalidate();
        await reInitDb();
      },
    },
  });
};
