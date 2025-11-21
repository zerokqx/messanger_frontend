import { useCombinedSelectSearch } from '@/widgets/ChatAside/model/useSearchUnion';
import { ActionIcon, Box, Button, Menu, useMantineTheme } from '@mantine/core';
import { useLogger } from '@mantine/hooks';
import { Edit, Ellipsis, Trash } from 'lucide-react';
import { useState } from 'react';

export const HeaderMenu = () => {
  const t = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user_id, profile } = useCombinedSelectSearch(
    'selectedUser',
    (s) => s
  );

  return (
    <Menu
      position="bottom"
      transitionProps={{
        transition: 'slide-left',
      }}
      closeOnClickOutside={true}
      opened={opened}
      withinPortal={false}
      width={200}
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

      <Menu.Dropdown>
        <Menu.Item leftSection={<Trash color={t.colors.red[8]} size={16} />}>
          Удалить
        </Menu.Item>

        <Menu.Item leftSection={<Edit color={t.colors.blue[8]} size={16} />}>
          Изменить
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
