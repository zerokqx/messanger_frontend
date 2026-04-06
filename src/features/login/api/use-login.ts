import { useRouter } from '@tanstack/react-router';
import { useLoginLoginPasswordPost } from '@/shared/api/orval/auth-service/v1-auth/v1-auth';
<<<<<<< Updated upstream
import { reInitDb } from '@/shared/api';
||||||| Stash base
import {
  ACCESS_COOKIE_NAME,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  getCookie,
  reInitDb,
} from '@/shared/api';
=======
import {
  reInitDb,
  resetClientSession,
  syncClientSession,
} from '@/shared/api';
>>>>>>> Stashed changes

/**
 * @param search - Return data from hook useForm
 * @returns Default useMutation
 */
export const useLogin = () => {
  const router = useRouter();
  return useLoginLoginPasswordPost({
    mutation: {
      onSuccess: async ({ data: { access_token } }) => {
<<<<<<< Updated upstream
        tokenAction.doSetToken(access_token);
||||||| Stash base
        const isProd = import.meta.env.PROD;
        // В прод режиме сервер ставит куку, читаем её
        const token = isProd ? getCookie(ACCESS_COOKIE_NAME) : access_token;
        if (token) {
          // В прод режиме сохраняем placeholder JWT, т.к. методы используют cookie
          const storeToken = isProd ? PROD_PLACEHOLDER_ACCESS_TOKEN : token;
          tokenAction.doSetToken(storeToken);
        }
=======
        if (!syncClientSession(access_token)) {
          resetClientSession();
          return;
        }

>>>>>>> Stashed changes
        await router.invalidate();
        await reInitDb();
      },
    },
  });
};
