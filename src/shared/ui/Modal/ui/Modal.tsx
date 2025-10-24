import { useModalGlobal } from '@/shared/model/useModalStore';
import { Flex, Modal as MantineModal, useMantineTheme } from '@mantine/core';
import { useLogger } from 'react-use';
import type { ModalComponentProps } from '../types';
import { useBorder } from '@/widgets/Settings';

export const Modal = ({
  children,
  keyModal,
  full = false,
  ...props
}: ModalComponentProps) => {
  const opened = useModalGlobal((s) => s[keyModal]);
  const close = useModalGlobal((s) => s.pinClose)(keyModal);
  const zIndex = useModalGlobal((s) => s._zIndex)[keyModal];
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  useLogger('Modal', { keyModal });
  return (
    <MantineModal
      transitionProps={{
        transition: 'slide-up',
      }}
      zIndex={zIndex}
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
          border: bd,
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
