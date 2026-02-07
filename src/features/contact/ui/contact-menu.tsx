import { ActionIcon, Loader, Menu } from '@mantine/core';
import { Ellipsis, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactAdd } from '../api';
import type { ReactNode } from 'react';
import type { Fn } from '@/shared/types/utils/functions';

interface ContactMenu {
  userId: string;
  onUpdate: (userId: string) => void;
}

const loader = (bool: boolean, icon: ReactNode) =>
  bool ? <Loader size={16} /> : icon;

const userIdGuard = (callback: Fn, userId: string | undefined | null) => {
  if (userId) {
    callback(userId);
  }
};
export const ContactMenu = ({ userId, onUpdate }: ContactMenu) => {
  const { mutate: contactAdd, isPending } = useContactAdd();
  const [t] = useTranslation('contact-menu');
  return (
    <Menu zIndex={1000000} trigger="click">
      <Menu.Target>
        <ActionIcon>
          <Ellipsis />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={loader(isPending, <Plus />)}
          onClick={() => {
            contactAdd(
              {
                body: { user_id: userId },
              },
              {
                onSettled(_data, _error, variables) {
                  userIdGuard(onUpdate, variables.body.user_id);
                },
              }
            );
          }}
        >
          {t('contact-add')}
        </Menu.Item>
        <Menu.Item>{t('contact')}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
