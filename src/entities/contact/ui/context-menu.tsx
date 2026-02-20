import { Menu, type MenuProps } from '@mantine/core';
import { recordStats } from 'motion/react';

export interface ContactContextMenu {
  userId: string;
  opened: boolean;
  onClose: MenuProps['onClose'];
}
export const ContactContextMenu = ({
  userId,
  opened,
  onClose,
}: ContactContextMenu) => {
  return (
    <Menu {...{ opened, onClose }}>
      <Menu.Dropdown>
        <Menu.Item>dawdaw</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
