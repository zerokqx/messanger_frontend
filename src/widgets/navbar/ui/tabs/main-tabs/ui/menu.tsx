import { menuTabsConfig } from '@/widgets/navbar/config/menu';
import { Burger, Menu } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TabsMenuProps {
  onClickMenuItem: (v: string) => void;
}

export const TabsMenu = ({ onClickMenuItem }: TabsMenuProps) => {
  const [opened, setOpened] = useState(false);
  const [t] = useTranslation('navbar');

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
        {menuTabsConfig.map(({ label, icon }) => (
          <Menu.Item
            key={label}
            leftSection={icon}
            onClick={() => {
              onClickMenuItem(label);
            }}
          >
            {t(label)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
