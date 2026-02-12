import { useContactAdd } from '@/features/contact';
import { successNotify } from '@/shared/lib/notifications/success';
import type { components } from '@/shared/types/v1';
import { Stack, Button } from '@mantine/core';

export const SelectedProfileButtonAction = ({
  user,
}: {
  user: components['schemas']['ProfileData'];
}) => {
  const add = useContactAdd();

  return (
    <Stack bdrs={'xl'}>
      <Button
        bdrs={'xl'}
        onClick={() => {
          void add.mutateAsync(
            {
              body: {
                user_id: user.user_id,
              },
            },
            {
              onSuccess() {
                successNotify(`${user.login} добавлен в ваши контакты`);
              },
            }
          );
        }}
        variant="gradient"
        fullWidth
      >
        Добавить в контакты
      </Button>
    </Stack>
  );
};
