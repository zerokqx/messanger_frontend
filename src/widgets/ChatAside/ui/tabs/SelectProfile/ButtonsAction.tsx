import { useContactAdd } from '@/features/contactAdd';
import { useCombinedSelectSearch } from '@/widgets/ChatAside/model/useSearchUnion';
import { Stack, Group, Button } from '@mantine/core';
import { Trash } from 'lucide-react';

export const SelectedProfileButtonAction = () => {
  const uuid = useCombinedSelectSearch('selectedUser', (s) => s.user_id);
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
        <Button variant="light" bdrs={'xl'} color="gray">
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
