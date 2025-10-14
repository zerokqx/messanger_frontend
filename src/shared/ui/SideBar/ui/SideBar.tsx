import { Drawer } from '@mantine/core';
import { CustomMantineButton } from '../../Button';
import { useSideBarStore } from '../store/useMenuStore';
import type { SideBarCompouned } from '../types/sideBar.type';
import { SideItem } from './Item';

// TODO: Gesture add
export const SideBar: SideBarCompouned = ({ renderUserBadge, children }) => {
  const { isOpen, toggle, close } = useSideBarStore();
  return (
    <>
      <CustomMantineButton onClick={toggle}>Menu</CustomMantineButton>
      <Drawer.Root opened={isOpen} onClose={close} offset={0}>
        <Drawer.Overlay />
        <Drawer.Body>
          <Drawer.Content bdrs="none" bg={'black'}>
            <Drawer.Header bg={'indigo'}>
              {renderUserBadge?.()}
              <Drawer.CloseButton />
            </Drawer.Header>
            {children}
          </Drawer.Content>
        </Drawer.Body>
      </Drawer.Root>
    </>
  );
};

SideBar.Item = SideItem;
