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
      if (!existingToken || existingToken.includes('placeholder')) {
        const accessCookie = getCookie(ACCESS_COOKIE_NAME);
        if (accessCookie && accessCookie.toLowerCase() !== 'none') {
          // Кука есть и валидна — сохраняем placeholder JWT и редиректимся
          tokenAction.doSetToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature');
          window.location.href = '/y';
          return;
        }
        // Куки нет или она "none" — пробуем refresh
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
          if (newAccess && newAccess.toLowerCase() !== 'none') {
            // Сервер вернул токен — используем его
            tokenAction.doSetToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature');
            window.location.href = '/y';
            return;
          }
          // Сервер вернул "none" — пробуем прочитать куку снова (может сервер её обновил)
          const cookieAfterRefresh = getCookie(ACCESS_COOKIE_NAME);
          if (cookieAfterRefresh && cookieAfterRefresh.toLowerCase() !== 'none') {
            tokenAction.doSetToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature');
            window.location.href = '/y';
            return;
          }
        } catch {
          // Refresh не удался — продолжаем на /auth
        }
      }
    }
    // Не авторизован — редирект на /auth
    const fromPath = location.pathname !== '/' ? location.pathname : '/';
    throw redirect({ to: '/auth', search: { redirect: fromPath } });
  },
  component: () => null,
});
