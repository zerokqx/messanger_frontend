import Logger from '@/shared/lib/logger/logger';
import { AppShell, AppShellMain, Center, Stack } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import Axios from 'axios';
import { tokenAction } from '@/shared/token';
import { getCookie, ACCESS_COOKIE_NAME } from '@/shared/api';

/** Отдельный axios без интерцепторов — чтобы не триггерить рефреш при инициализации */
const rawAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace(/\/+$/, ''),
  withCredentials: true,
});

export const Route = createFileRoute('/_unauthenticated')({
  beforeLoad: ({ context: { auth }, location }): void => {
    Logger.debug('_unathenticated/route.tsx', 'AUTH', auth);
    if (auth) {
      throw redirect({
        to: '/y',
      });
    }
  },
  loader: async ({ location }) => {
    // В прод режиме пробуем авторизоваться по кукам если localStorage пустой
    if (import.meta.env.PROD) {
      const existingToken = tokenAction.doGetToken();
      if (!existingToken || existingToken.includes('placeholder')) {
        const accessCookie = getCookie(ACCESS_COOKIE_NAME);
        if (accessCookie && accessCookie.toLowerCase() !== 'none') {
          // Кука есть и валидна — сохраняем placeholder JWT и редиректимся
          tokenAction.doSetToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature');
          window.location.href = location.pathname;
          return;
        }
        // Куки нет или она "none" — пробуем refresh
        try {
          // Кука есть — пробуем рефрешнуть через бэк (без интерцепторов)
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
            // Редирект на страницу куда пользователь хотел попасть
            // window.location — чтобы контекст auth пересчитался с новым токеном
            const redirectUrl =
              new URLSearchParams(location.search).get('redirect') ?? '/y';
            window.location.href = redirectUrl;
            return;
          }
          // Сервер вернул "none" — пробуем прочитать куку снова (может сервер её обновил)
          const cookieAfterRefresh = getCookie(ACCESS_COOKIE_NAME);
          if (cookieAfterRefresh && cookieAfterRefresh.toLowerCase() !== 'none') {
            tokenAction.doSetToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcm9kLXVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTgwMDAwMDAwMH0.placeholder_signature');
            const redirectUrl =
              new URLSearchParams(location.search).get('redirect') ?? '/y';
            window.location.href = redirectUrl;
            return;
          }
        } catch {
          // Кука невалидна или бэк недоступен — продолжаем на /auth
        }
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppShell disabled p={'0'}>
        <AppShellMain>
          <Center h={'100vh'}>
            <Stack>
              <Outlet />
            </Stack>
          </Center>
        </AppShellMain>
      </AppShell>
    </>
  );
}
