import { UserAvatar } from './UserAvatar';
import { createdAt } from '@/entities/lib/createAtData';
import { Description } from '@/shared/ui/Description/ui';
import { IsVerified } from './IsVerified';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { Clock, IdCard, Info, Star, User } from 'lucide-react';
import { DisplayItem } from './Item';
import { Divider, Rating, Stack, Center, Avatar, Space } from '@mantine/core';
import type { ProfileDataDisplayProp } from '../types/profileDataDisplay.type';

export const ProfileDataDisplay = ({
  bio,
  fullName,
  login,
  rating,
}: ProfileDataDisplayProp) => {
  const clipboard = useClipboard();

  const handleCopy = (value: string, label: string) => {
    clipboard.copy(value);
    notifications.show({
      message: `${label} скопирован`,
    });
  };

  const ratingColor =
    rating < 2.5
      ? 'red.8'
      : rating >= 4
        ? 'blue.8'
        : rating >= 2.5
          ? 'yellow.8'
          : 'red.8';

  const createdAtValue = createdAt();

  return (
    <Stack>
      <Center>
        <Avatar size="xl" name={login} />
      </Center>
      <Space h="1rem" />

      {/* Логин */}
      <DisplayItem
        descText="Логин"
        onClick={() => handleCopy(login, 'Логин')}
        display={login}
        icon={<User />}
      />

      {/* Имя пользователя */}
      <DisplayItem
        display={fullName}
        icon={<IdCard />}
        descText="Имя пользователя"
        onClick={() => handleCopy(fullName, 'Имя пользователя')}
      />

      {/* Дата создания учётки */}
      <DisplayItem
        descText="Учетная запись создана"
        icon={<Clock />}
        display={createdAtValue}
        onClick={() => handleCopy(createdAtValue, 'Дата создания')}
      />

      {/* Рейтинг */}
      <DisplayItem
        descProp={{ direction: 'row' }}
        textProp={{
          c: ratingColor,
        }}
        descText="Рейтинг"
        icon={<Star />}
        display={rating.toString()}
        onClick={() => handleCopy(rating.toString(), 'Рейтинг')}
      >
        <Rating value={rating} color="blue" readOnly />
      </DisplayItem>

      {/* Биография */}
      <DisplayItem
        descText="Биография"
        display={bio}
        icon={<Info />}
        onClick={() => handleCopy(bio, 'Биография')}
      />

      <Divider />

      <Description desc="Статус верификации">
        <IsVerified />
      </Description>
    </Stack>
  );
};
