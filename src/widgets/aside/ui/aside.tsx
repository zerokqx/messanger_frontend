import { AppShellAside, Box, CloseButton, Group } from '@mantine/core';
import { AsideHaeader } from './header';
import { lazy, Suspense, useEffect } from 'react';
import { SkeletonProfile, useGetUserById } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';
import { useLayoutStore } from '@/shared/lib/hooks/use-layout';
import { ContactMenu } from '@/features/contact';

const ProfileForGetUserById = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.ProfileForGetUserById,
  }))
);

interface CustomAsideProps {
  onClose: () => void;
}
export const Aside = ({ onClose }: CustomAsideProps) => {
  const uuid = useGetUuidFromRouter();

  const update = useLayoutStore((s) => s.update);
  const { setId, data, isFetching, abortPrevious, refetch } = useGetUserById();

  useEffect(() => {
    if (!uuid) return;
    void abortPrevious();
    setId(uuid);
  }, [abortPrevious, setId, uuid]);

  const fallback = <SkeletonProfile />;

  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      {uuid && (
        <>
          <Group justify="space-between">
            <Box>
              <CloseButton onClick={onClose} />
              <ContactMenu
                onUpdate={() => {
                  void refetch();
                }}
                userId={uuid}
              />
            </Box>
          </Group>
          <Suspense fallback={fallback}>
            {data ? (
              <ProfileForGetUserById profile={data} />
            ) : (
              isFetching && fallback
            )}
          </Suspense>
        </>
      )}
    </AppShellAside>
  );
};
