import { ActionIcon } from '@mantine/core';
import { UserPlus } from 'lucide-react';
import { useContactAdd } from '../api';

interface ContactAddButton {
  userId: string;
}

export const ContactAddButton = ({ userId }: ContactAddButton) => {
  const { mutate: contactAdd } = useContactAdd();

  return (
    <ActionIcon
      onClick={() => {
        contactAdd({
          body: {
            user_id: userId,
          },
        });
      }}
    >
      <UserPlus />
    </ActionIcon>
  );
};
