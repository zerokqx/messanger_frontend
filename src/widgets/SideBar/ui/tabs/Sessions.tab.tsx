import { Alert } from '@mantine/core';
import { SideBarTaber } from '../../model/tab';
import { SessionActionContext, SessionList } from '@/entities/session';
import { SearchX } from 'lucide-react';
import { sortSessionsByIsCurrent } from '@/entities/session/lib/sortSessionsByIsCurrent';
import { useGetSessionsSuspenseQuery } from '@/entities/session/model/get-sessions.query';
import { ModalRevoke } from '@/features/session/revoke/ui/ModalRevoke';
import { useDisclosure, useToggle } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import type { SessionActionContextType } from '@/entities/session/model/session-action/context.types';
import { RevokeAllModal } from '@/features/session/revoke-all';

export const Sessions = () => {
  const { data: sessions, isLoading } = useGetSessionsSuspenseQuery();
  const sessionsFiltred = sessions ? sortSessionsByIsCurrent(sessions) : [];
  const [revokeOpened, revoke] = useDisclosure();
  const [revokeAllOpened, revokeAll] = useDisclosure();
  const [id, setId] = useState('');

  console.log(sessionsFiltred);

  const actions = useMemo<SessionActionContextType>(() => ({
    onRevoke: (id) => {
      setId(id);
      revoke.open();
    },
    onRevokeAll() {
      revokeAll.open();
    },
  }));
  return (
    <SideBarTaber.Panel value="sessions">
      <SessionActionContext value={actions}>
        {!sessionsFiltred ||
          (sessionsFiltred.length === 0 && (
            <Alert icon={<SearchX />}>Сессий не найдено</Alert>
          ))}

        {sessionsFiltred && (
          <>
            <RevokeAllModal
              opened={revokeAllOpened}
              onClose={revokeAll.close}
            />
            <ModalRevoke id={id} opened={revokeOpened} onClose={revoke.close} />
            <SessionList sessions={sessionsFiltred} />
          </>
        )}
      </SessionActionContext>
    </SideBarTaber.Panel>
  );
};
