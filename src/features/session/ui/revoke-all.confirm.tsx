import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { t } from 'i18next';
export const confirmModalForRevokeAllSessions = (onConfirm: () => void) =>
  modals.openConfirmModal({
    title: t('session:revoke_title_all'),
    children: <Text size="sm">{t('session:revoke_text_all')}</Text>,
    labels: {
      confirm: t('button-labels:confirm'),
      cancel: t('button-labels:cancel'),
    },
    onConfirm,
  });
