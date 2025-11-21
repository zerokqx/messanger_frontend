import { createFileRoute, useSearch } from '@tanstack/react-router';
import { AppShell, AppShellAside, useMantineTheme } from '@mantine/core';

import { Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import { useLayoutStore } from '@/shared/lib/hooks/useLayout';
import { AssideProfile } from '@/widgets/Aside';

const LazySideBarWidget = lazy(() =>
  import('@/widgets/SideBar').then((m) => ({ default: m.SideBarWidget }))
);

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/ChatAside').then((m) => ({ default: m.AppShellNavbar }))
);

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

function RouteComponent() {
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  return (
    <AppShell
      transitionDuration={300}
      transitionTimingFunction="ease"
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
        width: 350,
        collapsed: { desktop: !asside, mobile: !asside },
        breakpoint: 'sm',
      }}
      p="md"
    >
      <AppShell.Main bg="black">
        <Outlet />

        <AssideProfile />
        <Suspense fallback={null}>
          <LazySideBarWidget />
        </Suspense>

        <Suspense fallback={null}>
          <LazyAppShellNavbar />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
