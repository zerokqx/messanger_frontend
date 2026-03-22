import {
  Avatar,
  Center,
  Rating,
  Stack,
  Text,
} from '@mantine/core';
import type { components } from '@/shared/types/v1';
import { useIsMe } from '../lib/use-is-me';
import { AtSign, Ban, Clock, Handshake, Star, User } from 'lucide-react';
import { GroupedList } from '@/shared/ui/grouped-list';
import { useTranslation } from 'react-i18next';
import { ratingColor } from '../lib/rating-color';
import { useCreatedAt } from '../lib';
import { useSettingsStore } from '@/shared/lib/settings';
import { comboRelations } from '@/shared/lib/realtionship-helpers';
import { formatLogin } from '@/shared/lib/formaters';

interface ProfileForGetUserByIdProps {
  profile: components['schemas']['ProfileByUserIdData'];
}

export const ProfileForGetUserById = ({
  profile,
}: ProfileForGetUserByIdProps) => {
  const [t] = useTranslation(['button-labels', 'profile', 'contact']);
  const isMe = useIsMe(profile.user_id);
  const createdAt = useCreatedAt(profile.created_at);
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  const relation = comboRelations(profile.relationship);
  function getRelationLabel() {
    if (relation.mutalContacts) return t('profile:mutal-contacts');
    if (profile.relationship.is_target_in_contacts_of_current_user)
      return t('contact:in-contact');
    if (profile.relationship.is_current_user_in_contacts_of_target)
      return t('contact:current-user-in-contact-target');
    if (relation.notContacts) return null;

    return null;
  }
  function getBlocked() {
    if (relation.mutalBlocking) return t('contact:mutal-blocked');
    if (profile.relationship.is_current_user_in_blacklist_of_target)
      return t('contact:contact-blocked-you', {
        username: profile.login ?? '',
      });
    if (profile.relationship.is_target_user_blocked_by_current_user)
      return t('contact:you-block-user', { username: profile.login ?? '' });
    return null;
  }
  const { format, name } = formatLogin(profile.login, profile.custom_name);
  const blocked = getBlocked();
  return (
    <Stack>
      <Center>
        <Avatar name={name} size={'xl'} />
      </Center>
      <GroupedList>
        <GroupedList.Item leftSection={<AtSign />} label={t('profile:login')}>
          {format}
        </GroupedList.Item>

        <GroupedList.Item
          leftSection={<User />}
          leftSectionColor="green"
          fallback={
            <Text c="dimmed">
              {t('profile:full-name-user-not-write-himself-name')}
            </Text>
          }
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
          fallback={
            <Text c={'dimmed'}>
              {t('profile:bio-user-not-write-about-himself')}
            </Text>
          }
        >
          {profile.bio}
        </GroupedList.Item>
      </GroupedList>
      {!isMe && (
        <GroupedList>
          <GroupedList.Item
            label={t('contact:relations')}
            fallback={
              <Text c="dimmed">{t('contact:yours-not-have-relation')}</Text>
            }
            leftSection={<Handshake />}
          >
            {getRelationLabel()}
          </GroupedList.Item>
            <GroupedList.Item
              label={t('contact:block')}
              leftSectionColor="red"
              leftSection={<Ban />}
            >
              {blocked}
            </GroupedList.Item>
        </GroupedList>
      )}
    </Stack>
  );
};
