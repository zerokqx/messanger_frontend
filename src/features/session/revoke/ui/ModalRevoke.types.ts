import type { SessionData } from '@/entities/session';
import type { ModalProps } from '@mantine/core';

export interface ModalRevokeProps
  extends Pick<ModalProps, 'opened' | 'onClose'> {
  id: string;
}
