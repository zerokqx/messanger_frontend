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
import { ArrowLeft, Home, Lock, LogOut } from 'lucide-react';
import { InterfaceEditSkeleton } from '@/features/settings-interface';
import { useTranslation } from 'react-i18next';
import { SessionListSkeleton } from '@/features/session';
import type { RootTabsProps } from './types.ts';
import { rootTabs } from '@/widgets/navbar/config/root-tabs.tsx';
import { useLogout } from '@/entities/user/index.ts';
import { useMe } from '@/entities/user/model/me.query.ts';
import { SkeletonLayout } from '@/shared/ui/skeletons/index.ts';
import { ChangePasswordModal } from '@/features/change-password/index.ts';
import { useDisclosure } from '@mantine/hooks';
import { useResponsive } from '@/shared/lib/hooks/use-responsive/index.ts';
import { modals } from '@mantine/modals';

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

const ButtonLeft = Button.withProps({
  m: '0 auto',
  variant: 'light',
  justify: 'start',
  fullWidth: true,
});
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
  const { mobile } = useResponsive();
  const { colorScheme } = useMantineColorScheme();
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
          <Suspense fallback={<SkeletonLayout />}>
            <ProfilePermissions permissions={data} />
          </Suspense>
        </Tabs.Tab>
        <Tabs.Tab value="settings">
          <Stack>
            <Tabs.UseApi
              children={({ actions }) => (
                <>
                  {rootTabs.map(({ value, leftSection }) => (
                    <ButtonLeft
                      key={value}
                      onClick={() => {
                        actions.push(value);
                      }}
                      leftSection={leftSection}
                    >
                      {t(value)}
                    </ButtonLeft>
                  ))}
                  <ButtonLeft leftSection={<Lock />} onClick={toggle}>
                    {t('change-password')}
                  </ButtonLeft>
                  <ButtonLeft
                    onClick={() => {
                      modals.openConfirmModal({
                        fullScreen: mobile,
                        children:t("navbar:submit-logout-text"),
                        cancelProps:{
                          children:t('button-labels:back')
                        },
                        confirmProps:{
                          color:'deepRed',
                          children:t('button-labels:exit'),
                          rightSection: <LogOut/>
                        },
                        onConfirm: () => {
                          void logout();
                        },
                      });
                    }}
                    variant="outline"
                    color="red"
                    leftSection={<LogOut />}
                  >
                    {t('button-labels:exit')}
                  </ButtonLeft>
                </>
              )}
            />
          </Stack>
        </Tabs.Tab>
      </Stack>
    </Tabs>
  );
};
