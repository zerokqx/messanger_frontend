import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import type { RevokeAllModalProps } from './revoke-all-modal.types';
import { useSessionRevokeAll } from '../model';

const RevokeAllModal = ({ opened, onClose }: RevokeAllModalProps) => {
  const { mutate: mutateAllRevoke } = useSessionRevokeAll();
  return (
    <Modal opened={opened} onClose={onClose}>
      <Stack>
        <Text>Вы уверены что хотите завершить все сессии кроме текущей?</Text>
        <Text opacity={0.3}>Завершение сессий необротимый процесс</Text>
        <Group grow>
          <Button
            onClick={() => {
              mutateAllRevoke({});
            }}
            color="red"
          >
            Да
          </Button>
          <Button onClick={onClose}>Нет</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
