import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import type { ModalRevokeProps } from './modal-revoke.types';
import { useGetSessionByIdFromCache } from '@/entities/session';
import { useRevokeSession } from '../model';
import { useTranslation } from 'react-i18next';

export const ModalRevoke = ({ opened, onClose, id }: ModalRevokeProps) => {
  const session = useGetSessionByIdFromCache(id);
  const { mutate: mutateRevoke } = useRevokeSession();
  const [t] = useTranslation(['button-labels', 'session']);
  return (
    <Modal opened={opened} onClose={onClose} title={t('session:revoke_title_one')}>
      {session ? (
        <>
          <Stack>
            <Text>{t('session:revoke_text_one')}</Text>
            <Text opacity={0.3}>{t('session:revoke_irreversible')}</Text>
            <Group grow>
              <Button
                onClick={() => {
                  mutateRevoke({ sessionId: id });
                }}
                color="red"
              >
                {t('button-labels:confirm')}
              </Button>
              <Button onClick={onClose}>{t('button-labels:cancel')}</Button>
            </Group>
          </Stack>
        </>
      ) : (
        <Text>{t('session:session_not_found')}</Text>
      )}
    </Modal>
  );
};
