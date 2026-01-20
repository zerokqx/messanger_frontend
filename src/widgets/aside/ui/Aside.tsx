import { SelectedProfileButtonAction } from '@/widgets/ChatAside/ui/tabs/SelectProfile/ButtonsAction';
import { AppShellAside } from '@mantine/core';
import { AsideHaeader } from './Header';
import { ASIDE_BUS_EVENTS, useAsideBus } from '@/features/aside';
import { lazy } from 'react';
import type { AsideBusCommand } from '@/features/aside/model/types/aside-bus.types';

const ProfileFromSearchUser = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.ProfileSearchUser,
  }))
);

const SkeletonProfile = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.SkeletonProfile,
  }))
);

const getAsideContent = ({ data, type }: AsideBusCommand) => {
  switch (type) {
    case ASIDE_BUS_EVENTS.USER_SEARCH:
    case ASIDE_BUS_EVENTS.USER_CONTACT:
      return (
        <>
          <ProfileFromSearchUser profile={data} />
          <SelectedProfileButtonAction user={data} />
        </>
      );
    case ASIDE_BUS_EVENTS.USER_CONTACT_SKELETON:
    case ASIDE_BUS_EVENTS.USER_SEARCH_SKELETON:
      return <SkeletonProfile />;
    default:
      return null;
  }
};

export const Aside = () => {
  const command = useAsideBus((s) => s.data);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {getAsideContent(command)}
    </AppShellAside>
  );
};
