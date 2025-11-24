import { ActionIcon, Avatar, Grid, Group, Text } from '@mantine/core';
import type { ContactElementProp } from '../types/contactElement.type';
import { formatLoginViaCustomName } from '@/entities/user/lib/formatLoginViaCustomName';
import { Trash } from 'lucide-react';
import { useContactRemove } from '@/features/contactRemove';
import { successNotify } from '@/shared/lib/notifications/success';

export const ContactElement = ({ user, onClick }: ContactElementProp) => {
  const name = formatLoginViaCustomName(user?.login, user?.custom_name);
  const { mutateAsync } = useContactRemove();
  if (user) {
    return (
      <Grid {...{ onClick }} w={'100%'}>
        <Grid.Col span={'content'}>
          <Avatar name={name.name} />
        </Grid.Col>
        <Grid.Col span={'content'}>
          <Text title={name.format} truncate="end" w={'20ch'}>
            {name.params[1] ?? name.params[0]}
          </Text>
        </Grid.Col>
        <Grid.Col span={'auto'}>
          <Group justify="end">
            <ActionIcon
              bdrs={'xl'}
              onClick={() => {
                if (user.user_id) {
                  void mutateAsync(
                    {
                      body: {
                        user_id: user.user_id,
                      },
                    },
                    {
                      onSuccess: () => {
                        successNotify(`Контакт ${name.format} удален`);
                      },
                    }
                  );
                }
              }}
              variant="light"
              color="red"
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    );
  }
  return null;
};
