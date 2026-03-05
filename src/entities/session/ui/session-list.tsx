import { Box, Stack } from '@mantine/core';
import { map } from 'lodash';
import { SessionCard, SessionCurrentCard } from './session-card';
import { useRef } from 'react';
import type { SessionData } from './session.types';
import { useVirtualizer } from '@tanstack/react-virtual';

interface SessionListProps {
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
    <Stack ref={parentRef} style={{ overflow: 'auto', height: '100%' }}>
      <Box h={rowVirtualizer.getTotalSize()} pos="relative">
        {map(items, (virtualItem) => {
          const session = sessions[virtualItem.index];
          return (
            <Box
              key={session.id}
              pos="absolute"
              w="100%"
              style={{
                transform: `translateY(${virtualItem.start.toString()}px)`,
              }}
            >
              {session.is_current ? (
                <SessionCurrentCard session={session} />
              ) : (
                <SessionCard session={session} />
              )}
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};
