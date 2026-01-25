import { Drawer, useMantineTheme } from '@mantine/core';
import { useSideBarStore } from '../store/useMenuStore';
import type { SideBarCompouned } from '../types/sideBar.type';
import { InfoBlock } from './InfoBlock';
import { SideItem } from './Item';

export const SideBar: SideBarCompouned = ({ children }) => {
  const t = useMantineTheme();
  const isOpen = useSideBarStore.useIsOpen();
  const close = useSideBarStore.useClose();
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
          root: {
            display: 'flex',
            flexDirection: 'column',
          },
          body: {
            flexGrow: 1,
            overflowY: 'auto',
          },
          content: {
            userSelect: 'none',
          },
        }}
        opened={isOpen}
        overlayProps={{ backgroundOpacity: 0.5 }}
        onClose={close}
      >
        {children}
      </Drawer>
    </>
  );
};

SideBar.Item = SideItem;
SideBar.InfoBlock = InfoBlock;
