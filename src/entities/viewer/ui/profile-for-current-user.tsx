import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Rating,
  Stack,
  Text,
} from '@mantine/core';
import type { MeData } from '@/shared/api/orval/profile-service-v2/profile-service-v2.schemas';
import { useTranslation } from 'react-i18next';
import { AtSign, Clock, Edit, Star, User } from 'lucide-react';
import { GroupedList } from '@/shared/ui/grouped-list';
import { useCreatedAt } from '@/entities/user/lib';
import { ratingColor } from '@/entities/user/lib/rating-color.ts';
import { useSettingsStore } from '@/shared/lib/settings';
import { urlAvatar } from '@/entities/user/api';
import Logger from '@/shared/lib/logger/logger';
import { useMe } from '../model';
import { useParalelImageLoad } from '@/shared/lib/paralel-image-load';

interface ProfileForCurrentUserBaseProps {
  profile: MeData;
  withEdit?: false;
  onEdit?: never;
}

interface ProfileForCurrentUserWithEditProps {
  profile: MeData;
  withEdit: true;
  onEdit: (profile: MeData) => void;
}

type ProfileForCurrentUserProps =
  | ProfileForCurrentUserBaseProps
  | ProfileForCurrentUserWithEditProps;

export const ProfileForCurrentUser = ({
  onEdit,
}: ProfileForCurrentUserProps) => {
  const { data: profile } = useMe();
  const { t } = useTranslation(['button-labels', 'profile']);
  const {src} = useParalelImageLoad(
    urlAvatar(profile.user_id, profile.avatars?.current?.file_id, 'thumbnail'),
    urlAvatar(profile.user_id, profile.avatars?.current?.file_id, 'preview')
  );
  const createdAt = useCreatedAt(profile.created_at);
  const primaryColor = useSettingsStore((state) => state.data.primaryColor);

  Logger.debug('profile-for-current-user.tsx', 'Current profile', [profile]);

  return (
    <Stack>
      <Center>
        <Box pos="relative">
          <Avatar
            
            src={src}
            name={profile.login}
            size="xl"
          />
          <ActionIcon
            pos="absolute"
            bottom="0"
            onClick={() => {
              onEdit?.(profile);
            }}
            right="0"
          >
            <Edit />
          </ActionIcon>
        </Box>
      </Center>
      <GroupedList>
        <GroupedList.Item leftSection={<AtSign />} label={t('profile:login')}>
          {profile.login}
        </GroupedList.Item>

        <GroupedList.Item
          leftSection={<User />}
          leftSectionColor="green"
          fallback={<Text c="dimmed">{t('profile:full-name-undefined')}</Text>}
          label={t('profile:full-name')}
        >
          {profile.full_name}
        </GroupedList.Item>
      </GroupedList>

      <GroupedList>
        <GroupedList.Item
          leftSection={<Star />}
          leftSectionColor="yellow"
          isText={false}
          label={t('profile:rating')}
        >
          <Rating
            readOnly
            count={5}
            color={ratingColor(profile.rating.rating ?? 0, primaryColor)}
            value={profile.rating.rating ?? 0}
          />
        </GroupedList.Item>

        <GroupedList.Item
          leftSection={<Clock />}
          leftSectionColor="violet"
          label={t('profile:created_at')}
        >
          {createdAt}
        </GroupedList.Item>

        <GroupedList.Item
          leftSection={<Clock />}
          leftSectionColor="gray"
          label={t('profile:bio')}
          fallback={<Text c="dimmed">{t('profile:bio-undefined')}</Text>}
        >
          {profile.bio}
        </GroupedList.Item>
      </GroupedList>
    </Stack>
  );
};
