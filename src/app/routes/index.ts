import { createFileRoute, redirect } from '@tanstack/react-router';
<<<<<<< Updated upstream
||||||| Stash base
import Axios from 'axios';
import { tokenAction } from '@/shared/token';
import {
  ACCESS_COOKIE_NAME,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  type RefreshTokenResponse,
  getCookie,
  isPlaceholderAccessToken,
} from '@/shared/api';

/** Отдельный axios без интерцепторов — чтобы не триггерить рефреш */
const rawAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace(/\/+$/, ''),
  withCredentials: true,
});

=======
import {
  bootstrapClientSession,
  resetClientSession,
} from '@/shared/api';
>>>>>>> Stashed changes

export const Route = createFileRoute('/')({
  beforeLoad({ context: { auth }, location }) {
    if (auth) {
      throw redirect({ to: '/y' });
    } else {
      throw redirect({ to: '/auth', search: { redirect: location.pathname } });
    }
  },
<<<<<<< Updated upstream
||||||| Stash base
  loader: async ({ location }) => {
    if (import.meta.env.PROD) {
      const existingToken = tokenAction.doGetToken();
      if (!existingToken || isPlaceholderAccessToken(existingToken)) {
        try {
          const { data } = await rawAxios.post<RefreshTokenResponse>(
            '/v1/auth/token/refresh',
            {},
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'web',
              },
            }
          );
          const newAccess = data.data?.access_token;
          if (newAccess && newAccess.toLowerCase() !== 'none') {
            // Сервер вернул токен — используем его
            tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
            window.location.href = '/y';
            return;
          }
          // Сервер вернул "none" — пробуем прочитать куку снова (может сервер её обновил)
          const cookieAfterRefresh = getCookie(ACCESS_COOKIE_NAME);
          if (cookieAfterRefresh && cookieAfterRefresh.toLowerCase() !== 'none') {
            tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
            window.location.href = '/y';
            return;
          }
        } catch {
          // Refresh не удался — продолжаем на /auth
        }

        tokenAction.doReset();
      }
    }
    // Не авторизован — редирект на /auth
    const fromPath = location.pathname !== '/' ? location.pathname : '/';
    throw redirect({ to: '/auth', search: { redirect: fromPath } });
  },
=======
  loader: async ({ location }) => {
    if (await bootstrapClientSession()) {
      throw redirect({ to: '/y' });
    }

    resetClientSession();

    const fromPath = location.pathname !== '/' ? location.pathname : '/';
    throw redirect({ to: '/auth', search: { redirect: fromPath } });
  },
>>>>>>> Stashed changes
  component: () => null,
});
