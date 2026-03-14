import { Group, Text, ThemeIcon } from '@mantine/core';
import { useSessionContext } from '../../model/session.context';
import type { SessionComponent } from '../session.types';
import { useTranslation } from 'react-i18next';
import { isSameDay } from '../../lib/is-same-day';
import { History } from 'lucide-react';

export const LastRefresh: SessionComponent['LastRefresh'] = () => {
  const [t] = useTranslation(['session', 'days']);
  const session = useSessionContext();
  const date = new Date(session.last_refresh_at);
  const isToday = isSameDay(new Date(session.last_refresh_at), new Date());
  const text = isToday ? t('days:today') : date.toLocaleDateString();

  return (
    <Group gap="xs" wrap="nowrap">
      <ThemeIcon variant="light" radius="xl" size="sm">
        <History size={14} />
      </ThemeIcon>
      <Text size="sm">
        {t('last_activation')} {text}
      </Text>
    </Group>
  );
};
