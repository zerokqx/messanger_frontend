import type { ProfileByUserIdData } from '@/shared/api/orval/profile-service/profile-service.schemas';
import { Button, Group, type DefaultMantineColor } from '@mantine/core';
import { Plus, Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactAdd, useContactRemove } from '../api';
import { notify } from '@/shared/lib/notifications';

interface ContactControllPanelProps {
  userId: string;
  user: ProfileByUserIdData;
  onUpdate: (userId: string) => void;
}

export const ContactControllPanel = ({
  userId,
  onUpdate,
  user,
}: ContactControllPanelProps) => {
  const { mutate: addContact, isPending: isAdding } = useContactAdd();
  const { mutate: removeContact, isPending: isRemoving } = useContactRemove();

  const [t] = useTranslation('contact');

  const inContacts = user.relationship.is_target_in_contacts_of_current_user;

  const callback = inContacts ? removeContact : addContact;
  const text = inContacts ? t('in-contact') : t('add');
  const Icon = inContacts ? <Trash /> : <Plus />;
  const color: DefaultMantineColor | undefined = inContacts
    ? 'gray'
    : undefined;
  const loading = inContacts ? isRemoving : isAdding;

  return (
    <Group>
      <Button
        w={{ base: '100%', xs: 'auto' }}
        loading={loading}
        color={color}
        leftSection={Icon}
        onClick={() => {
          callback(
            { data: { user_id: userId } },
            {
              onSuccess: (_, variables) => {
                const id = variables.data.user_id;
                if (id) onUpdate(id);
              },
              onError: () => {
                notify.error({
                  title: t('error-contact-operation'),
                  message: t('error-contact-operation-message'),
                });
              },
            }
          );
        }}
      >
        {text}
      </Button>
    </Group>
  );
};
