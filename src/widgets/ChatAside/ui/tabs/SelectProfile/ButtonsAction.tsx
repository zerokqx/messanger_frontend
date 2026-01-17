import { useContactAdd } from '@/features/contact';
import { useSelectedSearchUser } from '@/features/selected-user';
import { Stack, Button } from '@mantine/core';
import type { ComponentProps } from 'react';

export const SelectedProfileButtonAction = ({
  renameProps,
}: {
  renameProps?: ComponentProps<'button'>;
}) => {
  const user = useSelectedSearchUser((s) => s.data.user);
  const add = useContactAdd(user?.profile.login ?? '');

  return (
    <Stack bdrs={'xl'}>
      <Button
        bdrs={'xl'}
        onClick={() => {
          void add.mutateAsync({
            body: {
              user_id: user?.user_id,
            },
          });
        }}
        variant="gradient"
        fullWidth
      >
        Добавить в контакты
      </Button>
    </Stack>
  );
};
