import { ActionIcon, Box, Group, Stack } from '@mantine/core';
import { SearchInput, SearchResultList } from '@/features/search';
import { Tabs } from '@/shared/ui/query-tabs';
import { Panel } from '@/shared/ui/query-tabs/ui';
import * as m from 'motion/react-m';
import { useMe } from '@/entities/user/model/me.query';
import { SkeletonProfile } from '@/entities/user';
import { TabsMenu } from '@/widgets/tabs-menu';
import type { MainTabsProps } from './types.ts';
import { lazy, Suspense } from 'react';
import { SearchSkeleton } from '@/features/search/ui/search-result-skeleton.tsx';
import {
  historySearchActions,
  SearchHistoryList,
} from '@/features/search-history/index.ts';
import { useSearchUserQuery } from '@/features/search/api/use-search.ts';
import { mainPanel } from '@/widgets/navbar/config/main-tabs.tsx';
import { ArrowLeft } from 'lucide-react';
import {
  EditProfileSkeleton,
} from '@/features/edit-profile/index.ts';
import { SkeletonContactItem } from '@/entities/contact';


const ContactsList = lazy(() =>
  import('@/features/contact').then((module) => ({
    default: module.ContactsList,
  }))
);

const ProfileEditForm = lazy(() =>
  import('@/features/edit-profile/index.ts').then((module) => ({
    default: module.ProfileEditForm,
  }))
);

const ProfileForCurrentUser = lazy(() =>
  import('@/entities/user').then((module) => ({
    default: module.ProfileForCurrentUser,
  }))
);

export const MainTabs = ({ controller }: MainTabsProps) => {
  const bottomApiTabs = Tabs.useBridgeRef();
  const { data: profile } = useMe();

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
            <m.div layout="size" style={{ flex: 1 }}>
              <SearchInput
                onCommit={(v) => {
                  historySearchActions.doPush(v);
                }}
                onFocus={() => {
                  bottomApiTabs.current?.push('search');
                }}
              />
            </m.div>
          </Group>
          <Tabs.Hide when={['search']}>
            <Panel data={mainPanel} />
          </Tabs.Hide>
        </Stack>

        <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Tabs.Tab value="search">
            <Suspense fallback={<SearchSkeleton />}>
              <Stack gap={'xs'}>
                <SearchHistoryList
                  onClickItem={(v) => {
                    useSearchUserQuery.setState({ data: v });
                  }}
                />
                <SearchResultList />
              </Stack>
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="main">Chats</Tabs.Tab>
          <Tabs.Tab value="contacts">
            <Suspense fallback={<SkeletonContactItem size={60} />}>
              <ContactsList />
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="profile/edit">
            <Suspense fallback={<EditProfileSkeleton />}>
              <ProfileEditForm
                onSuccess={() => {
                  bottomApiTabs.current?.back();
                }}
              />
            </Suspense>
          </Tabs.Tab>
          <Tabs.Tab value="profile">
            <Suspense fallback={<SkeletonProfile />}>
              {profile ? (
                <ProfileForCurrentUser
                  withEdit
                  onEdit={() => {
                    bottomApiTabs.current?.push('profile/edit');
                  }}
                  profile={profile}
                />
              ) : (
                <SkeletonProfile />
              )}
            </Suspense>
          </Tabs.Tab>
        </Box>
      </Stack>
    </Tabs>
  );
};
