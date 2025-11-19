import { createFileRoute, useSearch } from '@tanstack/react-router';
import { AppShell } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
import z from 'zod';
import { Suspense, lazy } from 'react';

const LazySideBarWidget = lazy(() =>
  import('@/widgets/SideBar').then((m) => ({ default: m.SideBarWidget }))
);

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/ChatAside').then((m) => ({ default: m.AppShellNavbar }))
);

export const Route = createFileRoute('/_authorized')({
  validateSearch: z.object({
    aside: z.boolean().default(false),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { aside } = useSearch({ from: '/_authorized' });

  return (
    <AppShell
      transitionDuration={300}
      transitionTimingFunction="ease"
      navbar={{
        width: 350,
        collapsed: { desktop: false, mobile: true },
        breakpoint: 'sm',
      }}
      aside={{
        width: 300,
        collapsed: { desktop: !aside, mobile: !aside },
        breakpoint: 'sm',
      }}
      p="md"
    >
      <AppShell.Main bg="black">
        <Outlet />

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
