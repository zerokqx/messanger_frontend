import { Suspense, type ReactNode } from 'react';
import {
  ActionIcon,
  AppShellNavbar,
  Box,
  Button,
  ButtonGroup,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { SearchInput, SearchResultList } from '@/features/search';
import { Panel } from '@/shared/ui/query-tabs/ui';
import { ArrowLeft, Home, Palette, Shield, User, Users } from 'lucide-react';
import { ContactsList } from '@/features/contact';

import * as m from 'motion/react-m';
import { useMe } from '@/entities/user/model/me.query';
import { ProfileForCurrentUser, SkeletonProfile } from '@/entities/user';
import { TabsMenu } from '@/widgets/tabs-menu';
import { InterfaceEditTab } from '@/features/settings-interface/ui/edit';
import { InterfaceEditSkeleton } from '@/features/settings-interface';
import { SessionsTab } from '@/features/session/ui/session-manager';
import { useTranslation } from 'react-i18next';
interface AppShellNavbarWidgetProps {
  children?: ReactNode;
}

export const AppShellNavbarWidget = (props: AppShellNavbarWidgetProps) => {
  const [t] = useTranslation('navbar');
  const { colorScheme } = useMantineColorScheme();
  const topApiTabs = Tabs.useBridgeRef();
  const bottomApiTabs = Tabs.useBridgeRef();
  const { data: profile } = useMe();
  return (
    <AppShellNavbar style={{ overflow: 'auto', overflowX: 'hidden' }}>
      <Tabs animationVariant="slide-x">
        <Tabs.Bridge saveTo={topApiTabs} />
        <Box p={'xs'}>
          <Stack>
            <Tabs.Hide when={['main']} animationVariant="drop-card">
              <Group
                justify="space-between"
                bg={colorScheme === 'dark' ? 'dark.8' : 'gray.1'}
                p={'xs'}
                bdrs={'xl'}
              >
                <ActionIcon
                  onClick={() => topApiTabs.current?.back()}
                  bdrs="xl"
                  variant="light"
                >
                  <ArrowLeft />
                </ActionIcon>
                <Tabs.UseApi
                  children={({ state }) => <Text>{t(state.current)}</Text>}
                />
                <ActionIcon
                  onClick={() => topApiTabs.current?.reset('main')}
                  bdrs="xl"
                  variant="light"
                >
                  <Home />
                </ActionIcon>
              </Group>
            </Tabs.Hide>
            <Tabs.Tab value="settings/sessions">
              <SessionsTab />
            </Tabs.Tab>
            <Tabs.Tab value="settings/interface">
              <Suspense fallback={<InterfaceEditSkeleton />}>
                <InterfaceEditTab />
              </Suspense>
            </Tabs.Tab>
            <Tabs.Tab value="settings">
              <Stack>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      topApiTabs.current?.push('settings/interface');
                    }}
                    leftSection={<Palette />}
                    fullWidth
                    variant="light"
                    justify="start"
                  >
                    Интерфейс
                  </Button>

                  <Button
                    onClick={() => {
                      topApiTabs.current?.push('settings/sessions');
                    }}
                    leftSection={<Shield />}
                    fullWidth
                    variant="light"
                    justify="start"
                  >
                    Безопастность
                  </Button>
                </ButtonGroup>
              </Stack>
            </Tabs.Tab>
          </Stack>
          <Tabs.Tab value="main">
            <Tabs animationVariant="stack">
              <Tabs.Bridge saveTo={bottomApiTabs} />
              <Stack>
                <Group>
                  <Tabs.MutallyExclusive
                    animationVariant="scale"
                    when={['search']}
                  >
                    <ActionIcon
                      onClick={() => bottomApiTabs.current?.back()}
                      bdrs="xl"
                      variant="light"
                    >
                      <ArrowLeft />
                    </ActionIcon>
                    <TabsMenu
                      data={['settings']}
                      onClickMenuItem={(v) => topApiTabs.current?.push(v)}
                    />
                  </Tabs.MutallyExclusive>
                  <m.div layout="size" style={{ flex: 1 }}>
                    <SearchInput
                      onFocus={() => {
                        bottomApiTabs.current?.push('search');
                      }}
                    />
                  </m.div>
                </Group>
                <Tabs.Hide when={['search']}>
                  <Panel
                    data={[
                      {
                        value: 'main',
                        icon: <Home />,
                      },
                      {
                        value: 'contacts',
                        icon: <Users />,
                      },

                      {
                        value: 'profile',
                        icon: <User />,
                      },
                    ]}
                  />
                </Tabs.Hide>
              </Stack>
              <Box p={'xs'}>
                <Tabs.Tab value="search">
                  <SearchResultList />
                </Tabs.Tab>
                <Tabs.Tab value="main">Chats</Tabs.Tab>
                <Tabs.Tab value="contacts">
                  <ContactsList />
                </Tabs.Tab>
                <Tabs.Tab value="profile">
                  {profile ? (
                    <ProfileForCurrentUser profile={profile} />
                  ) : (
                    <SkeletonProfile />
                  )}
                </Tabs.Tab>
              </Box>
            </Tabs>
          </Tabs.Tab>
        </Box>
      </Tabs>
    </AppShellNavbar>
  );
};
