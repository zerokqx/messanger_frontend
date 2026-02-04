import { useModalGlobal } from '@/shared/model/use-modal-store';
import { Flex, Modal as MantineModal, Stack } from '@mantine/core';
import type { ModalComponentProps } from '../types';
export const Modal = ({
  children,
  keyModal,
  full = false,
  ...props
}: ModalComponentProps) => {
  const opened = useModalGlobal((s) => s[keyModal]);
  const close = useModalGlobal.usePinClose()(keyModal);
  const zIndex = useModalGlobal.use_zIndex()[keyModal];
  return (
    <MantineModal
      transitionProps={{
        transition: 'slide-right',
      }}
      zIndex={zIndex}
      fullScreen={full}
      opened={opened}
      xOffset={10}
      yOffset={10}
      onClose={close}
      centered
      {...props}
    >
      <Stack>{children}</Stack>
    </MantineModal>
  );
};
