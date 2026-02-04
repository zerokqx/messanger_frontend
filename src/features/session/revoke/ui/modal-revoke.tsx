import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import type { ModalRevokeProps } from './modal-revoke.types';
import { useGetSessionByIdFromCache } from '@/entities/session';
import { useRevokeSession } from '../api/revoke.mutation';

export const ModalRevoke = ({ opened, onClose, id }: ModalRevokeProps) => {
  const session = useGetSessionByIdFromCache(id);
  const { mutate: mutateRevoke } = useRevokeSession();
  return (
    <Modal opened={opened} onClose={onClose}>
      {session ? (
        <>
          <Stack>
            <Text>Вы уверены что хотите завершить данную сесиию?</Text>
            <Text opacity={0.3}>Завершение сессии необротимый процесс</Text>
            <Group grow>
              <Button
                onClick={() => {
                  console.log(1);
                  mutateRevoke({
                    params: {
                      path: {
                        session_id: id,
                      },
                    },
                  });
                }}
                color="red"
              >
                Да
              </Button>
              <Button onClick={onClose}>Нет</Button>
            </Group>
          </Stack>
        </>
      ) : (
        <Text>Такой сессии не существует</Text>
      )}
    </Modal>
  );
};
