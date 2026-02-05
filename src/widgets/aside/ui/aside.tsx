import { AppShellAside } from '@mantine/core';
import { AsideHaeader } from './header';
import { lazy, Suspense, useEffect } from 'react';
import { SkeletonProfile, useGetUserById } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';

const ProfileForGetUserById = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.ProfileForGetUserById,
  }))
);

export const Aside = () => {
  const uuid = useGetUuidFromRouter();
  const { setId, data, isFetching, abortPrevious } = useGetUserById();

  useEffect(() => {
    if (!uuid) return;
    void abortPrevious();
    setId(uuid);
  }, [abortPrevious, setId, uuid]);

  const fallback = <SkeletonProfile />;

  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      <AsideHaeader />
      <Suspense fallback={fallback}>
        {data ? (
          <ProfileForGetUserById profile={data} />
        ) : (
          isFetching && fallback
        )}
      </Suspense>
    </AppShellAside>
  );
};
