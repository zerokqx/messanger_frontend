import { AppShellAside, Button } from '@mantine/core';
import { AsideHaeader } from './Header';
import { ASIDE_BUS_EVENTS, useAsideBus } from '@/features/aside';
import { lazy, Suspense } from 'react';
import type { AsideBusCommand } from '@/features/aside/model/types/aside-bus.types';
import { SkeletonProfile } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/useGetUuidFromRouter';

const ProfileForGetUserById = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.ProfileForGetUserById,
  }))
);

const getAsideContent = ({ data, type }: AsideBusCommand) => {
  switch (type) {
    case ASIDE_BUS_EVENTS.USER_SEARCH:
      return (
        <Suspense fallback={<SkeletonProfile />}>
          <Button>dwad</Button>
          <ProfileForGetUserById profile={data} />
        </Suspense>
      );
    case ASIDE_BUS_EVENTS.USER_CONTACT:
      return <ProfileForGetUserById profile={data} />;
    case ASIDE_BUS_EVENTS.USER_CONTACT_SKELETON:
    case ASIDE_BUS_EVENTS.USER_SEARCH_SKELETON:
      return <SkeletonProfile />;
    default:
      return null;
  }
};

export const Aside = () => {
  const uuid = useGetUuidFromRouter();
  console.log(uuid);
  const command = useAsideBus((s) => s.data);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {getAsideContent(command)}
    </AppShellAside>
  );
};
