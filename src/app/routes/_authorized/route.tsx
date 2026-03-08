import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Loader, useMantineTheme } from '@mantine/core';
import { Suspense, lazy, useEffect } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { notify } from '@/shared/lib/notifications';
import { useTokenStore } from '@/shared/token';
import { socket } from '@/shared/api';

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
