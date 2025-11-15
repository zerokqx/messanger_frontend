import { useBorder } from '@/widgets/Settings';
import { Drawer, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { useSideBarStore } from '../store/useMenuStore';
import type { SideBarCompouned } from '../types/sideBar.type';
import { InfoBlock } from './InfoBlock';
import { SideItem } from './Item';
import { useLoaderStore } from '../model';

export const SideBar: SideBarCompouned = ({ children }) => {
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  const isOpen = useSideBarStore.useIsOpen();
  const close = useSideBarStore.useClose();
  const load = useLoaderStore.useIsLoading();
  return (
    <>
      <Drawer
        keepMounted
        closeButtonProps={{ 'aria-label': 'Close drawer' }}
        withCloseButton={false}
        transitionProps={{
          transition: 'slide-right',
        }}
        styles={{
          content: {
            background: t.black,
            userSelect: 'none',
            borderRight: bd,
          },
        }}
        opened={isOpen}
        overlayProps={{ backgroundOpacity: 0.5 }}
        onClose={close}
      >
        <LoadingOverlay
          visible={load}
          overlayProps={{
            radius: 'xs',
            blur: 2,
            bg: 'black',
            opacity: 0.3,
          }}
        />

        {children}
      </Drawer>
    </>
  );
};

SideBar.Item = SideItem;
SideBar.InfoBlock = InfoBlock;
