import { Text } from '@mantine/core';
import { t } from 'i18next';
import { modals } from '@mantine/modals';

export const confirmModalForRevokeSession = (onConfirm: () => void) =>
  modals.openConfirmModal({
    title: t('session:revoke_title_one'),
    children: <Text size="sm">{t('session:revoke_text_one')}</Text>,
    labels: {
      confirm: t('button-labels:confirm'),
      cancel: t('button-labels:cancel'),
    },
    onConfirm,
  });
