import { Drawer, Flex } from '@mantine/core';
import { CustomMantineButton } from '../../Button';
import { useSideBarStore } from '../store/useMenuStore';
import type { SideBarCompouned } from '../types/sideBar.type';
import { SideItem } from './Item';

// TODO: Gesture add
export const SideBar: SideBarCompouned = ({ children }) => {
  const { isOpen, toggle, close } = useSideBarStore();
  return (
    <>
      <CustomMantineButton onClick={toggle}>Munu</CustomMantineButton>
      <Drawer.Root opened={isOpen} onClose={close} offset={20}>
        <Drawer.Overlay />
        <Drawer.Content bdrs="xl" bg={'black'} bd={'solid 1px white'}>
          <Drawer.Title>zerok</Drawer.Title>
          <Drawer.Body>
            <Flex
              h="100vh"
              bd={{ base: 'none' }}
              styles={{
                root: {
                  overflow: 'hidden',
                  borderRight: `solid white 1px`,
                },
              }}
              pt={'md'}
              direction={'column'}
            >
              {children}
            </Flex>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

SideBar.Item = SideItem;
