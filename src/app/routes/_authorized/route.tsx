import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Button, useMantineTheme } from '@mantine/core';
import { Suspense, lazy } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { useSettingsStore } from '@/features/settings-interface/model/settings-store';
import { Tabs } from '@/shared/ui/query-tabs';

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
  const animationStyle = useSettingsStore((s) => s.data.animations);
  const withAnimations = useSettingsStore((s) => s.data.withAnimations);

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

      <MotionConfig
        transition={{
          type: animationStyle,
          mass: 0.4,
        }}
      >
        <LazyAppShellNavbar>
          <Tabs initialTab="tab-1">
            <Tabs.Tab value="tab-1">Tab 1 </Tabs.Tab>
            <Tabs.Tab value="tab-2">Tab 2 </Tabs.Tab>
            <Tabs.Tab value="tab-3">Tab 3 </Tabs.Tab>
          </Tabs>
        </LazyAppShellNavbar>
      </MotionConfig>
    </AppShell>
  );
}
