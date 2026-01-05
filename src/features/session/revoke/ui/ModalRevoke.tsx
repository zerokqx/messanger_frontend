import { Modal } from '@mantine/core';
import type { ModalRevokeProps } from './ModalRevoke.types';

export const ModalRevoke = ({
  opened,
  onClose,
  onAccept,
}: ModalRevokeProps) => {
  return <Modal opened={opened} onClose={onClose}></Modal>;
};
