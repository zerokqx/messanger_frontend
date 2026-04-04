import { Box, Center, Stack, Text } from '@mantine/core';
import { SessionCard, SessionCurrentCard } from './session-card';
import type { SessionData } from './session.types';
import { Virtuoso } from 'react-virtuoso';
import { useMemo } from 'react';
import { createThrottledVibrationHandler } from '@/shared/lib/vibration';
import { useTranslation } from 'react-i18next';

interface SessionListProps {
  sessions: SessionData[];
}

const BoxItem = (props: object) => <Box pb="md" {...props} />;

export const SessionList = ({ sessions }: SessionListProps) => {
  const [t] = useTranslation('session');
  const handleScroll = useMemo(
    () =>
      createThrottledVibrationHandler({
        intervalMs: 100,
        durationMs: 8,
      }),
    []
  );

  return (
    <Stack h="100%" style={{ minHeight: 0 }}>
      <Virtuoso
        style={{ height: '100%', minHeight: 0 }}
        components={{
          Item: BoxItem,
        }}
        totalCount={sessions.length}
        computeItemKey={(index) =>
          sessions[index]?.id ?? `session-${index.toString()}`
        }
        onScroll={handleScroll}
        increaseViewportBy={240}
        itemContent={(index) => {
          const session = sessions[index];

          if (session.is_current) {
            return (
              <SessionCurrentCard
                singleSession={sessions.length === 1}
                session={session}
              />
            );
          }

          return <SessionCard session={session} />;
        }}
      />
      {sessions.length === 1 && sessions[0].is_current && (
        <Center>
          <Text opacity={0.6}>{t('only_current_session')}</Text>
        </Center>
      )}
    </Stack>
  );
};
