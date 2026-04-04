import { Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useSessionContext } from '../../model/session.context';
import type { SessionComponent } from '../session.types';

export const CurrentBadge: SessionComponent['CurrentBadge'] = () => {
  const session = useSessionContext();
  const [t] = useTranslation('session');

  if (!session.is_current) {
    return null;
  }

  return <Badge variant="outline" radius="xl">{t('current_session')}</Badge>;
};
