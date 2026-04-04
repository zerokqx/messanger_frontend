import { useNotifyClipboard } from '@/shared/lib/hooks/use-notify-clipboard';
import { IconButton } from '@/shared/ui/buttons';
import { Label, LabelBox } from '@/shared/ui/lables';
import type { components } from '@/shared/types/v1';
import {
  Group,
  Avatar as MantineAvatar,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import get from 'lodash/get';
import { BadgeCheck, Handshake } from 'lucide-react';
import { lazy, Suspense, createContext, use, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  UserProfileAvatarProps,
  UserProfileCompoundComponent,
  UserProfileProps,
} from './types';
import { formatLogin } from '@/shared/lib/formaters/format-login.ts';
import type { FormatLoginViaCutomNameFn } from '@/shared/lib/formaters/format-login.types.ts';
import { relations } from '@/shared/lib/realtionship-helpers/compouned.ts';
import { useSettingsStore } from '@/shared/lib/settings/index.ts';
import { GroupedList } from '@/shared/ui/grouped-list/ui/grouped-list.tsx';

const LazyRatingFlake = lazy(() =>
  import('./lazy/rating.tsx').then((m) => ({
    default: m.LazyRating,
  }))
);
const LazyBioFlake = lazy(() =>
  import('./lazy/bio.tsx').then((m) => ({
    default: m.LazyBio,
  }))
);

const ProfileContext = createContext<
  | (Partial<components['schemas']['ProfileByUserIdData']> & {
      formatName: ReturnType<FormatLoginViaCutomNameFn>;
    })
  | null
>(null);
const useProfileContext = () => {
  const context = use(ProfileContext);
  if (!context) throw new Error('Profile context is not defined');
  return context;
};

const UserProfileBase = ({ profile, children }: UserProfileProps) => {
  const formatName = formatLogin(
    profile.login as string,
    profile.custom_name as string
  );

  const value = useMemo(
    () => ({
      ...profile,
      formatName,
    }),
    [formatName, profile]
  );

  return (
    <ProfileContext value={value}>
      <Stack>{children}</Stack>
    </ProfileContext>
  );
};

export const UserProfile = UserProfileBase as UserProfileCompoundComponent;

const Avatar = ({ ...props }: UserProfileAvatarProps) => {
  const context = useProfileContext();
  const login = get(context, 'login') as string | undefined;

  const avatarId = get(context, 'avatars.current.file_id') as
    | string
    | undefined;

  if (!login && !avatarId) return null;

  return (
    <MantineAvatar name={context.formatName.name} src={avatarId} {...props} />
  );
};

const Bio = () => {
  const context = useProfileContext();
  const bio = get(context, 'bio') as string | undefined;

  if (!bio) return null;
  return <LazyBioFlake bio={bio} />;
};

const CreatedAt = () => {
  const copy = useNotifyClipboard();
  const context = useProfileContext();
  const createdAt = get(context, 'created_at');
  const [t] = useTranslation('profile');
  const data = useMemo<string>(() => {
    return (
      new Date(createdAt ?? '')
        .toLocaleString('ru-RU', {
          timeZone: 'UTC',
        })
        .split(',')[0] ?? ''
    );
  }, [createdAt]);

  if (!createdAt) return null;
  return (
    <IconButton
      onMouseUp={() => {
        copy(data, t('created_at'));
      }}
    >
      <LabelBox>
        <Text>{data}</Text>
        <Label>{t('created_at')}</Label>
      </LabelBox>
    </IconButton>
  );
};

const Login = () => {
  const context = useProfileContext();
  const [t] = useTranslation('profile');
  const copy = useNotifyClipboard();
  const login = context.login;
  const rel = context.relationship;

  if (!login) return null;
  return (
    <GroupedList.Item
      onMouseUp={() => {
        copy(login, t('login'));
      }}
    >
      <LabelBox>
        <Group>
          <Text>{context.formatName.format}</Text>
          {rel && rel.is_target_user_blocked_by_current_user && (
            <Text c={'vdarkGray'}>{t('blocked')}</Text>
          )}
        </Group>
        <Label>{t('login')}</Label>
      </LabelBox>
    </GroupedList.Item>
  );
};

const Rating = () => {
  const context = useProfileContext();
  const rating = get(context, 'rating');

  if (!rating?.rating) return null;
  return (
    <Suspense fallback={null}>
      <LazyRatingFlake rating={rating.rating} />
    </Suspense>
  );
};

const FullName = () => {
  const [t] = useTranslation('profile');
  const context = useProfileContext();
  return (
    context.full_name && (
      <IconButton>
        <LabelBox>
          <Text>{context.full_name}</Text>
          <Label>{t('full-name')}</Label>
        </LabelBox>
      </IconButton>
    )
  );
};
const Verification = () => {
  const context = useProfileContext();
  const isVerified = get(context, 'is_verified') as boolean | undefined;
  const [t] = useTranslation('profile');

  if (!isVerified) return null;
  return (
    <IconButton
      rightSection={
        <ThemeIcon>
          <BadgeCheck />
        </ThemeIcon>
      }
    >
      {t('verified')}
    </IconButton>
  );
};
const YouFriends = () => {
  const primaryColor = useSettingsStore((s) => s.data.primaryColor);
  const [t] = useTranslation('profile');
  const context = useProfileContext();
  if (!context.relationship) return;
  const isMutalFriends = relations.mutalContacts(context.relationship);
  return (
    isMutalFriends && (
      <IconButton
        variant='light'
        style={{
          pointerEvents: 'none',
        }}
        leftSection={<Handshake />}
        color={primaryColor}
      >
        {t('you-friends')}
      </IconButton>
    )
  );
};

UserProfile.Avatar = Avatar;
UserProfile.Bio = Bio;
UserProfile.CreatedAt = CreatedAt;
UserProfile.Login = Login;
UserProfile.Rating = Rating;
UserProfile.Verification = Verification;
UserProfile.FullName = FullName;
UserProfile.YouFriends = YouFriends;
