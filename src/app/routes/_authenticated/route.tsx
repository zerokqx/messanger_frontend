import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import {
  AppShell,
  AppShellAside,
  AppShellNavbar,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { Suspense, lazy, useEffect } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { notify } from '@/shared/lib/notifications';
import { useTokenStore } from '@/shared/token';
import { socket } from '@/shared/api';
import { SafeChat } from '@/widgets/chat';
import Logger from '@/shared/lib/logger/logger';
import { getGetMyProfileMeGetQueryOptions } from '@/shared/api/orval/profile-service/v1-profile/v1-profile';

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/navbar').then((m) => ({ default: m.AppShellNavbarWidget }))
);

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: ({ context: { auth }, location }) => {
    Logger.debug('_authenticated/route.tsx', 'AUTH', auth);
    if (!auth)
      throw redirect({
        to: '/auth',
        search: {
          redirect: location.pathname,
        },
      });
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(getGetMyProfileMeGetQueryOptions());
  },
});

function RouteComponent() {
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  const token = useTokenStore((s) => s.data.access);

  useEffect(() => {
    const onAny = (event: string, ...args: unknown[]) => {
      console.log('EVENT:', event, args);
    };

    const onConnect = () => {
      notify.success({ title: 'Сокет', message: 'Успешное подключение' });
    };

    const onMessage = () => {
      notify.success({ title: 'Сокет', message: 'Успешное подключение' });
    };

    socket.auth = { token };

    socket.offAny();
    socket.off('connect', onConnect);
    socket.off('message', onMessage);

    socket.onAny(onAny);
    socket.on('connect', onConnect);
    socket.on('message', onMessage);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('message', onMessage);
      socket.offAny(onAny);
    };
  }, [token]);

  return (
    <AppShell
      navbar={{
        width: 400,
        breakpoint: 'sm',
      }}
      styles={{
        aside: {
          zIndex: 1000,
          padding: t.spacing.md,
        },
      }}
      aside={{
        width: 500,
        collapsed: { desktop: !asside, mobile: !asside },
        breakpoint: 'sm',
      }}
    >
      <Suspense fallback={<AppShellAside />}>
        <LazyAside
          onClose={() => {
            layoutAction.doSetAside(false);
          }}
        />
      </Suspense>

      <AppShell.Main
        style={{ height: '100dvh', minHeight: 0, overflow: 'hidden' }}
      >
        <Box h="100%" mih={0}>
          <Suspense fallback={<p>dawdw</p>}>
            <SafeChat
              onToggleAside={() => {
                layoutAction.doSetAside(!asside);
              }}
              asideStatus={asside}
            />
          </Suspense>
          <Outlet />
        </Box>
      </AppShell.Main>

      <Suspense fallback={<AppShellNavbar />}>
        <LazyAppShellNavbar />
      </Suspense>
    </AppShell>
  );
}
