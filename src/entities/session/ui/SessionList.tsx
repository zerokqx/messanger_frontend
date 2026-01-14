import { Loader, Stack } from '@mantine/core';
import type { SessionListProps } from './SessionList.types';
import { map } from 'lodash';
import { SessionCurrentCard } from './session-card';
import { lazy, Suspense } from 'react';
const SessionCard = lazy(() =>
  import('./session-card').then((m) => ({
    default: m.SessionCard,
  }))
);
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
