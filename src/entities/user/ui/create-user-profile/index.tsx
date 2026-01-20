import { Stack, Text, ThemeIcon } from '@mantine/core';
import {
  createContext,
  lazy,
  Suspense,
  use,
  useMemo,
  type ReactNode,
} from 'react';
import type { IUserProfile } from '../profile/types/user-profile.types.ts';
import { Avatar as MantineAvatar } from '@mantine/core';
import { get } from 'lodash';
import { useNotifyClipboard } from '@/shared/lib/hooks/useNotifyClipboard';
import { IconButton } from '@/shared/ui/buttons';
import { Label, LabelBox } from '@/shared/ui/lables';
import { useTranslation } from 'react-i18next';
import type { components } from '@/shared/types/v1';
import { BadgeCheck } from 'lucide-react';

const LazyRatingFlake = lazy(() =>
  import('../profile/lazy/rating.tsx').then((m) => ({
    default: m.LazyRating,
  }))
);
const LazyBioFlake = lazy(() =>
  import('../profile/lazy/bio.tsx').then((m) => ({
    default: m.LazyBio,
  }))
);

export function createUserProfile<
  C extends Record<string, unknown>,
  Out = ({ profile }: { profile: C }) => ReactNode,
>(
  constructor: (components: IUserProfile<C>) => Out
): [Out, IUserProfile<C>, () => C] {
  const Context = createContext<C | null>(null);
  const useReadContext = () => {
    const context = use(Context);
    if (!context) throw new Error('Context is not defined');
    return context;
  };
  const UserProfile: IUserProfile<C> = ({ profile, children }) => {
    return (
      <Context value={profile}>
        <Stack gap={'xs'} align="stretch">
          {children}
        </Stack>
      </Context>
    );
  };

  const Avatar: IUserProfile<C>['Avatar'] = ({ ...props }) => {
    const context = useReadContext();

    const login = get(context, 'login') as string | undefined;
    const avatarId = get(context, 'avatars.current.file_id');
    if (!login && !avatarId) return null;
    return <MantineAvatar name={login} src={avatarId as string} {...props} />;
  };

  const Bio: IUserProfile<C>['Bio'] = () => {
    const context = useReadContext();
    const bio = get(context, 'bio') as string | undefined;
    if (!bio) return;
    return bio && <LazyBioFlake bio={bio} />;
  };

  const CreatedAt: IUserProfile<C>['CreatedAt'] = () => {
    const copy = useNotifyClipboard();
    const context = useReadContext();
    const createdAt = get(context, 'created_at') as string | undefined;
    const [t] = useTranslation('profile');
    const data = useMemo(() => {
      return new Date(createdAt ?? '')
        .toLocaleString('ru-RU', {
          timeZone: 'UTC',
        })
        .split(',')[0];
    }, [createdAt]);
    return (
      createdAt && (
        <IconButton
          onMouseUp={() => {
            copy(data ?? '', t('created_at'));
          }}
        >
          <LabelBox>
            <Text>{data}</Text>
            <Label>{t('created_at')}</Label>
          </LabelBox>
        </IconButton>
      )
    );
  };

  const Login: IUserProfile<C>['Login'] = () => {
    const context = useReadContext();
    const login = get(context, 'login') as string | undefined;
    const [t] = useTranslation('profile');
    const copy = useNotifyClipboard();

    return (
      login && (
        <IconButton
          onMouseUp={() => {
            copy(login, t('login'));
          }}
        >
          <LabelBox>
            <Text>{login}</Text>
            <Label>{t('login')}</Label>
          </LabelBox>
        </IconButton>
      )
    );
  };

  const Rating: IUserProfile<C>['Rating'] = () => {
    const context = useReadContext();
    const rating = get(
      context,
      'rating'
    ) as components['schemas']['RatingData'];
    return (
      rating.rating && (
        <Suspense fallback={null}>
          <LazyRatingFlake rating={rating.rating} />
        </Suspense>
      )
    );
  };

  const Verification: IUserProfile<C>['Verification'] = () => {
    const context = useReadContext();
    const [t] = useTranslation('profile');
    return (
      (context.is_verified as boolean) && (
        <IconButton
          rightSection={
            <ThemeIcon>
              <BadgeCheck />
            </ThemeIcon>
          }
        >
          {t('verified')}
        </IconButton>
      )
    );
  };

  UserProfile.Avatar = Avatar;
  UserProfile.Login = Login;
  UserProfile.Rating = Rating;
  UserProfile.CreatedAt = CreatedAt;
  UserProfile.Bio = Bio;
  UserProfile.Verification = Verification;
  const outputComponent = constructor(UserProfile);
  return [outputComponent, UserProfile, useReadContext];
}
