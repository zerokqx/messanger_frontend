import { Group, Text, ThemeIcon } from '@mantine/core';
import { useSessionContext } from '../../model/session-context-use';
import type { SessionComponent } from '../Session.types';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

export const CreatedAt: SessionComponent['CreatedAt'] = () => {
  const session = useSessionContext();
  const [t] = useTranslation('session');

  return (
    <Group>
      <ThemeIcon>
        <Plus />
      </ThemeIcon>
      <Text>
        {t('created_at')} {new Date(session.created_at).toLocaleDateString()}
      </Text>
    </Group>
  );
};
