import type { ModalProps } from '@mantine/core';

export interface ModalRevokeProps
  extends Pick<ModalProps, 'opened' | 'onClose'> {
  id: string;
}

export interface RevokeAllModalProps
  extends Pick<ModalProps, 'onClose' | 'opened'> {}
