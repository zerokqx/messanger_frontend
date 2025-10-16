import { Drawer } from '@mantine/core';
import { CustomMantineButton } from '../../Button';
import { useSideBarStore } from '../store/useMenuStore';
import { SideItem } from './Item';
import type { SideBarCompouned } from '../types/sideBar.type';
import { useMediaQuery } from '@mantine/hooks';
import { useAppSettings } from '@/shared/lib/settings/model/useAppSettings';

export const SideBar: SideBarCompouned = ({ renderUserBadge, children }) => {
  const { isOpen, toggle, close } = useSideBarStore();
  const mobile = useMediaQuery('(min-width: 56.25em)');
  const { borderElements } = useAppSettings();
  return (
    <>
      <CustomMantineButton onClick={toggle}>Menu</CustomMantineButton>
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
                ? '1px solid white'
                : 'none'
              : 'none',
          },
        }}
        opened={isOpen}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
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
