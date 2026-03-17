import { ActionIcon, Loader, Menu, type ActionIconProps, type MantineColor, type MenuTargetProps } from '@mantine/core';
import { Ellipsis, Lock, Pencil, Plus, Trash, Unlock } from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddBlacklist, useRemoveFromBlacklist } from '@/entities/user';
import { useContactAdd, useContactRemove } from '../api';
import type { Fn } from '@/shared/types/utils/functions';
import type { components } from '@/shared/types/v1';
import { useInvalidateContacts } from '@/entities/contact';
import { useDisclosure } from '@mantine/hooks';

interface ContactMenu  extends ActionIconProps{
  user?: Partial<
    Pick<
      components['schemas']['ProfileByUserIdData'],
      'relationship' | 'user_id'
    >
  >;
  
  onUpdate: (userId: string) => void;
  onEditClick?: () => void;
}

const loader = (bool: boolean, icon: ReactNode, color?: MantineColor) =>
  bool ? <Loader size={16} color={color} /> : icon;

const userIdGuard = (callback: Fn, userId: string | undefined | null) => {
  if (userId) {
    callback(userId);
  }
};

export const ContactMenu = ({ user, onUpdate, onEditClick,...props }: ContactMenu) => {
  const [opened, { close, toggle }] = useDisclosure();
  const { mutate: contactRemove, isPending: isPendingContactRemove } =
    useContactRemove();
  const { mutate: contactAdd, isPending: isPendingContactAdd } =
    useContactAdd();
  const invalidateContacts = useInvalidateContacts();
  const [t] = useTranslation('contact-menu');
  const { mutate: addBlacklist, isPending: isPendingAddBlacklist } =
    useAddBlacklist();
  const {
    mutate: removeFromBlacklist,
    isPending: isPendingRemoveFromBlacklist,
  } = useRemoveFromBlacklist();
  const inContact = user?.relationship?.is_target_in_contacts_of_current_user;
  const userId = user?.user_id;
  const inBlacklist =
    user?.relationship?.is_target_user_blocked_by_current_user;

  return (
    <Menu
      opened={opened}
      onClose={close}
      zIndex={1000000}
      keepMounted
      offset={6}
      withinPortal={false}
      trigger="click"
    >
      <Menu.Target>
        <ActionIcon onClick={toggle} variant={opened ? 'light' : 'subtle'} {...props}>
          <Ellipsis />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {!inContact && (
          <>
            <Menu.Item
              disabled={!userId || inBlacklist}
              leftSection={loader(isPendingContactAdd, <Plus />)}
              onClick={() => {
                if (!userId) return;
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
          </>
        )}
        {inContact && (
          <>
            <Menu.Item
              disabled={!userId}
              leftSection={loader(isPendingContactRemove, <Trash />, 'red')}
              onClick={() => {
                if (!userId) return;
                contactRemove(
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
              {t('contact-remove')}
            </Menu.Item>

            {onEditClick && (
              <Menu.Item
                disabled={!userId}
                leftSection={<Pencil />}
                onClick={onEditClick}
              >
                {t('contact-edit')}
              </Menu.Item>
            )}
          </>
        )}

        {inBlacklist ? (
          <Menu.Item
            disabled={!userId || isPendingRemoveFromBlacklist}
            leftSection={loader(
              isPendingRemoveFromBlacklist,
              <Unlock />,
              'red'
            )}
            onClick={() => {
              if (!userId) return;

              removeFromBlacklist(
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
            {t('from-blacklist-remove')}
          </Menu.Item>
        ) : (
          <Menu.Item
            disabled={!userId}
            leftSection={loader(isPendingAddBlacklist, <Lock />, 'red')}
            onClick={() => {
              if (!userId) return;
              addBlacklist(
                {
                  body: { user_id: userId },
                },
                {
                  onSettled(_data, _error, variables) {
                    if (inContact) void invalidateContacts();
                    userIdGuard(onUpdate, variables.body.user_id);
                  },
                }
              );
            }}
          >
            {t('blacklist-add')}
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
