import { Button } from '@mantine/core';
import { useSesionActionsContext } from '../../model';
import { Session } from '../Session';
import type { SessionNotCurrentProps } from '../SessionInstance.types';

export const SessionCard = ({ session }: SessionNotCurrentProps) => {
  const actions = useSesionActionsContext();
  return (
    <Session session={session}>
      <Session.Header>
        <Session.UserAgent />
        <Session.Ip />
      </Session.Header>
      <Session.Body>
        <Session.CreatedAt />
        <Session.LastRefresh />
      </Session.Body>
      <Session.Footer>
        <Button
          onClick={() => {
            actions.onRevoke(session.id);
          }}
        >
          Завершить сессию
        </Button>
      </Session.Footer>
    </Session>
  );
};
