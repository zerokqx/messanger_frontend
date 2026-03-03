import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Loader, useMantineTheme } from '@mantine/core';
import { Suspense, lazy, useRef } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { notify } from '@/shared/lib/notifications';
import { useTokenStore } from '@/shared/token';
import { socket } from '@/shared/api';
import { useEffectOnce } from 'react-use';
const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/navbar').then((m) => ({ default: m.AppShellNavbarWidget }))
);

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

function RouteComponent() {
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  const socketConnected = useRef(false);
  const token = useTokenStore((s) => s.data.access);

  useEffectOnce(() => {
    if (socketConnected.current) return;
    socket.disconnect()
    socket.onAny((event, ...args) => {
      console.log('EVENT:', event, args);
    });

    socket.on('connect', () => {
      notify.success({ title: 'Сокет', message: 'Успешное подключение' });
    });

    socket.on('message', () => {
      notify.success({ title: 'Сокет', message: 'Успешное подключение' });
    });

    socket.auth = { token };
    socket.connect();
    socketConnected.current = true;
  });
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
      p="md"
    >
      <Suspense>
        <LazyAside
          onClose={() => {
            layoutAction.doSetAside(false);
          }}
        />
      </Suspense>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <Suspense fallback={<Loader />}>
        <LazyAppShellNavbar />
      </Suspense>
    </AppShell>
  );
}
