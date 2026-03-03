import { lazy, Suspense } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Skeleton,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { ArrowLeft, Home, LogOut } from 'lucide-react';
import { InterfaceEditSkeleton } from '@/features/settings-interface';
import { useTranslation } from 'react-i18next';
import { SessionListSkeleton } from '@/features/session';
import type { RootTabsProps } from './types.ts';
import { rootTabs } from '@/widgets/navbar/config/root-tabs.tsx';
import { useLogout } from '@/entities/user/index.ts';
import { useMe } from '@/entities/user/model/me.query.ts';
import { SkeletonLayout, SkeletonsCardList } from '@/shared/ui/skeletons/index.ts';

const MotionStagerList = lazy(() =>
  import('@/shared/ui/motion-stager-list').then((m) => ({
    default: m.MotionStagerList,
  }))
);

const StagerItem = lazy(() =>
  import('@/shared/ui/motion-stager-list').then((m) => ({
    default: m.StagerItem,
  }))
);

const SessionsTab = lazy(() =>
  import('@/features/session/ui/session-manager').then((module) => ({
    default: module.SessionsTab,
  }))
);

const InterfaceEditTab = lazy(() =>
  import('@/features/settings-interface/ui/edit').then((module) => ({
    default: module.InterfaceEditTab,
  }))
);

const ProfilePermissions = lazy(() =>
  import('@/features/profile-permissions/ui/profile-permissions.tsx').then(
    (module) => ({
      default: module.ProfilePermissions,
    })
  )
);

const RootTabsTitle = () => {
  const [t] = useTranslation('navbar');
  return (
    <Tabs.UseApi
      children={({ state }) => (
        <Text c="gray" size="sm" fw={'bold'}>
          {t(state.current)}
        </Text>
      )}
    />
  );
};

export const RootTabs = ({ children }: RootTabsProps) => {
  const { colorScheme } = useMantineColorScheme();
  const [t] = useTranslation(['navbar', 'button-labels']);
  const { data } = useMe();
  const logout = useLogout();

  return (
    <Tabs animationVariant="slide-x">
      <Stack h="100%" p={'xs'} style={{ minHeight: 0 }}>
        <Tabs.Hide when={['main']} animationVariant="slide-y-up">
          <Group
            justify="space-between"
            bg={colorScheme === 'dark' ? 'dark.8' : 'gray.1'}
            p={'xs'}
            bdrs={'xl'}
          >
            <Tabs.UseApi
              children={({ actions }) => (
                <ActionIcon
                  onClick={() => {
                    actions.back();
                  }}
                  bdrs="xl"
                  variant="light"
                >
                  <ArrowLeft />
                </ActionIcon>
              )}
            />
            <Suspense fallback={<Skeleton w={100} h={'1ch'} />}>
              <RootTabsTitle />
            </Suspense>
            <Tabs.UseApi
              children={({ actions }) => (
                <ActionIcon
                  onClick={() => {
                    actions.reset('main');
                  }}
                  bdrs="xl"
                  variant="light"
                >
                  <Home />
                </ActionIcon>
              )}
            />
          </Group>
        </Tabs.Hide>
        <Tabs.Tab value="settings/sessions">
          <Suspense fallback={<SessionListSkeleton />}>
            <SessionsTab />
          </Suspense>
        </Tabs.Tab>
        {children}
        <Tabs.Tab value="settings/interface">
          <Suspense fallback={<InterfaceEditSkeleton />}>
            <InterfaceEditTab />
          </Suspense>
        </Tabs.Tab>

        <Tabs.Tab value="settings/permissions">
            <Suspense fallback={<SkeletonLayout/>}>
              <ProfilePermissions permissions={data} />
            </Suspense>
        </Tabs.Tab>
        <Tabs.Tab value="settings">
          <Stack>
            <Tabs.UseApi
              children={({ actions }) => (
                <Suspense fallback={<SkeletonsCardList size={4} h={40} />}>
                  <MotionStagerList
                    variants={{
                      item: {
                        hidden: { scaleY: 0.5 },
                        visible: {
                          scaleY: 1,
                        },
                      },
                    }}
                  >
                    {rootTabs.map(({ value, leftSection }) => (
                      <StagerItem key={value}>
                        <Button
                          onClick={() => {
                            actions.push(value);
                          }}
                          leftSection={leftSection}
                          m={'0 auto'}
                          fullWidth
                          variant="light"
                          justify="start"
                        >
                          {t(value)}
                        </Button>
                      </StagerItem>
                    ))}
                    <Button
                      onClick={() => {
                        void logout();
                      }}
                      color="red"
                      leftSection={<LogOut />}
                      variant="subtle"
                      justify="start"
                    >
                      Выйти
                    </Button>
                  </MotionStagerList>
                </Suspense>
              )}
            />
          </Stack>
        </Tabs.Tab>
      </Stack>
    </Tabs>
  );
};
