import { createFileRoute, Link } from '@tanstack/react-router';
import { AppShell, useMantineTheme } from '@mantine/core';

import { Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';

const LazySideBarWidget = lazy(() =>
  import('@/widgets/side-bar').then((m) => ({ default: m.SideBarWidget }))
);

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/chat-aside').then((m) => ({ default: m.AppShellNavbar }))
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
      <Suspense fallback={null}>
        <LazySideBarWidget />
      </Suspense>
      <Suspense>
        <LazyAppShellNavbar />
      </Suspense>
    </AppShell>
  );
}
