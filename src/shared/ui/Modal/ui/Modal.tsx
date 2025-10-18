import type { UseModalStore } from '@/shared/lib/isOpen/types';
import { useAppSettings } from '@/shared/lib/settings';
import {
  Flex,
  Modal as MantineModal,
  useMantineTheme,
  type ModalProps,
} from '@mantine/core';
import { type ReactNode } from 'react';
export const Modal = ({
  children,
  store,
  full = false,
  ...props
}: {
  children: ReactNode;
  store: UseModalStore;
  onClose?: ModalProps['onClose'];
  opened?: ModalProps['opened'];
  full?: boolean;
} & Omit<ModalProps, 'onClose' | 'opened'>) => {
  const { borderElements } = useAppSettings();
  const border = full ? '' : borderElements ? '1px white solid' : 'none';
  return (
    <MantineModal
      transitionProps={{
        transition: 'slide-up',
      }}
      zIndex={500}
      overlayProps={{
        backgroundOpacity: 0.56,
      }}
      fullScreen={full}
      opened={store.isOpen}
      removeScrollProps={{ allowPinchZoom: true }}
      xOffset={10}
      yOffset={10}
      onClose={store.close}
      centered
      styles={{
        header: {
          background: 'transparent',
        },
        content: {
          border: border,
          background: 'black',
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
