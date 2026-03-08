import { Alert, Box, Group, Skeleton, Text } from '@mantine/core';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Ban, CircleSlash } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { HorizontalUserCard } from '@/entities/user';
import { pagesMap } from '@/shared/lib/pages-map';
import { useBlacklist } from '../api/blacklist';
import { useSetUuidForRouter } from '@/shared/lib/use-get-uuid-from-router';
import { layoutAction } from '@/shared/lib/hooks/use-layout';

const SKELETON_ITEMS_COUNT = 10;

export const BlocklistManager = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const blacklist = useBlacklist();

  const users = useMemo(() => pagesMap(blacklist.data), [blacklist.data]);

  const setUuid = useSetUuidForRouter();
  const virtualizer = useVirtualizer({
    count: users.length + (blacklist.hasNextPage ? SKELETON_ITEMS_COUNT : 0),
    getScrollElement: () => viewportRef.current,
    estimateSize: () => 54,
    overscan: 20,
    getItemKey: (index) =>
      users[index]?.user_id ?? `skeleton-${index.toString()}`,
    onChange: ({ range }) => {
      if (
        range &&
        blacklist.hasNextPage &&
        !blacklist.isFetchingNextPage &&
        range.endIndex >= users.length - 1
      ) {
        void blacklist.fetchNextPage();
      }
    },
  });

  if (blacklist.isError) {
    return (
      <Alert icon={<Ban />} color="red">
        Failed to load blacklist
      </Alert>
    );
  }

  if (users.length === 0) {
    return <Alert icon={<CircleSlash />}>Blacklist is empty</Alert>;
  }

  return (
    <div
      ref={viewportRef}
      style={{
        height: '100%',
        minHeight: 0,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize().toString()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];
          const isSkeleton = virtualRow.index >= users.length;

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size.toString()}px`,
                transform: `translateY(${virtualRow.start.toString()}px)`,
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {isSkeleton ? (
                blacklist.hasNextPage ? (
                  <Box w="100%" px="xs">
                    <Skeleton h={36} radius="xl" />
                  </Box>
                ) : null
              ) : (
                <HorizontalUserCard
                  onClick={() => {
                    void setUuid(user.user_id);
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
