import type { AllModals } from '@/shared/model/useModalStore/types/useModalGlobal.type';
import type { ModalProps } from '@mantine/core';
import type { ReactNode } from 'react';

export interface ModalComponentProps
  extends Omit<ModalProps, 'onClose' | 'opened'> {
  children: ReactNode;
  onClose?: ModalProps['onClose'];
  opened?: ModalProps['opened'];
  full?: boolean;
  keyModal: AllModals;
}
