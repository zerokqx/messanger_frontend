import { AppShellAside, Button } from '@mantine/core';
import { AsideHaeader } from './header';
import { ASIDE_BUS_EVENTS, useAsideBus } from '@/widgets/aside/model';
import { lazy, Suspense } from 'react';
import type { AsideBusCommand } from '@/widgets/aside/model';
import { SkeletonProfile } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';

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
  const command = useAsideBus((s) => s.data);
  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      {getAsideContent(command)}
    </AppShellAside>
  );
};
