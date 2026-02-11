import { createFileRoute } from '@tanstack/react-router';
import { AppShell, Box, Button, Text, useMantineTheme } from '@mantine/core';

import { Outlet } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { tabs } from '@/shared/ui/query-tabs';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { SkeletonProfile } from '@/entities/user';
import { InterfaceEditTab } from '@/widgets/tab-interface-edit';
import type { TabsObject } from '@/shared/ui/query-tabs';
import { Palette, ShieldPlus } from 'lucide-react';
import { SessionsTab } from '@/widgets/tab-sessions';
import { useSettingsStore } from '@/features/settings-interface/model/settings-store';

const LazyAppShellNavbar = lazy(() =>
  import('@/widgets/navbar').then((m) => ({ default: m.AppShellNavbarWidget }))
);

const LazyAside = lazy(() =>
  import('@/widgets/aside').then((m) => ({ default: m.Aside }))
);

const LazySearchTab = lazy(() =>
  import('@/widgets/navbar/ui/tabs/search.tab').then((m) => ({
    default: m.SearchTab,
  }))
);

const LazyContactsList = lazy(() =>
  import('@/widgets/contact-list').then((m) => ({
    default: m.ContactsList,
  }))
);

const LazyProfileTab = lazy(() =>
  import('@/widgets/tab-profile').then((m) => ({ default: m.ProfileTab }))
);

const LazySettingsTab = lazy(() =>
  import('@/widgets/tab-settings').then((m) => ({ default: m.SettingsTab }))
);

export const Route = createFileRoute('/_authorized')({
  component: RouteComponent,
});

const navbarTabs: TabsObject<'tnavbar', 'navbar'> = {
  main: { i18n: 'main', render: <Text>Hello world</Text> },

  contacts: {
    i18n: 'contacts',
    render: (
      <Suspense>
        <LazyContactsList />
      </Suspense>
    ),
  },
  search: {
    i18n: 'search',
    render: (
      <Suspense>
        <LazySearchTab />
      </Suspense>
    ),
  },
  profile: {
    i18n: 'profile',
    render: <LazyProfileTab />,
  },
  settings: {
    i18n: 'settings',
    render: (
      <Suspense>
        <LazySettingsTab>
          <tabs.Tabs
            i18nGroup="settings"
            queryName="tsettings"
            tabs={{
              sessions: {
                i18n: 'dw',
                render: <SessionsTab />,
              },
              main: {
                i18n: 'main',
                render: (api) => (
                  <>
                    <Button
                      leftSection={<Palette />}
                      justify="left"
                      bdrs={0}
                      variant="subtle"
                      onClick={() => api.doPush('tsettings', 'interface')}
                    >
                      Интерфейс
                    </Button>

                    <Button
                      leftSection={<ShieldPlus />}
                      justify="left"
                      bdrs={0}
                      variant="subtle"
                      onClick={() => api.doPush('tsettings', 'sessions')}
                    >
                      Сессии
                    </Button>
                  </>
                ),
              },

              interface: {
                i18n: 'interface',
                render: <InterfaceEditTab />,
              },
            }}
          />
        </LazySettingsTab>
      </Suspense>
    ),
  },
};
function RouteComponent() {
  const asside = useLayoutStore((s) => s.data.asside);
  const t = useMantineTheme();
  const animationStyle = useSettingsStore((s) => s.data.animations);
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
        <tabs.TabsInit queryKey={'tnavbar'} initialTab="main">
          <tabs.TabsInit queryKey="tsettings" initialTab="main">
            <LazyAppShellNavbar>
              <tabs.Tabs
                i18nGroup="navbar"
                wrapper={(component, current) => (
                  <AnimatePresence mode="popLayout">
                    <Box
                      component={motion.div}
                      p={'xs'}
                      key={current}
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '100%', opacity: 0 }}
                    >
                      <Suspense>{component}</Suspense>
                    </Box>
                  </AnimatePresence>
                )}
                queryName="tnavbar"
                tabs={navbarTabs}
              />
            </LazyAppShellNavbar>
          </tabs.TabsInit>
        </tabs.TabsInit>
      </MotionConfig>
    </AppShell>
  );
}
