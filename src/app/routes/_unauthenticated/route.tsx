import Logger from '@/shared/lib/logger/logger';
import { AppShell, AppShellMain, Center, Stack } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import Axios from 'axios';
import { tokenAction } from '@/shared/token';
import {
  ACCESS_COOKIE_NAME,
  PROD_PLACEHOLDER_ACCESS_TOKEN,
  type RefreshTokenResponse,
  getCookie,
  isPlaceholderAccessToken,
} from '@/shared/api';

/** Отдельный axios без интерцепторов — чтобы не триггерить рефреш при инициализации */
const rawAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace(/\/+$/, ''),
  withCredentials: true,
});

export const Route = createFileRoute('/_unauthenticated')({
  beforeLoad: ({ context: { auth } }): void => {
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
      if (!existingToken || isPlaceholderAccessToken(existingToken)) {
        try {
          // Кука есть — пробуем рефрешнуть через бэк (без интерцепторов)
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
            tokenAction.doSetToken(PROD_PLACEHOLDER_ACCESS_TOKEN);
            const redirectUrl =
              new URLSearchParams(location.search).get('redirect') ?? '/y';
            window.location.href = redirectUrl;
            return;
          }
        } catch {
          // Кука невалидна или бэк недоступен — продолжаем на /auth
        }

        tokenAction.doReset();
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
