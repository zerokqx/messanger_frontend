import { createFileRoute, redirect } from '@tanstack/react-router';
import Axios from 'axios';
import { tokenAction } from '@/shared/token';
import { getCookie, ACCESS_COOKIE_NAME } from '@/shared/api';

/** Отдельный axios без интерцепторов — чтобы не триггерить рефреш */
const rawAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace(/\/+$/, ''),
  withCredentials: true,
});

export const Route = createFileRoute('/')({
  beforeLoad({ context: { auth }, location }) {
    if (auth) {
      throw redirect({ to: '/y' });
    }
  },
  loader: async ({ location }) => {
    if (import.meta.env.PROD) {
      const existingToken = tokenAction.doGetToken();
      if (!existingToken) {
        const accessCookie = getCookie(ACCESS_COOKIE_NAME);
        if (accessCookie) {
          try {
            const { data } = await rawAxios.post(
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
            if (newAccess) {
              tokenAction.doSetToken(newAccess);
              // window.location — чтобы контекст auth пересчитался с новым токеном
              window.location.href = '/y';
              return;
            }
          } catch {
            // Кука невалидна — продолжаем на /auth
          }
        }
      }
    }
    // Не авторизован — редирект на /auth
    const fromPath = location.pathname !== '/' ? location.pathname : '/';
    throw redirect({ to: '/auth', search: { redirect: fromPath } });
  },
  component: () => null,
});
