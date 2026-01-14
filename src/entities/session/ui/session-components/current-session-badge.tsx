import { Badge } from '@mantine/core';
import { useSessionContext } from '../../model/session.context';
import type { SessionComponent } from '../Session.types';

export const CurrentBadge: SessionComponent['CurrentBadge'] = () => {
  const session = useSessionContext();

  return session.is_current && <Badge>Текущая сессия</Badge>;
};
