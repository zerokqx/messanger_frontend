import { useContactAdd } from '@/features/contactAdd';
import { selectedUserActions } from '@/shared/model/stores/selected-user';
import { Stack, Group, Button, TextInput } from '@mantine/core';
import { Trash } from 'lucide-react';
import type { ComponentProps } from 'react';

export const SelectedProfileButtonAction = ({
  renameProps,
}: {
  renameProps?: ComponentProps<'button'>;
}) => {
  const uuid = selectedUserActions.doGetUser()?.user_id;
  const add = useContactAdd();

  return (
    <Stack bdrs={'xl'}>
      <Button
        bdrs={'xl'}
        onClick={() => {
          void add.mutateAsync({
            body: {
              user_id: uuid,
            },
          });
        }}
        variant="gradient"
        fullWidth
      >
        Добавить в контакты
      </Button>

      <Group grow>
        <Button variant="light" bdrs={'xl'} color="gray" {...renameProps}>
          Переименовать
        </Button>

        <Button variant="light" bdrs={'xl'} color={'red'}>
          <Trash size={16} />
          Удалить
        </Button>
      </Group>
    </Stack>
  );
};
