import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { AppShellAside, Space } from '@mantine/core';
import { AsideHaeader } from './Header';
import { userAction } from '@/entities/user/model/userStore';
import { ASIDE_BUS_EVENTS, useAsideBus } from '@/features/aside';
import { lazy } from 'react';

const ProfileFromSearchUser = lazy(() =>
  import('@/entities/user/ui/ProfileSearchUser').then((m) => ({
    default: m.ProfileSearchUser,
  }))
);

export const Aside = () => {
  const { data, type } = useAsideBus((s) => s.data);
  const isMe = userAction.doIsThatMe(data?.user_id ?? '');

  console.log(data);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {type === ASIDE_BUS_EVENTS.USER_SEARCH && (
        <ProfileFromSearchUser profile={data} />
      )}

      {type === ASIDE_BUS_EVENTS.USER_CONTACT && (
        <ProfileFromSearchUser profile={data} />
      )}

      <SelectedProfileButtonAction />
    </AppShellAside>
  );
};
