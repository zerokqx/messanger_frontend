import { useAppSettings } from '@/shared/lib/settings';
import { useSettingsStore } from '@/widgets/Settings/model';
import { Flex, Modal as MantineModal, type ModalProps } from '@mantine/core';
import type { ReactNode } from 'react';

export const Modal = ({ children,...props }: { children: ReactNode }& ModalProps) => {
  const { borderElements } = useAppSettings();
  return (
    <MantineModal
      transitionProps={{
        transition: 'slide-up',
      }}
      zIndex={500}
      overlayProps={{
        backgroundOpacity: 0.55,

        blur: 3,
      }}
      styles={{
        header: {
          background: 'black',
        },
        content: {
          userSelect: 'none',
          borderRadius: '0px',
          border: borderElements ? '1px white solid' : 'none',
          background: 'black',
        },
      }}
      centered
      {...props}
    >
      <Flex direction={'column'} gap={'md'}>
        {children}
      </Flex>
    </MantineModal>
  );
};
