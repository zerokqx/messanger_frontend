import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Rating,
  Stack,
  Text,
} from '@mantine/core';
import type { components } from '@/shared/types/v1';
import { useTranslation } from 'react-i18next';
import { AtSign, Clock, Edit, Star, User } from 'lucide-react';
import { GroupedList } from '@/shared/ui/grouped-list';
import { ratingColor } from '../lib/rating-color';
import { useCreatedAt } from '../lib';
import { useSettingsStore } from '@/shared/lib/settings';
import { urlAvatar } from '../api';

interface ProfileForCurrentUserBaseProps {
  profile: components['schemas']['ProfileData'];
  withEdit?: false;
  onEdit?: never;
}
interface ProfileForCurrentUserWithEditProps {
  profile: components['schemas']['ProfileData'];
  withEdit: true;
  onEdit: (profile: components['schemas']['ProfileData']) => void;
}

type ProfileForCurrentUserProps =
  | ProfileForCurrentUserBaseProps
  | ProfileForCurrentUserWithEditProps;

export const ProfileForCurrentUser = ({
  onEdit,
  profile,
}: ProfileForCurrentUserProps) => {
  const { t } = useTranslation(['button-labels', 'profile']);
  const createdAt = useCreatedAt(profile.created_at);
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);

  return (
    <Stack>
      <Center>
        <Box pos={'relative'}>
          <Avatar
            src={urlAvatar(profile.user_id, profile.avatars?.current?.file_id)}
            name={profile.login}
            size={'xl'}
          />
          <ActionIcon
            pos={'absolute'}
            bottom={'0'}
            onClick={() => {
              onEdit?.(profile);
            }}
            right={'0'}
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
          fallback={<Text c={'dimmed'}>{t('profile:bio-undefined')}</Text>}
        >
          {profile.bio}
        </GroupedList.Item>
      </GroupedList>
    </Stack>
  );
};
