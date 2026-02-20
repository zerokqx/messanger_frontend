import type { ModalProps } from '@mantine/core';

export type CustomModalProps = Omit<ModalProps, 'opened' | 'onClose'>;
