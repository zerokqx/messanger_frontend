import { lazy, Suspense } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { Tabs } from '@/shared/ui/query-tabs';
import { ArrowLeft, Home, Lock, LogOut } from 'lucide-react';
import { InterfaceEditSkeleton } from '@/features/settings-interface';
import { useTranslation } from 'react-i18next';
import { SessionListSkeleton } from '@/features/session';
import type { RootTabsProps } from './types.ts';
import { rootTabs } from '@/widgets/navbar/config/root-tabs.tsx';
import { useLogout } from '@/entities/user/index.ts';
import { useMe } from '@/entities/user/model/me.query.ts';
import {
  SkeletonLayout,
  SkeletonsCardList,
} from '@/shared/ui/skeletons/index.ts';
import { ChangePasswordModal } from '@/features/change-password/index.ts';
import { useDisclosure } from '@mantine/hooks';
import { useResponsive } from '@/shared/lib/hooks/use-responsive/index.ts';
import { modals } from '@mantine/modals';
import { lightDark } from '@/shared/lib/light-dark/index.ts';

const SessionsTab = lazy(() =>
  import('@/features/session/ui/session-manager').then((module) => ({
    default: module.SessionsTab,
  }))
);

const AchievementsGrid = lazy(() =>
  import('@/entities/achievement').then((m) => ({
    default: m.AchievementsGrid,
  }))
);
const BlocklistManager = lazy(() =>
  import('@/features/blocklist-manager/ui/index.tsx').then((module) => ({
    default: module.BlocklistManager,
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

const ButtonLeft = Button.withProps({
  m: '0 auto',
  variant: 'subtle',
  bdrs: 'md',
  mih: 50,
  justify: 'start',
  fullWidth: true,
});
const RootTabsTitle = () => {
  const [t] = useTranslation('navbar');
  return (
    <Tabs.UseApi>
      {({ state }) => (
        <Text c="gray" size="sm" fw={'bold'}>
          {t(state.current)}
        </Text>
      )}
    </Tabs.UseApi>
  );
};

export const RootTabs = ({ children }: RootTabsProps) => {
  const { mobile } = useResponsive();
  const [t] = useTranslation(['navbar', 'button-labels']);
  const { data } = useMe();
  const logout = useLogout();
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <Tabs animationVariant="slide-x">
      <ChangePasswordModal
        fullScreen={mobile}
        onClose={close}
        opened={opened}
        transitionProps={{ transition: 'slide-right' }}
      />
      <Stack gap={'0'} h="100%" style={{ minHeight: 0 }}>
        <Tabs.Hide when={['main']} animationVariant="slide-y-up">
          <Group
            justify="space-between"
            bg={lightDark('gray.1', 'dark.8')}
            p={'xs'}
          >
            <Tabs.UseApi>
              {({ actions }) => (
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
            </Tabs.UseApi>
            <Suspense fallback={<Skeleton w={100} h={'1ch'} />}>
              <RootTabsTitle />
            </Suspense>
            <Tabs.UseApi>
              {({ actions }) => (
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
            </Tabs.UseApi>
          </Group>
        </Tabs.Hide>
        <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {children}
          <Tabs.Tab value="settings/sessions">
            <Box p={'xs'} miw={0} h={'100%'}>
              <Suspense fallback={<SessionListSkeleton />}>
                <SessionsTab />
              </Suspense>
            </Box>
          </Tabs.Tab>
          <Tabs.Tab value="settings/interface">
            <Box h="100%" p={'0'} style={{ overflowY: 'auto' }}>
              <Suspense fallback={<InterfaceEditSkeleton />}>
                <InterfaceEditTab />
              </Suspense>
            </Box>
          </Tabs.Tab>

          <Tabs.Tab value="settings/permissions">
            <Box h={'100%'} p={'0'} style={{ overflow: 'auto' }}>
              <Suspense fallback={<SkeletonLayout />}>
                <ProfilePermissions permissions={data} />
              </Suspense>
            </Box>
          </Tabs.Tab>
          <Tabs.Tab value="settings">
            <Box p={'0'}>
              <Tabs.UseApi>
                {({ actions }) => (
                  <>
                    {rootTabs.map(({ value, leftSection }) => (
                      <Box key={value} p="xs">
                        <ButtonLeft
                          onClick={() => {
                            actions.push(value);
                          }}
                          leftSection={leftSection}
                        >
                          {t(value)}
                        </ButtonLeft>
                      </Box>
                    ))}
                    <Box p="xs">
                      <ButtonLeft leftSection={<Lock />} onClick={toggle}>
                        {t('change-password')}
                      </ButtonLeft>
                    </Box>
                    <Box p="xs">
                      <ButtonLeft
                        onClick={() => {
                          modals.openConfirmModal({
                            fullScreen: mobile,
                            children: t('navbar:submit-logout-text'),
                            cancelProps: {
                              children: t('button-labels:back'),
                            },
                            confirmProps: {
                              color: 'deepRed',
                              children: t('button-labels:exit'),
                              rightSection: <LogOut />,
                            },
                            onConfirm: () => {
                              void logout();
                            },
                          });
                        }}
                        color="red"
                        leftSection={<LogOut />}
                      >
                        {t('button-labels:exit')}
                      </ButtonLeft>
                    </Box>
                  </>
                )}
              </Tabs.UseApi>
            </Box>
          </Tabs.Tab>
          <Tabs.Tab value="block-users">
            <Suspense fallback={<SkeletonLayout />}>
              <Box p={'xs'} h={'100%'} miw={0}>
                <BlocklistManager />
              </Box>
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="achievements">
            <Box p={'xs'} mih={0} h={'100%'}>
              <Suspense
                fallback={
                  <Stack>
                    <Skeleton h={62} w={'100%'} />
                    <SkeletonsCardList size={4} h={170} />
                  </Stack>
                }
              >
                <AchievementsGrid />
              </Suspense>
            </Box>
          </Tabs.Tab>
        </Box>
      </Stack>
    </Tabs>
  );
};
