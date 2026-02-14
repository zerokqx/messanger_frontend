import { createFileRoute, Outlet } from '@tanstack/react-router';
import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Center,
  Loader,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { Children, Suspense, lazy } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { tabs } from '@/shared/ui/query-tabs';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useSettingsStore } from '@/features/settings-interface/model/settings-store';
import { NavbarHeader } from '@/widgets/navbar/ui/navbar-header';
import { User, Users } from 'lucide-react';
import { ContactsTab } from '@/widgets/tab-contacts';
import { ProfileTab } from '@/widgets/tab-profile';

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
        <tabs.TabsInit queryName="tnavbar.main" initialTab="main">
          <LazyAppShellNavbar>
            <tabs.Tabs
              children={({ children, current }) => (
                <AnimatePresence mode="popLayout">
                  <Box
                    component={motion.div}
                    key={current}
                    initial={
                      withAnimations
                        ? { x: '100%', opacity: 0, zIndex: 2 }
                        : false
                    }
                    animate={
                      withAnimations ? { x: '0', opacity: 1 } : undefined
                    }
                    exit={
                      withAnimations
                        ? { x: '100%', opacity: 0, zIndex: 1 }
                        : undefined
                    }
                  >
                    {current !== 'main' && (
                      <>
                        <tabs.ClosePanel key={'close'} />
                      </>
                    )}
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
              tabs={{
                contacts: {
                  render: () => <ContactsTab />,
                },
                profile: {
                  render: () => <ProfileTab />,
                },
                main: {
                  render: (api) => {
                    return (
                      <>
                        <tabs.Panel
                          withStyleAtActive={false}
                          component={ActionIcon}
                          onClickAnyItem={(v) => {
                            console.log(api);
                            api.push(v);
                          }}
                          data={[
                            { value: 'contacts', icon: <Users /> },

                            {
                              value: 'profile',
                              icon: <User />,
                            },
                          ]}
                        />

                        <p>dawd</p>
                      </>
                    );
                  },
                },
              }}
            />
          </LazyAppShellNavbar>
        </tabs.TabsInit>
      </MotionConfig>
    </AppShell>
  );
}
