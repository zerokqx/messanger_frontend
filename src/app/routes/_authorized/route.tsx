import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Loader, useMantineTheme } from '@mantine/core';
import { Suspense, lazy, useRef } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { MotionConfig } from 'motion/react';
import type { Actions } from '@/shared/ui/query-tabs/ui/tabs.type';

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
