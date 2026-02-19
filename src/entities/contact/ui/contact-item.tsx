import { ActionIcon, Avatar, Box, Group, Menu, Text } from '@mantine/core';
import { Trash } from 'lucide-react';
import { formatLogin } from '@/shared/lib/formaters';
import type { IContactElementProp } from './types';
import { HorizontalUserCard } from '@/entities/user/ui/horizontal-user-card';
import { useToggle } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

export const ContactItem = ({
  user,
  onClick,
  onRemove,
}: IContactElementProp) => {
  const name = formatLogin(user.login, user.custom_name);
  const [menuOpened, setMenuOpened] = useToggle();
  const [t] = useTranslation();
  return (
    <Menu
      withArrow
      onClose={() => {
        setMenuOpened(false);
      }}
      opened={menuOpened}
    >
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<Trash />}
          onClick={() => {
            onRemove?.(user.user_id);
          }}
        >
          {t('delete')}
        </Menu.Item>
      </Menu.Dropdown>
      <Menu.Target>
        <HorizontalUserCard
          value={user}
          onClick={onClick}
          w={'100%'}
          onContextMenu={(e) => {
            e.preventDefault();
            setMenuOpened();
          }}
          justify="space-between"
        >
          <Group>
            <HorizontalUserCard.Avatar />
            <HorizontalUserCard.Login />
          </Group>
        </HorizontalUserCard>
      </Menu.Target>
    </Menu>
  );
};
