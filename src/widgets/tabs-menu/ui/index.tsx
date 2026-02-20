import { Burger, Menu } from '@mantine/core';
import { useState } from 'react';

interface TabsMenuProps {
  data: string[];
  onClickMenuItem: (v: string) => void;
}

export const TabsMenu = ({ data, onClickMenuItem }: TabsMenuProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu
      transitionProps={{
        transition: 'slide-right',
      }}
      closeOnClickOutside
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
    >
      <Menu.Target>
        <Burger
          opened={opened}
          onClick={() => {
            setOpened((prev) => !prev);
          }}
        />
      </Menu.Target>
      <Menu.Dropdown>
        {data.map((item) => (
          <Menu.Item
            key={item}
            onClick={() => {
              onClickMenuItem(item);
            }}
          >
            {item}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
