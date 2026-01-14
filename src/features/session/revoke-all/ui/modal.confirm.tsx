import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { t } from 'i18next';
export const confirmModalForRevokeAllSessions = (onConfirm: () => void) =>
  modals.openConfirmModal({
    title: 'Revoke sessions',
    children: <Text size="sm">{t('session:revoke_text_all')}</Text>,
    labels: {
      confirm: t('session:revoke_all_confirm'),
      cancel: t('session:revoke_all_cancel'),
    },
    onConfirm,
  });
