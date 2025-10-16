import { useAppSettings } from '@/shared/app/settings/model/useAppSettings';
import { useSettingsStore } from '@/widgets/Settings/model';
import { Flex, Modal as MantineModal } from '@mantine/core';
import type { ReactNode } from 'react';

export const Modal = ({ children }: { children: ReactNode }) => {
  const { isOpen, close } = useSettingsStore();
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
      opened={isOpen}
      onClose={close}
      centered
    >
      <Flex direction={'column'} gap={'md'}>
        {children}
      </Flex>
    </MantineModal>
  );
};
