import { Stack } from '@mantine/core';
import type { SessionListProps } from './SessionList.types';
import { map } from 'lodash';
import { Session } from './Session';
import { SessionCurrent } from './SessionCurrent';
import { SessionCard } from './SessionCard';

export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <Stack>
      {map(sessions, (session) => {
        if (session.is_current) {
          return <SessionCurrent session={session} />;
        }
        return <SessionCard session={session} />;
      })}
    </Stack>
  );
};
