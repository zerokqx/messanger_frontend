import { UserAvatar } from './UserAvatar';
import { createdAt } from '@/entities/lib/createAtData';
import { Description } from '@/shared/ui/Description/ui';
import { IsVerified } from './IsVerified';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { Clock, IdCard, Info, User } from 'lucide-react';
import { DisplayItem } from './Item';
import { Flex, Divider } from '@mantine/core';
import { usePutUserData } from '@/widgets/SideBar/lib/usePutUserData';
export const ProfileDataDisplay = () => {
  const { fullName, login, bio } = usePutUserData();

  const clipboard = useClipboard();
  return (
    <Flex direction={'column'} gap={'md'}>
      <Flex w={'inherit'} justify={'center'}>
        <UserAvatar size={'xl'} />
      </Flex>

      <DisplayItem
        descText="Логин"
        onClick={() => {
          clipboard.copy(login);
          notifications.show({
            message: 'Логин скопирован',
          });
        }}
        display={login}
        icon={<User />}
      />
      <DisplayItem
        display={fullName}
        icon={<IdCard />}
        descText="Имя пользователя"
      />
      <DisplayItem
        descText="Учетная запись создан"
        icon={<Clock />}
        display={createdAt()}
      />

      <DisplayItem descText="Биография" display={bio} icon={<Info />} />
      <Divider />
      <Description desc="Статус верификации">
        <IsVerified />
      </Description>
    </Flex>
  );
};
