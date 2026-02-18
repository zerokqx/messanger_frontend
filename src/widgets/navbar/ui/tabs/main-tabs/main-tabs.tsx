import { ActionIcon, Box, Group, Stack } from '@mantine/core';
import {
  SearchInput,
  SearchResultList,
  useSearchStore,
} from '@/features/search';
import { Tabs } from '@/shared/ui/query-tabs';
import { Panel } from '@/shared/ui/query-tabs/ui';
import { ArrowLeft, Home, User, Users } from 'lucide-react';
import { ContactsList } from '@/features/contact';

import * as m from 'motion/react-m';
import { useMe } from '@/entities/user/model/me.query';
import { ProfileForCurrentUser, SkeletonProfile } from '@/entities/user';
import { TabsMenu } from '@/widgets/tabs-menu';
import type { MainTabsProps } from './types.ts';
import { Suspense } from 'react';
import { SearchSkeleton } from '@/features/search/ui/search-result-skeleton.tsx';
import {
  historySearchActions,
  SearchHistoryList,
} from '@/features/search-history/index.ts';
import { useSearchUserQuery } from '@/features/search/api/use-search.ts';

export const MainTabs = ({ controller }: MainTabsProps) => {
  const bottomApiTabs = Tabs.useBridgeRef();
  const { data: profile } = useMe();
  const users = useSearchStore((s) => s.data.length);

  return (
    <Tabs animationVariant="blur-slide-x">
      <Tabs.Bridge saveTo={bottomApiTabs} />
      <Stack>
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
          <ContactsList />
        </Tabs.Tab>
        <Tabs.Tab value="profile">
          <Suspense fallback={<SkeletonProfile />}>
            {profile ? (
              <ProfileForCurrentUser profile={profile} />
            ) : (
              <SkeletonProfile />
            )}
          </Suspense>
        </Tabs.Tab>
      </Box>
    </Tabs>
  );
};
