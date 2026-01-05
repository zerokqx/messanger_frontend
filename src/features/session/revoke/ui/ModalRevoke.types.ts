import type { SessionData } from '@/entities/session';
import type { Fn } from '@/shared/types/utils/functions';
import type { ModalProps } from '@mantine/core';

export interface ModalRevokeProps
  extends Pick<ModalProps, 'opened' | 'onClose'> {
  session: SessionData;
  onAccept: Fn<[], void>;
}
