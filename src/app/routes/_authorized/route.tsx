import {
  createFileRoute,
  Outlet,
} from '@tanstack/react-router';
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
import { meQueryOptions } from '@/entities/user/model/me.query';
import { useSelectedChat } from '@/features/chat';
import { SafeChat } from '@/widgets/chat';

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/navbar').then((m) => ({ default: m.AppShellNavbarWidget }))
);

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    void queryClient.prefetchQuery(meQueryOptions);
  },
});

function RouteComponent() {
  const selectedChat = useSelectedChat((s) => s.data);
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
        collapsed: { mobile: !!selectedChat },
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


          <SafeChat/>
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
