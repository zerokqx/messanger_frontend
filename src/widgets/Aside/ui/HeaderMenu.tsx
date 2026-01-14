import { useSelectedSearchUser } from '@/features/selected-user';
import type { components } from '@/shared/types/v1';
import { ActionIcon, Menu, ThemeIcon, useMantineTheme } from '@mantine/core';
import { Edit, Ellipsis, Trash } from 'lucide-react';
import { useState } from 'react';

export const HeaderMenu = () => {
  const t = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const user = useSelectedSearchUser((s) => s.data.user);
  const profile = user?.profile as
    | components['schemas']['ProfileByUserIdData']
    | undefined;

  if (!profile) return null;
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

      <Menu.Dropdown>
        {profile.relationship.is_target_in_contacts_of_current_user && (
          <>
            <Menu.Item
              leftSection={<Trash color={t.colors.red[8]} size={16} />}
            >
              Удалить
            </Menu.Item>

            <Menu.Item
              leftSection={<Edit color={t.colors.blue[8]} size={16} />}
            >
              Изменить
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
