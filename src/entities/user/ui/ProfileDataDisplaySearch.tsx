import { current } from 'immer';
import { useUserStore } from '../model';
import type { ProfileDataDisplaySearchProp } from '../types/profileDataDisplaySearch.type';
import { Avatar, Center, Divider, Rating, Stack } from '@mantine/core';
import { DisplayItem } from './Item';
import { Description } from '@/shared/ui/Description/ui';
import { User, IdCard, Clock, Star, Info } from 'lucide-react';
import { ratingColor } from '../lib/ratingColor';
import { IsVerified } from './IsVerified';
import { createdAtUserSearch } from '@/entities/user/lib/createAtData';
import { formatLoginViaCustomName } from '../lib/formatLoginViaCustomName';

export const ProfileDataDisplaySearch = ({
  user_id,
  profile: {
    login,
    full_name,
    bio,
    created_at,
    rating: { rating },
    custom_name,
  },
  header,
}: ProfileDataDisplaySearchProp) => {
  const currentUser = useUserStore.getState().data.user_id;
  const isThatMe = user_id === currentUser;

  const format = formatLoginViaCustomName(login ?? '', custom_name);
  return (
    <Stack>
      <Center>
        <Avatar size={'xl'} name={format.name} />
      </Center>
      <DisplayItem
        descText="Логин"
        copied
        display={format.format}
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
        display={createdAtUserSearch(created_at)}
      />

      <DisplayItem
        copied
        descProp={{ direction: 'row' }}
        textProp={{
          c: ratingColor(rating ?? 0),
        }}
        descText="Рейтинг"
        icon={<Star />}
        display={rating?.toString()}
      >
        <Rating value={rating ?? 0} color="blue" readOnly />
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
