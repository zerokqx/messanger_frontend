import { Stack } from '@mantine/core';
import type { SessionListProps } from './SessionList.types';
import { map } from 'lodash';
import { SessionCard, SessionCurrentCard } from './session-card';

export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <Stack>
      {map(sessions, (session) => {
        if (session.is_current) {
          return <SessionCurrentCard session={session} />;
        }
        return <SessionCard session={session} />;
      })}
    </Stack>
  );
};
