import { createFileRoute, Outlet } from '@tanstack/react-router';
import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Suspense, lazy } from 'react';
import { layoutAction, useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { useSettingsStore } from '@/features/settings-interface/model/settings-store';
import { Tabs } from '@/shared/ui/query-tabs';
import { ContactsTab } from '@/widgets/tab-contacts';
import { ProfileTab } from '@/widgets/tab-profile';
import { Panel } from '@/shared/ui/query-tabs/ui';
import { ArrowLeft, Home, User, Users } from 'lucide-react';
import { SearchInputWrapper } from '@/features/search';
import { SearchTab } from '@/widgets/navbar/ui/tabs/search.tab';
import * as m from 'motion/react-m';

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
  const animationsEnabled = withAnimations;

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
      {' '}
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
          <Tabs animationVariant={animationsEnabled ? 'blur' : 'none'}>
            <Stack p={'xs'} gap={'sm'}>
              <Tabs.UseApi
                children={({ state, actions }) => (
                  <Stack>
                    <Group>
                      {animationsEnabled ? (
                        <AnimatePresence mode="popLayout">
                          {state.current === 'search' && (
                            <m.div
                              key={'back'}
                              exit={{ scale: 0 }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <ActionIcon
                                onClick={() => {
                                  actions.back();
                                }}
                                bdrs={'xl'}
                                variant="light"
                              >
                                <ArrowLeft />
                              </ActionIcon>
                            </m.div>
                          )}
                          <m.div
                            key={'input'}
                            layout
                            style={{
                              flex: 1,
                            }}
                          >
                            <SearchInputWrapper
                              radius={'xl'}
                              onFocus={() => {
                                actions.push('search');
                              }}
                            />
                          </m.div>
                        </AnimatePresence>
                      ) : (
                        <>
                          {state.current === 'search' && (
                            <ActionIcon
                              onClick={() => {
                                actions.back();
                              }}
                              bdrs={'xl'}
                              variant="light"
                            >
                              <ArrowLeft />
                            </ActionIcon>
                          )}
                          <Box
                            style={{
                              flex: 1,
                            }}
                          >
                            <SearchInputWrapper
                              radius={'xl'}
                              onFocus={() => {
                                actions.push('search');
                              }}
                            />
                          </Box>
                        </>
                      )}
                    </Group>
                    {animationsEnabled ? (
                      <AnimatePresence mode="popLayout">
                        {state.current !== 'search' && (
                          <m.div
                            key={'panel'}
                            exit={{ y: -10, opacity: 0 }}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                          >
                            <Panel
                              component={ActionIcon}
                              data={[
                                {
                                  value: 'main',
                                  icon: <Home />,
                                },

                                {
                                  value: 'profile',
                                  icon: <User />,
                                },
                                {
                                  value: 'contacts',
                                  icon: <Users />,
                                },
                              ]}
                            />
                          </m.div>
                        )}
                      </AnimatePresence>
                    ) : (
                      state.current !== 'search' && (
                        <Panel
                          component={ActionIcon}
                          data={[
                            {
                              value: 'main',
                              icon: <Home />,
                            },

                            {
                              value: 'profile',
                              icon: <User />,
                            },
                            {
                              value: 'contacts',
                              icon: <Users />,
                            },
                          ]}
                        />
                      )
                    )}
                  </Stack>
                )}
              />
            </Stack>
            <Box p={'xs'}>
              <Tabs.Tab value="search" withAnimation={animationsEnabled}>
                <SearchTab />
              </Tabs.Tab>
              <Tabs.Tab value="main" withAnimation={animationsEnabled}>
                <Text>Chats</Text>
              </Tabs.Tab>
              <Tabs.Tab value="contacts" withAnimation={animationsEnabled}>
                <ContactsTab />
              </Tabs.Tab>
              <Tabs.Tab value="profile" withAnimation={animationsEnabled}>
                <Suspense>
                  <ProfileTab />
                </Suspense>
              </Tabs.Tab>
            </Box>
          </Tabs>
        </LazyAppShellNavbar>
      </Suspense>
    </AppShell>
  );
}
