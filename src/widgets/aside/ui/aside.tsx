import {
  AppShellAside,
  Box,
  CloseButton,
  Group,
  Stack,
} from '@mantine/core';
import { lazy, Suspense } from 'react';
import { SkeletonProfile, useGetUserById } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';
import { ContactControllPanel, ContactMenu } from '@/features/contact';

const ProfileForGetUserById = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.ProfileForGetUserById,
  }))
);

interface CustomAsideProps {
  onClose: () => void;
}

export const Aside = ({ onClose }: CustomAsideProps) => {
  const _uuid = useGetUuidFromRouter();
  const uuid = _uuid ?? '';
  const { data, isLoading, invalidateUser } = useGetUserById({
    id: uuid,
  });
  

  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      {uuid && (
        <>
          <Group justify="space-between">
              <CloseButton onClick={onClose} />
            <ContactMenu  user={data} onUpdate={invalidateUser}/>
          </Group>
          <Suspense fallback={<SkeletonProfile />}>
            {isLoading || !data ? (
              <SkeletonProfile />
            ) : (
              <Stack>
                <ProfileForGetUserById profile={data} />
                <ContactControllPanel
                  onUpdate={invalidateUser}
                  userId={uuid}
                  user={data}
                />
              </Stack>
            )}
          </Suspense>
        </>
      )}
    </AppShellAside>
  );
};
