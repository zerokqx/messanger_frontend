import { Loader, Stack } from '@mantine/core';
import { map } from 'lodash';
import { SessionCurrentCard } from './session-card';
import { lazy, Suspense } from 'react';
import type { SessionData } from './session.types';
const SessionCard = lazy(() =>
  import('./session-card').then((m) => ({
    default: m.SessionCard,
  }))
);

export interface SessionListProps {
  sessions: SessionData[];
}

export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <Stack>
      {map(sessions, (session) =>
        session.is_current ? (
          <SessionCurrentCard session={session} />
        ) : (
          <Suspense fallback={<Loader />}>
            <SessionCard session={session} />
          </Suspense>
        )
      )}
    </Stack>
  );
};
