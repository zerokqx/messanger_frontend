import { UserAvatar } from './UserAvatar';
import { createdAt } from '@/entities/lib/createAtData';
import { Description } from '@/shared/ui/Description/ui';
import { IsVerified } from './IsVerified';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { Clock, IdCard, Info, Star, User } from 'lucide-react';
import { DisplayItem } from './Item';
import { Flex, Divider, Rating } from '@mantine/core';
import type { ProfileDataDisplayProp } from '../types/profileDataDisplay.type';

export const ProfileDataDisplay = ({
  bio,
  fullName,
  login,
  rating,
}: ProfileDataDisplayProp) => {
  const clipboard = useClipboard();

  return (
    <Flex direction="column" gap="md">
      <Flex w="inherit" justify="center">
        <UserAvatar size="xl" />
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
        descText="Учетная запись создана"
        icon={<Clock />}
        display={createdAt()}
      />

      <DisplayItem
        descProp={{ direction: 'row' }}
        textProp={{
          c:
            rating < 2.5
              ? 'red.8'
              : rating >= 4
                ? 'blue.8'
                : rating >= 2.5
                  ? 'yellow.8'
                  : 'red.8',
        }}
        descText="Рейтинг"
        icon={<Star />}
        display={rating.toString()}
      >
        <Rating value={rating} color="blue" readOnly />
      </DisplayItem>

      <DisplayItem descText="Биография" display={bio} icon={<Info />} />

      <Divider />

      <Description desc="Статус верификации">
        <IsVerified />
      </Description>
    </Flex>
  );
};
