import { createdAt } from '@/entities/user/lib/createAtData';
import { Description } from '@/shared/ui/Description/ui';
import { IsVerified } from './IsVerified';

import { Clock, IdCard, Info, Star, User } from 'lucide-react';
import { DisplayItem } from './Item';
import { Divider, Rating, Stack, Center, Avatar } from '@mantine/core';
import type { ProfileDataDisplayProp } from '../types/profileDataDisplay.type';
import { useDefault } from 'react-use';
import type { ReactNode } from 'react';
import { ratingColor } from '../lib/ratingColor';

export const ProfileDataDisplay = (props: ProfileDataDisplayProp) => {
  const { bio, full_name, login, rating, header } = props;
  const [headerProp] = useDefault<ReactNode>(
    <Center>
      <Avatar size="xl" name={login} />{' '}
    </Center>,
    () => header?.(props)
  );
  
  const ratingSafe = rating.rating ?? 0;
  const createdAtValue = createdAt();

  return (
    <Stack>
      {headerProp}
      <DisplayItem
        descText="Логин"
        copied
        display={`@${login}`}
        icon={<User />}
      />

      <DisplayItem
        copied
        display={full_name}
        icon={<IdCard />}
        descText="Имя пользователя"
      />

      <DisplayItem
        copied
        descText="Учетная запись создана"
        icon={<Clock />}
        display={createdAtValue}
      />

      <DisplayItem
        copied
        descProp={{ direction: 'row' }}
        textProp={{
          c: ratingColor(ratingSafe),
        }}
        descText="Рейтинг"
        icon={<Star />}
        display={ratingSafe.toString()}
      >
        <Rating value={ratingSafe} color="blue" readOnly />
      </DisplayItem>

      {/* Биография */}
      <DisplayItem copied descText="Биография" display={bio} icon={<Info />} />

      <Divider />

      <Description desc="Статус верификации">
        <IsVerified />
      </Description>
    </Stack>
  );
};
