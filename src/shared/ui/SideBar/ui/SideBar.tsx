import { useAppSettings } from '@/shared/lib/settings/model/useAppSettings';
import { Drawer, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSideBarStore } from '../store/useMenuStore';
import type { SideBarCompouned } from '../types/sideBar.type';
import { SideItem } from './Item';
import { InfoBlock } from './InfoBlock';

export const SideBar: SideBarCompouned = ({ renderUserBadge, children }) => {
  const { isOpen, close } = useSideBarStore();
  const mobile = useMediaQuery('(min-width: 56.25em)');
  const t = useMantineTheme();
  const { borderElements } = useAppSettings();
  return (
    <>
      <Drawer
        withCloseButton={false}
        p={'none'}
        transitionProps={{
          transition: 'slide-right',
        }}
        w={{ base: '100%' }}
        styles={{
          content: {
            background: 'black',
            userSelect: 'none',
            borderRight: borderElements
              ? mobile
                ? `1px solid ${t.colors.gray[9]}`
                : 'none'
              : 'none',
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
    </>
  );
};

SideBar.Item = SideItem;
SideBar.InfoBlock = InfoBlock;
