import type { UseDisclosureReturnValue } from '@mantine/hooks';
import { Flex, Modal as MantineModal } from '@mantine/core';
import type { ReactNode } from 'react';
import { useAppSettings } from '@/shared/app/settings/model/useAppSettings';

export const Modal = ({
  disclosure,
  children,
}: {
  children: ReactNode;
  disclosure: UseDisclosureReturnValue;
}) => {
  const [opened, { close }] = disclosure;
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
      bdrs={'none'}
      opened={opened}
      onClose={close}
      centered
    >
      <Flex direction={'column'} gap={'md'}>
        {children}
      </Flex>
    </MantineModal>
  );
};
