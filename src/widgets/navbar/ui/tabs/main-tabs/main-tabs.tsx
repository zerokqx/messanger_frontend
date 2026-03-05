import { ActionIcon, Box, Button, Group, Input, Stack } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchInput } from '@/features/search';
import { Tabs } from '@/shared/ui/query-tabs';
import { Panel } from '@/shared/ui/query-tabs/ui';
import type { MainTabsProps } from './types.ts';
import { lazy, Suspense, useState} from 'react';
import { historySearchActions } from '@/features/search-history/index.ts';
import { useSearchUserQuery } from '@/features/search/api/use-search.ts';
import { mainPanel } from '@/widgets/navbar/config/main-tabs.tsx';
import { ArrowLeft } from 'lucide-react';
import {
  SkeletonLayout,
  SkeletonsCardList,
} from '@/shared/ui/skeletons/index.ts';
import { socket } from '@/shared/api/socket.ts';
import { TabsMenu } from './ui/menu.tsx';
import { ErrorAlert } from '@/shared/ui/errors-boundary/index.ts';
import { SkeletonProfile } from '@/entities/user/index.ts';

const SearchTab = lazy(() =>
  import('./ui/search-tab.tsx').then((module) => ({
    default: module.SearchTabContent,
  }))
);

const ContactsTab = lazy(() =>
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
  const [inp, setInp] = useState('');
  const bottomApiTabs = Tabs.useBridgeRef();
  return (
    <Tabs animationVariant="stack">
      <Tabs.Bridge ref={bottomApiTabs} />
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
                onClickMenuItem={(value) => {
                  controller.current?.push(value);
                }}
              />
            </Tabs.MutallyExclusive>
            <SearchInput
              flex={1}
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
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <Suspense fallback={<SkeletonLayout />}>
                <SearchTab
                  onClickHistoryItem={(value) => {
                    useSearchUserQuery.setState({ data: value });
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </Tabs.Tab>
          <Tabs.Tab value="main">
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <Input
                onChange={(v) => {
                  setInp(v.currentTarget.value);
                }}
              />
              <Button
                onClick={() => {
                  socket.emit('client_message', {
                    data: inp,
                    user_id: 'a92e4c8c-d4e4-4d90-acda-253c1e0abe25',
                  });
                }}
              >
                Send
              </Button>
            </ErrorBoundary>
          </Tabs.Tab>
          <Tabs.Tab value="contacts">
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <Suspense fallback={<SkeletonsCardList size={10} />}>
                <ContactsTab />
              </Suspense>
            </ErrorBoundary>
          </Tabs.Tab>
          <Tabs.Tab value="profile/edit">
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <Suspense fallback={<SkeletonLayout />}>
                <ProfileEditTab />
              </Suspense>
            </ErrorBoundary>
          </Tabs.Tab>
          <Tabs.Tab value="profile">
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <Suspense fallback={<SkeletonProfile />}>
                <ProfileTab
                  onEdit={() => {
                    bottomApiTabs.current?.push('profile/edit');
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </Tabs.Tab>
        </Box>
      </Stack>
    </Tabs>
  );
};
