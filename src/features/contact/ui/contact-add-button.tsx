import { ActionIcon } from '@mantine/core';
import { UserPlus } from 'lucide-react';
import { useContactAdd } from '../api';
import type { ContactAddButtonProps } from './types';

export const ContactAddButton = ({ userId }: ContactAddButtonProps) => {
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
