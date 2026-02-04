import { ActionIcon, Loader, Menu } from '@mantine/core';
import { Ellipsis, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactAdd } from '../api';
import type { ReactNode } from 'react';

interface ContactMenu {
  userId: string;
}

const loader = (bool: boolean, icon: ReactNode) =>
  bool ? <Loader size={16} /> : icon;

export const ContactMenu = ({ userId }: ContactMenu) => {
  const { mutate: contactAdd, isPending } = useContactAdd();
  const [t] = useTranslation('contact-menu');
  return (
    <Menu zIndex={1000000} trigger="click">
      <Menu.Target>
        <ActionIcon>
          <Ellipsis  />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={loader(isPending, <Plus />)}
          onClick={() => {
            contactAdd({
              body: { user_id: userId },
            });
          }}
        >
          {t('contact-add')}
        </Menu.Item>
        <Menu.Item>{t('contact')}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
