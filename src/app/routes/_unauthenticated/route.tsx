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
      if (!existingToken) {
        const accessCookie = getCookie(ACCESS_COOKIE_NAME);
        if (accessCookie) {
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
            if (newAccess) {
              tokenAction.doSetToken(newAccess);
              // Редирект на страницу куда пользователь хотел попасть
              const redirectUrl =
                new URLSearchParams(location.search).get('redirect') ?? '/y';
              throw redirect({ to: redirectUrl });
            }
          } catch {
            // Кука невалидна или бэк недоступен — продолжаем на /auth
          }
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
