import { MenuItem } from '@mantine/core';
import { useMenuContext } from '../../model/menu-context';
import type { MenuComponent } from '../types/menu.types';

export const MenuAction: MenuComponent['Action'] = ({ onClick, ...props }) => {
  const userId = useMenuContext();
  return (
    <MenuItem
      onClick={() => {
        onClick?.(userId);
      }}
      {...props}
    />
  );
};
