import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import type { RevokeAllModalProps } from './revoke-all-modal.types';
import { useSessionRevokeAll } from '../model';
import { useTranslation } from 'react-i18next';

export const RevokeAllModal = ({ opened, onClose }: RevokeAllModalProps) => {
  const { mutate: mutateAllRevoke } = useSessionRevokeAll();
  const [t] = useTranslation(['button-labels', 'session']);
  return (
    <Modal opened={opened} onClose={onClose} title={t('session:revoke_title_all')}>
      <Stack>
        <Text>{t('session:revoke_text_all')}</Text>
        <Text opacity={0.3}>{t('session:revoke_irreversible')}</Text>
        <Group grow>
          <Button
            onClick={() => {
              mutateAllRevoke();
            }}
            color="red"
          >
            {t('button-labels:confirm')}
          </Button>
          <Button onClick={onClose}>{t('button-labels:cancel')}</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
