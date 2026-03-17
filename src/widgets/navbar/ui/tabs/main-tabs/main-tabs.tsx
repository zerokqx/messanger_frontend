import { ActionIcon, Box, factory, getWithProps, Group, Stack } from '@mantine/core';

import * as m from 'motion/react-m';
import { ErrorBoundary } from 'react-error-boundary';
import { SearchInput } from '@/features/search';
import { Tabs } from '@/shared/ui/query-tabs';
import { Panel } from '@/shared/ui/query-tabs/ui';
import type { MainTabsProps } from './types.ts';
import { lazy, Suspense } from 'react';
import { historySearchActions } from '@/features/search-history/index.ts';
import {
  useSearch,
  useSearchUserQuery,
} from '@/features/search/api/use-search.ts';
import { mainPanel } from '@/widgets/navbar/config/main-tabs.tsx';
import { ArrowLeft, RefreshCcw, Settings, User } from 'lucide-react';
import { SkeletonLayout } from '@/shared/ui/skeletons/index.ts';
import { TabsMenu } from './ui/menu.tsx';
import { ErrorAlert } from '@/shared/ui/errors-boundary/index.ts';
import { SkeletonProfile } from '@/entities/user/index.ts';
import { ChatCard } from '@/entities/chat';
import type { ChatListItem } from '@/entities/chat';
import { GroupedList } from '@/shared/ui/grouped-list/ui/grouped-list.tsx';
import { RoundedContainerStack } from '@/shared/ui/boxes/index.ts';
import { motion } from 'motion/react';

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

const MOCK_CHAT_ITEM: ChatListItem = {
  chat_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  chat_type: 'self',
  chat_data: {
    additionalProp1: {},
  },
  last_message: {
    message_id: 0,
    message_type: ['text'],
    forward_metadata: {
      forward_type: 'chat_private_messages',
      forward_sender_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      forward_message_id: 0,
      forward_chat_data: 'string',
    },
    chat_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender_data: 'string',
    content: 'Пример последнего сообщения для превью карточки',
    media_link: 'string',
    is_viewed: true,
    viewed_at: '2026-03-13T23:32:25.848Z',
    created_at: '2026-03-13T23:32:25.848Z',
    updated_at: '2026-03-13T23:32:25.848Z',
  },
  created_at: '2026-03-13T23:32:25.848Z',
  unread_count: 3,
};



export const MainTabs = ({ controller }: MainTabsProps) => {
  const { refetch } = useSearch();
  const bottomApiTabs = Tabs.useBridgeRef();
  return (
    <Tabs animationVariant="slide-x">
      <Tabs.Bridge ref={bottomApiTabs} />
      <Stack h="inherit">
        <m.div layout="size">
          <RoundedContainerStack bd="none" bdrs={'0'}>
            <Group>
              <Tabs.MutallyExclusive
                animationVariant="scale"
                animationClosed="rotate"
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
                  onClickMenuItem={(value) => {
                    controller.current?.push(value);
                  }}
                />
              </Tabs.MutallyExclusive>
              <m.div
                layout
                style={{
                  flex: 1,
                }}
              >
                <SearchInput
                  key={'input-search'}
                  onCommit={(v) => {
                    historySearchActions.doPush(v);
                  }}
                  onFocus={() => {
                    bottomApiTabs.current?.push('search');
                  }}
                />
              </m.div>
              <Tabs.Show when={['search']} animationVariant="slide-y-up">
                <ActionIcon
                  onClick={() => {
                    void refetch();
                  }}
                  variant="light"
                  color="gray"
                >
                  <RefreshCcw />
                </ActionIcon>
              </Tabs.Show>
            </Group>
            <Tabs.Hide animationVariant="scale" when={['search']}>
              <Panel data={mainPanel} />
            </Tabs.Hide>
          </RoundedContainerStack>
        </m.div>

        <Box style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Tabs.Tab value="search" animationVariant="stack">
            <Box p={'xs'} mih={0} h={'100%'}>
              <ErrorBoundary FallbackComponent={ErrorAlert}>
                <Suspense fallback={<SkeletonLayout />}>
                  <SearchTab
                    onClickHistoryItem={(value) => {
                      useSearchUserQuery.setState({ data: value });
                    }}
                  />
                </Suspense>
              </ErrorBoundary>
            </Box>
          </Tabs.Tab>
          <Tabs.Tab  value="main">
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <Stack px="xs" pb="xs">
                <ChatCard chat={MOCK_CHAT_ITEM} title="testlogin" />
                <ChatCard chat={MOCK_CHAT_ITEM} title="testlogin" />
                <ChatCard chat={MOCK_CHAT_ITEM} title="testlogin" />
              </Stack>
            </ErrorBoundary>
          </Tabs.Tab>
          <Tabs.Tab value="contacts">
            <Box p="xs" h="100%" mih={0}>
              <ErrorBoundary FallbackComponent={ErrorAlert}>
                <Suspense fallback={<SkeletonLayout />}>
                  <ContactsTab />
                </Suspense>
              </ErrorBoundary>
            </Box>
          </Tabs.Tab>
          <Tabs.Tab animationVariant='slide-y-up' value="profile/edit">
            <Box p={'xs'}>
              <ErrorBoundary FallbackComponent={ErrorAlert}>
                <Suspense fallback={<SkeletonLayout />}>
                  <ProfileEditTab
                    onSuccess={() => {
                      bottomApiTabs.current?.back();
                    }}
                  />
                </Suspense>
              </ErrorBoundary>
            </Box>
          </Tabs.Tab>
          <Tabs.Tab value="profile">
            <Box p={'xs'}>
              <ErrorBoundary FallbackComponent={ErrorAlert}>
                <Suspense fallback={<SkeletonProfile />}>
                  <ProfileTab
                    onEdit={() => {
                      bottomApiTabs.current?.push('profile/edit');
                    }}
                  />
                </Suspense>
              </ErrorBoundary>
            </Box>
          </Tabs.Tab>
        </Box>
      </Stack>
    </Tabs>
  );
};
