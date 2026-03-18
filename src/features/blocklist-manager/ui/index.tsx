import { Alert, Box, Group, Skeleton, Text } from '@mantine/core';
import { Ban, CircleSlash } from 'lucide-react';
import { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { HorizontalUserCard } from '@/entities/user';
import { pagesMap } from '@/shared/lib/pages-map';
import { useBlacklist } from '../api/blacklist';
import { layoutAction } from '@/shared/lib/hooks/use-layout';
import { useTranslation } from 'react-i18next';
import { useHash } from '@mantine/hooks';

const SKELETON_ITEMS_COUNT = 10;

export const BlocklistManager = () => {
  const blacklist = useBlacklist();

  const users = useMemo(() => pagesMap(blacklist.data), [blacklist.data]);

  const [t] = useTranslation('lists');
  const [, setHash] = useHash();
  const totalCount =
    users.length + (blacklist.hasNextPage ? SKELETON_ITEMS_COUNT : 0);

  if (blacklist.isError) {
    return (
      <Alert icon={<Ban />} color="red">
        {t('error')}
      </Alert>
    );
  }

  if (users.length === 0) {
    return <Alert icon={<CircleSlash />}>{t('empty')}</Alert>;
  }

  return (
    <Virtuoso
      data={users}
      totalCount={totalCount}
      endReached={() => {
        if (blacklist.hasNextPage && !blacklist.isFetchingNextPage) {
          void blacklist.fetchNextPage();
        }
      }}
      computeItemKey={(index) =>
        users[index]?.user_id ?? `skeleton-${index.toString()}`
      }
      increaseViewportBy={200}
      style={{
        height: '100%',
        minHeight: 0,
      }}
      itemContent={(index, user) => {
        const isSkeleton = index >= users.length;

        if (isSkeleton) {
          return blacklist.hasNextPage ? (
            <Box w="100%" px="xs" py={4}>
              <Skeleton h={36} radius="xl" />
            </Box>
          ) : null;
        }

        return (
          <HorizontalUserCard
            onClick={() => {
              setHash(user.user_id);
              layoutAction.doSetAside(true);
            }}
            value={user}
            w="100%"
            justify="space-between"
          >
            <Group>
              <HorizontalUserCard.Avatar />
              <HorizontalUserCard.Login />
            </Group>
            <Text size="xs" c="dimmed">
              {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </HorizontalUserCard>
        );
      }}
    />
  );
};
