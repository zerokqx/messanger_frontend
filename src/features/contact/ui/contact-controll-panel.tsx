import type { components } from '@/shared/types/v1';
import { ActionIcon, Button, Group } from '@mantine/core';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContactAdd, useContactRemove } from '../api';

interface ContactControllPanelProps {
  userId: string;
  user: components['schemas']['ProfileByUserIdData'];
  onUpdate: (userId: string) => void;
}
export const ContactControllPanel = ({
  userId,
  onUpdate,
  user,
}: ContactControllPanelProps) => {
  const { mutate: mutateContactAdd, isPending: isPendingContactAdd } =
    useContactAdd();
  const { mutate: mutateContactRemove, isPending: isPendingContactRemove } =
    useContactRemove();
  const rel = user.relationship;
  const [t] = useTranslation('contact');

  return (
    <Group>
      {!rel.is_target_in_contacts_of_current_user && (
        <Button
          onClick={() => {
            mutateContactAdd(
              {
                body: {
                  user_id: userId,
                },
              },
              {
                onSuccess(_, variables) {
                  onUpdate(variables.body.user_id);
                },
              }
            );
          }}
          loading={isPendingContactAdd}
          disabled={isPendingContactAdd}
        >
          {t('add')}
        </Button>
      )}
      {rel.is_target_in_contacts_of_current_user && (
        <>
          <Group gap={'xs'}>
            <Button disabled color="green">
              {t('in-contact')}
            </Button>
            <ActionIcon
              onClick={() => {
                mutateContactRemove(
              {
                body: { user_id: userId },
              },
              {
                onSuccess(_, variables) {
                  onUpdate(variables.body.user_id);
                },
              }
            );
          }}
              color="red"
              variant="light"
              loading={isPendingContactRemove}
            >
              <XIcon />
            </ActionIcon>
          </Group>
        </>
      )}
    </Group>
  );
};
