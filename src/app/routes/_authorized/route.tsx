import { createFileRoute } from '@tanstack/react-router';
import { AppShell, useMantineTheme } from '@mantine/core';

import { Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';

const LazySideBarWidget = lazy(() =>
  import('@/widgets/SideBar').then((m) => ({ default: m.SideBarWidget }))
);

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/ChatAside').then((m) => ({ default: m.AppShellNavbar }))
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

  return (
    <AppShell
      navbar={{
        width: 350,
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
      h={'100dvh'}
    >
      <Suspense>
        <LazyAside />
      </Suspense>
      <AppShell.Main>
        <Outlet />
        <Suspense fallback={null}>
          <LazySideBarWidget />
        </Suspense>
      </AppShell.Main>
      <Suspense>
        <LazyAppShellNavbar />
      </Suspense>
    </AppShell>
  );
}
