import { createThemeIcon } from '@/shared/lib/createThemeIcon';
import type { components } from '@/shared/types/v1';
import { ActionIcon, Menu, ThemeIcon, useMantineTheme } from '@mantine/core';
import { Edit, Ellipsis, Trash } from 'lucide-react';
import { useState } from 'react';
import type { MenuComponent } from '../types/menu.types';
import { MenuContext } from '../../model/menu-context';
import { MenuAction } from './action';

export const ContactMenu: MenuComponent = ({ context, children }) => {
  const [opened, setOpened] = useState(false);
  return (
    <Menu
      position="bottom"
      transitionProps={{
        transition: 'slide-left',
      }}
      closeOnClickOutside={true}
      opened={opened}
      withinPortal={false}
      width={300}
      zIndex={1005}
    >
      <Menu.Target>
        <ActionIcon
          onClick={() => {
            setOpened(!opened);
          }}
        >
          <Ellipsis />
        </ActionIcon>
      </Menu.Target>

      <MenuContext value={context}>
        <Menu.Dropdown>{children}</Menu.Dropdown>
      </MenuContext>
    </Menu>
  );
};
ContactMenu.Action = MenuAction;
