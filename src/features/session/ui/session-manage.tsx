import { sortSessionsByIsCurrent } from '@/entities/session/lib/sort-sessions-by-is-current';
import { SessionActionContext, SessionList } from '@/entities/session';
import type { SessionActionContextType } from '@/entities/session/model/session-action/context.types';
import { useGetSessionsSuspenseQuery } from '@/entities/session/model/get-sessions.query';
import { useRevokeSession, useSessionRevokeAll } from '../model';
import { confirmModalForRevokeAllSessions } from './revoke-all.confirm';
import { confirmModalForRevokeSession } from './modal-revoke.confirm';
import { Alert } from '@mantine/core';
import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const SessionManage = () => {
  const { data: sessions, } = useGetSessionsSuspenseQuery();
  const sessionsFiltred = sessions.length !== 0 ? sortSessionsByIsCurrent(sessions) : [];
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
    <SessionActionContext value={actions}>
      {sessionsFiltred.length === 0 && (
        <Alert icon={<SearchX />}>{t('sessions_not_found')}</Alert>
      )}

      <SessionList sessions={sessionsFiltred} />
    </SessionActionContext>
  );
};
