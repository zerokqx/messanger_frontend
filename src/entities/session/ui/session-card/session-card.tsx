import { Button } from '@mantine/core';
import { useSesionActionsContext } from '../../model';
import { Session } from '../Session';
import type { SessionNotCurrentProps } from '../SessionInstance.types';
import { useTranslation } from 'react-i18next';

export const SessionCard = ({ session }: SessionNotCurrentProps) => {
  const actions = useSesionActionsContext();
  const [t] = useTranslation('session');
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
          variant="light"
          onClick={() => {
            actions.onRevoke(session.id);
          }}
        >
          {t('close_session')}
        </Button>
      </Session.Footer>
    </Session>
  );
};
