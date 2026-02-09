import { sortSessionsByIsCurrent } from '@/entities/session/lib/sort-sessions-by-is-current';
import { SessionActionContext, SessionList } from '@/entities/session';
import type { SessionActionContextType } from '@/entities/session/model/session-action/context.types';
import { useGetSessionsSuspenseQuery } from '@/entities/session/model/get-sessions.query';
import { SideBarTaber } from '@/widgets/side-bar/model/tab';
import { useSessionRevokeAll } from '@/features/session/revoke-all';
import {
  confirmModalForRevokeAllSessions,
} from '@/features/session/revoke-all/ui/modal.confirm';
import {
  confirmModalForRevokeSession,
  useRevokeSession,
} from '@/features/session/revoke';
import { Alert, Center, Loader } from '@mantine/core';
import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
  return (
    <SideBarTaber.Panel value="sessions">
      {isLoading ? (
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
      )}
    </SideBarTaber.Panel>
  );
};
