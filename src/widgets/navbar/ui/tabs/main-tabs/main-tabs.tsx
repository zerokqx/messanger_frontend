import { ActionIcon, Box, Group, Stack } from '@mantine/core';
import { SearchInput } from '@/features/search';
import { Tabs } from '@/shared/ui/query-tabs';
import { Panel } from '@/shared/ui/query-tabs/ui';
import * as m from 'motion/react-m';
import { SkeletonProfile } from '@/entities/user';
import { TabsMenu } from '@/widgets/tabs-menu';
import type { MainTabsProps } from './types.ts';
import { lazy, Suspense } from 'react';
import { historySearchActions } from '@/features/search-history/index.ts';
import { useSearchUserQuery } from '@/features/search/api/use-search.ts';
import {
  mainPanel,
} from '@/widgets/navbar/config/main-tabs.tsx';
import { ArrowLeft } from 'lucide-react';
import { EditProfileSkeleton } from '@/features/edit-profile/index.ts';
import { SkeletonLayout } from '@/shared/ui/skeletons/index.ts';

const SearchTab = lazy(() =>
  import('./ui/search-tab.tsx').then((module) => ({
    default: module.SearchTabContent,
  }))
);

export const ContactsTab = lazy(() =>
  import('./ui/contacts-tab.tsx').then((module) => ({
    default: module.ContactsTabContent,
  }))
);

const ProfileEditTab = lazy(() =>
  import('./ui/profile-edit-tab.tsx').then((module) => ({
    default: module.ProfileEditTabContent,
  }))
);

const ProfileTab = lazy(() =>
  import('./ui/profile-tab.tsx').then((module) => ({
    default: module.ProfileTabContent,
  }))
);

export const MainTabs = ({ controller }: MainTabsProps) => {
  const bottomApiTabs = Tabs.useBridgeRef();
  return (
    <Tabs animationVariant="stack">
      <Tabs.Bridge saveTo={bottomApiTabs} />
      <Stack h="inherit">
        <Stack m="xs">
          <Group>
            <Tabs.MutallyExclusive animationVariant="scale" when={['search']}>
              <ActionIcon
                onClick={() => bottomApiTabs.current?.back()}
                bdrs="xl"
                variant="light"
              >
                <ArrowLeft />
              </ActionIcon>
              <TabsMenu
                data={['settings']}
                onClickMenuItem={(value) => {
                  controller.current?.push(value);
                }}
              />
            </Tabs.MutallyExclusive>
              <SearchInput
                onCommit={(v) => {
                  historySearchActions.doPush(v);
                }}
                onFocus={() => {
                  bottomApiTabs.current?.push('search');
                }}
              />
          </Group>
          <Tabs.Hide when={['search']}>
            <Panel data={mainPanel} />
          </Tabs.Hide>
        </Stack>

        <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Tabs.Tab value="search">
            <Suspense fallback={<SkeletonLayout />}>
              <SearchTab
                onClickHistoryItem={(value) => {
                  useSearchUserQuery.setState({ data: value });
                }}
              />
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="main">Chats</Tabs.Tab>
          <Tabs.Tab value="contacts">
            <Suspense fallback={<SkeletonLayout />}>
              <ContactsTab />
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="profile/edit">
            <Suspense fallback={<EditProfileSkeleton />}>
              <ProfileEditTab
                onSuccess={() => {
                  bottomApiTabs.current?.back();
                }}
              />
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="profile">
            <Suspense fallback={<SkeletonProfile />}>
              <ProfileTab
                onEdit={() => {
                  bottomApiTabs.current?.push('profile/edit');
                }}
              />
            </Suspense>
          </Tabs.Tab>
        </Box>
      </Stack>
    </Tabs>
  );
};
