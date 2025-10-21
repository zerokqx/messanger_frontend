import { useAppSettings } from '@/shared/lib/settings';
import { useModalGlobal } from '@/shared/model/useModalStore';
import type { AllModals } from '@/shared/model/useModalStore/types/useModalGlobal.type';
import {
  Flex,
  Modal as MantineModal,
  useMantineTheme,
  type ModalProps,
} from '@mantine/core';
import { type ReactNode } from 'react';

interface ModalComponentProps extends Omit<ModalProps, 'onClose' | 'opened'> {
  children: ReactNode;
  onClose?: ModalProps['onClose'];
  opened?: ModalProps['opened'];
  full?: boolean;
  keyModal: AllModals;
}

export const Modal = ({
  children,
  keyModal,
  full = false,
  ...props
}: ModalComponentProps) => {
  const borderElements = useAppSettings((state) => state.borderElements);
  const opened = useModalGlobal((s) => s[keyModal]);

  const close = useModalGlobal((s) => s.pinClose)(keyModal);
  const t = useMantineTheme();
  const border = full
    ? ''
    : borderElements
      ? `1px ${t.colors.gray[8]} solid`
      : 'none';
  return (
    <MantineModal
      transitionProps={{
        transition: 'slide-up',
      }}
      zIndex={500}
      overlayProps={{
        backgroundOpacity: 0.97,
      }}
      fullScreen={full}
      opened={opened}
      xOffset={10}
      yOffset={10}
      onClose={close}
      centered
      styles={{
        header: {
          background: 'transparent',
        },
        content: {
          overflowX: 'hidden',
          border: border,
          background: t.black,
        },
      }}
      {...props}
    >
      <Flex direction={'column'} gap={'md'}>
        {children}
      </Flex>
    </MantineModal>
  );
};
