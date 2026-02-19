import { AppShellAside, Box, CloseButton, Group, Stack } from '@mantine/core';
import { lazy, Suspense, useEffect } from 'react';
import { SkeletonProfile, useGetUserById } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';
import { ContactControllPanel } from '@/features/contact';

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

  const { setId, data, isFetching, abortPrevious, invalidateUser } =
    useGetUserById();

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
            </Box>
          </Group>
          <Suspense fallback={fallback}>
            {data ? (
              <>
                <Stack>
                  <ProfileForGetUserById profile={data} />

                  <ContactControllPanel
                    onUpdate={() => {
                      invalidateUser();
                    }}
                    userId={uuid}
                    user={data}
                  />
                  <Group justify="start"></Group>
                </Stack>
              </>
            ) : (
              isFetching && fallback
            )}
          </Suspense>
        </>
      )}
    </AppShellAside>
  );
};
