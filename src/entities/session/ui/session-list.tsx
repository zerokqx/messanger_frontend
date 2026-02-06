import { Box, Loader, Stack } from '@mantine/core';
import { map } from 'lodash';
import { SessionCurrentCard } from './session-card';
import { lazy, Suspense, useRef } from 'react';
import type { SessionData } from './session.types';
import { useVirtualizer } from '@tanstack/react-virtual';
const SessionCard = lazy(() =>
  import('./session-card').then((m) => ({
    default: m.SessionCard,
  }))
);

export interface SessionListProps {
  sessions: SessionData[];
}

export const SessionList = ({ sessions }: SessionListProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: sessions.length,
    getScrollElement: () => parentRef.current,
    overscan: 2,
    estimateSize: (index) => (sessions[index]?.is_current ? 270 : 200),
  });

  const items = rowVirtualizer.getVirtualItems();

  return (
    <Stack ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <Box h={rowVirtualizer.getTotalSize()} pos="relative">
        {map(items, (virtualItem) => {
          const session = sessions[virtualItem.index];
          if (!session) return null;

          return (
            <Box
              key={session.id ?? virtualItem.key}
              pos="absolute"
              w="100%"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {session.is_current ? (
                <SessionCurrentCard session={session} />
              ) : (
                <Suspense fallback={<Loader />}>
                  <SessionCard session={session} />
                </Suspense>
              )}
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};
