import { sortSessionsByIsCurrent } from '@/entities/session/lib/sort-sessions-by-is-current';
import { SessionActionContext, SessionList } from '@/entities/session';
import type { SessionActionContextType } from '@/entities/session/model/session-action/context.types';
import { useGetSessionsSuspenseQuery } from '@/entities/session/model/get-sessions.query';
import { Alert, Center, Loader } from '@mantine/core';
import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRevokeSession, useSessionRevokeAll } from '../model';
import { confirmModalForRevokeSession } from './modal-revoke.confirm';
import { confirmModalForRevokeAllSessions } from './revoke-all.confirm';

export const SessionsTab = () => {
  const { data: sessions, isLoading } = useGetSessionsSuspenseQuery();
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
  return isLoading ? (
    <Center mih={400}>
      <Loader />
    </Center>
  ) : (
    <SessionActionContext value={actions}>
      {sessionsFiltred.length === 0 && (
        <Alert icon={<SearchX />}>{t('sessions_not_found')}</Alert>
      )}

      <SessionList sessions={sessionsFiltred} />
    </SessionActionContext>
  );
};
