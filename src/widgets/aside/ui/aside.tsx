import {
  AppShellAside,
  Box,
  CloseButton,
  Group,
  Loader,
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
  const { data, isFetching, invalidateUser } = useGetUserById({
    id: uuid,
  });

  return (
    <AppShellAside zIndex={1000000} style={{ overflow: 'clip' }}>
      {uuid && (
        <>
          <Group justify="space-between">
            <Box>
              <CloseButton onClick={onClose} />
              <ContactMenu userId={uuid} onUpdate={invalidateUser} />
            </Box>
            {isFetching && <Loader size={16} />}
          </Group>
          <Suspense fallback={<SkeletonProfile />}>
            {data && (
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
            )}
          </Suspense>
        </>
      )}
    </AppShellAside>
  );
};
