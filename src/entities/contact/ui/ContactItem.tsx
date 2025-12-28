import { ActionIcon, Avatar, Grid, Group, Text } from '@mantine/core';
import { Trash } from 'lucide-react';
import { formatLogin } from '@/shared/lib/formaters';
import type { IContactElementProp } from './types/contactItem.interface';

export const ContactElement = ({
  user,
  onClick,
  onRemove,
}: IContactElementProp) => {
  const name = formatLogin(user.login, user.custom_name);
  // const { mutateAsync } = useContactRemove();
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
              onRemove?.(user.user_id);
              // void mutateAsync(
              //   {
              //     body: {
              //       user_id: user.user_id,
              //     },
              //   },
              //   {
              //     onSuccess: () => {
              //       successNotify(`Контакт ${name.format} удален`);
              //     },
              //   }
              // );
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
};
