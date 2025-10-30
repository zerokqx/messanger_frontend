import { Flex, Text, Space, Group, Divider } from '@mantine/core';
import { useUserStore } from '../model';
import { UserAvatar } from './UserAvatar';
import { createdAt } from '@/entities/lib/createAtData';
import { Description } from '@/shared/ui/Description/ui';
import { IsVerified } from './IsVerified';
import { CustomMantineButton } from '@/shared/ui/Button';
import { SquarePen } from 'lucide-react';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

export const ProfileDataDisplay = () => {
  const user = useUserStore();
  const clipboard = useClipboard();
  return (
    <Flex direction={'column'} gap={'md'}>
      <Flex w={'inherit'} justify={'center'}>
        <UserAvatar size={'xl'} />
      </Flex>

      <Description
        onClick={() => {
          lipboard.copy(user.login);
          notifications.show({
            message: 'Логин скопирован',
          });
        }}
        desc="Логин"
      >
        <Text>{user.login}</Text>
      </Description>
      <Text>{user.full_name}</Text>
      <Group>
        <Description desc="Учетная запись создана">
          <Text>{createdAt()}</Text>
        </Description>
      </Group>
      <Text>{user.bio}</Text>
      <Divider />
      <Description desc="Статус верификации">
        <IsVerified />
      </Description>
    </Flex>
  );
};
