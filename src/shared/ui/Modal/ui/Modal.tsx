import { useModalGlobal } from '@/shared/model/useModalStore';
import { useBorder } from '@/widgets/Settings';
import { Flex, Modal as MantineModal, useMantineTheme } from '@mantine/core';
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
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  return (
    <MantineModal
      transitionProps={{
        transition: 'slide-right',
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
