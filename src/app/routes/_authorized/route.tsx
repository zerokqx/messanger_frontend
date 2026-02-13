import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Box, Center, Loader, useMantineTheme } from '@mantine/core';
import { Suspense, lazy } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { tabs } from '@/shared/ui/query-tabs';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useSettingsStore } from '@/features/settings-interface/model/settings-store';
import { NavbarHeader } from '@/widgets/navbar/ui/navbar-header';

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/navbar').then((m) => ({ default: m.AppShellNavbarWidget }))
);

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

const deepTabOne = {};
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
        <tabs.TabsInit queryKey="tnavbar" initialTab="main">
          <tabs.TabsInit queryKey="tsettings" initialTab="main">
            <LazyAppShellNavbar>
              <tabs.Tabs
                perTab={({ current }) =>
                  current !== 'settings' && <NavbarHeader />
                }
                i18nGroup="navbar"
                wrapper={({ children, current }) => (
                  <AnimatePresence mode="popLayout">
                    <Box
                      component={motion.div}
                      p="xs"
                      key={current}
                      initial={
                        withAnimations ? { x: '-100%', opacity: 0 } : false
                      }
                      animate={
                        withAnimations ? { x: 0, opacity: 1 } : undefined
                      }
                      exit={
                        withAnimations ? { x: '100%', opacity: 0 } : undefined
                      }
                    >
                      <Suspense
                        fallback={
                          <Center>
                            <Loader />
                          </Center>
                        }
                      >
                        {children}
                      </Suspense>
                    </Box>
                  </AnimatePresence>
                )}
                queryName="tnavbar"
                tabs={{}}
              />
            </LazyAppShellNavbar>
          </tabs.TabsInit>
        </tabs.TabsInit>
      </MotionConfig>
    </AppShell>
  );
}
