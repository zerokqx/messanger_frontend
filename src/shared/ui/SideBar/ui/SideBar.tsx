import { useResponsive } from '@/shared/lib/hooks/useResponsive';
import { useBorder } from '@/widgets/Settings';
import { Drawer, useMantineTheme } from '@mantine/core';
import { useSideBarStore } from '../store/useMenuStore';
import type { SideBarCompouned } from '../types/sideBar.type';
import { InfoBlock } from './InfoBlock';
import { SideItem } from './Item';
import { SelecedProvider } from './SelectedContext';

export const SideBar: SideBarCompouned = ({ renderUserBadge, children }) => {
  const { isOpen, close } = useSideBarStore();

  const { mobile } = useResponsive();
  const t = useMantineTheme();
  const bd = useBorder('0.1rem');
  return (
    <>
      <SelecedProvider>
        <Drawer
          closeButtonProps={{ 'aria-label': 'Close drawer' }}
          withCloseButton={false}
          transitionProps={{
            transition: 'slide-right',
          }}
          size={mobile ? 'xl' : '400px'}
          styles={{
            content: {
              background: t.black,
              userSelect: 'none',
              borderRight: !mobile ? bd : 'none',
            },
          }}
          opened={isOpen}
          overlayProps={{ backgroundOpacity: 0.5 }}
          onClose={close}
          offset={0}
        >
          <Drawer.Header bg={'black'}>
            {renderUserBadge?.()}

            <Drawer.CloseButton />
          </Drawer.Header>
          {children}
        </Drawer>
      </SelecedProvider>
    </>
  );
};

SideBar.Item = SideItem;
SideBar.InfoBlock = InfoBlock;
