import { Badge } from '@mantine/core';
import { useSessionContext } from '../../model/session.context';
import type { SessionComponent } from '../session.types';

export const CurrentBadge: SessionComponent['CurrentBadge'] = () => {
  const session = useSessionContext();

  if (!session.is_current) {
    return null;
  }

  return <Badge variant="outline" radius="xl">Текущая сессия</Badge>;
};
