import { Alert } from '@mantine/core';
import { SideBarTaber } from '../../model/tab';
import { SessionList, useGetSessionsQuery } from '@/entities/session';
import { SearchX } from 'lucide-react';
import { SessionSkeleton } from '@/entities/session/ui/SessionSkeleton';
import { sortSessionsByIsCurrent } from '@/entities/session/lib/sortSessionsByIsCurrent';

export const Sessions = () => {
  const { data: sessions, isLoading } = useGetSessionsQuery();
  const sessionsFiltred = sessions ? sortSessionsByIsCurrent(sessions) : [];
  console.log(sessionsFiltred);

  return (
    <SideBarTaber.Panel value="sessions">
      {isLoading && <SessionSkeleton count={3} visible={isLoading} />}
      {!sessionsFiltred ||
        (sessionsFiltred.length === 0 && (
          <Alert icon={<SearchX />}>Сессий не найдено</Alert>
        ))}

      {sessionsFiltred && <SessionList sessions={sessionsFiltred} />}
    </SideBarTaber.Panel>
  );
};
