import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { userAction } from '@/entities/user/model/userStore';
import Logger from '@/shared/lib/logger/logger';
import { useSelectedSearchUser } from '@/features/selected-user';
import { ASIDE_BUS_EVENTS, useAsideBus } from '@/features/aside';
import { lazy } from 'react';

const ProfileFromSearchUser = lazy(() =>
  import('@/entities/user/ui/ProfileFromSearchUser').then((m) => ({
    default: m.ProfileFromSearchUser,
  }))
);
export const Aside = () => {
  const profile = useSelectedSearchUser((s) => s.data.user?.profile);
  const isMe = userAction.doIsThatMe(profile?.user_id ?? '');
  const { data, type } = useAsideBus((s) => s.data);

  Logger.info('AsideProfile', 'profile user', profile);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {type === ASIDE_BUS_EVENTS.USER_SEARCH && (
        <ProfileFromSearchUser profile={data} />
      )}
      <SelectedProfileButtonAction />
      {profile && (
        <>
          {!isMe && (
            <>
              <Space h={'1rem'} />
            </>
          )}
        </>
      )}
    </AppShellAside>
  );
};
