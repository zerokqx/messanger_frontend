import { Alert, Button } from '@mantine/core';
import { SideBarTaber } from '../../model/tab';
import { SessionActionContext, SessionList } from '@/entities/session';
import { SearchX } from 'lucide-react';
import { sortSessionsByIsCurrent } from '@/entities/session/lib/sortSessionsByIsCurrent';
import { useGetSessionsSuspenseQuery } from '@/entities/session/model/get-sessions.query';
import { useMemo } from 'react';
import type { SessionActionContextType } from '@/entities/session/model/session-action/context.types';
import { useSessionRevokeAll } from '@/features/session/revoke-all';
import {
  confirmModalForRevokeSession,
  useRevokeSession,
} from '@/features/session/revoke';
import { confirmModalForRevokeAllSessions } from '@/features/session/revoke-all/ui/modal.confirm';
import { useTranslation } from 'react-i18next';
import { mdl } from '@/features/session/revoke/ui/modal.confirm';

export const Sessions = () => {
  const { data: sessions } = useGetSessionsSuspenseQuery();
  const sessionsFiltred = sessions ? sortSessionsByIsCurrent(sessions) : [];
  const { mutateAsync: revokeSessionMutation } = useRevokeSession();
  const { mutateAsync: revokeSessionsAllMutation } = useSessionRevokeAll();
  const [t] = useTranslation('session');

  const actions = useMemo<SessionActionContextType>(
    () => ({
      onRevoke: (id) => {
        confirmModalForRevokeSession(() => {
          void revokeSessionMutation({ params: { path: { session_id: id } } });
        });
      },
      onRevokeAll() {
        confirmModalForRevokeAllSessions(() => {
          void revokeSessionsAllMutation({});
        });
      },
    }),
    [revokeSessionMutation, revokeSessionsAllMutation]
  );
  return (
    <SideBarTaber.Panel value="sessions">
      <SessionActionContext value={actions}>
        {sessionsFiltred.length === 0 && (
          <Alert icon={<SearchX />}>{t('sessions_not_found')}</Alert>
        )}

        <SessionList sessions={sessionsFiltred} />
      </SessionActionContext>
      <Button onClick={() => mdl()}>n</Button>
    </SideBarTaber.Panel>
  );
};
