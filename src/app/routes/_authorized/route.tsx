import { createFileRoute } from '@tanstack/react-router';
import { AppShell, Box, Text, useMantineTheme } from '@mantine/core';

import { Outlet } from '@tanstack/react-router';
import { Suspense, lazy, useMemo } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { NuqsTabs, type NuqsTabsTab } from '@/shared/ui/nuqs-base-tabs';
import { AnimatePresence, motion } from 'motion/react';
import { SkeletonProfile } from '@/entities/user';

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

function RouteComponent() {
  const asside = useLayoutStore((s) => s.data.asside);
  const tabs = useMemo(
    () => ({
      search: {
        i18n: 'search',
        component: (
          <Suspense>
            <LazySearchTab />
          </Suspense>
        ),
      },
      main: { i18n: 'main', component: <Text>Hello world</Text> },
      contacts: {
        i18n: 'contacts',
        component: (
          <Suspense>
            <LazyContactsList />
          </Suspense>
        ),
      },
      profile: {
        i18n: 'profile',
        component: (
          <Suspense fallback={<SkeletonProfile />}>
            <LazyProfileTab />
          </Suspense>
        ),
      },
      settings: {
        i18n: 'settings',
        component: (
          <Suspense>
            <LazySettingsTab />
          </Suspense>
        ),
      },
    }),
    []
  );
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
      <Suspense>
        <LazyAppShellNavbar>
          <NuqsTabs
            i18nGroup="navbar"
            queryName="tnavbar"
            children={({ currentTab, tabs }) => (
              <AnimatePresence mode="popLayout">
                <Box
                  component={motion.div}
                  p={'xs'}
                  animate={{
                    zIndex: 200,
                    x: [-500, 0],
                    opacity: [0, 1],
                  }}
                  key={currentTab}
                  exit={{ x: 500, opacity: 0 }}
                >
                  {tabs[currentTab]?.component}
                </Box>
              </AnimatePresence>
            )}
            initialTab="main"
            tabs={tabs as Record<string, NuqsTabsTab<'navbar'>>}
          />
        </LazyAppShellNavbar>
      </Suspense>
    </AppShell>
  );
}
