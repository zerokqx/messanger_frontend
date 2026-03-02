import { AppShellAside, CloseButton, Group, Stack } from '@mantine/core';
import { lazy, Suspense } from 'react';
import { SkeletonProfile, useGetUserById } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';
import {
  ContactControllPanel,
  ContactMenu,
  UpdateContactForm,
} from '@/features/contact';
import { Tabs } from '@/shared/ui/query-tabs';
import { ArrowLeft } from 'lucide-react';

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
        <Tabs animationVariant="slide-x">
          <Group justify="space-between">
            <Tabs.UseApi
              children={({ actions, state }) => (
                <>
                  <CloseButton
                    onClick={state.current !== 'main' ? actions.back : onClose}
                    icon={state.current !== 'main' ? <ArrowLeft /> : null}
                  />

                  <ContactMenu
                    user={data}
                    onUpdate={invalidateUser}
                    onEditClick={() => {
                      actions.push('profile-edit');
                    }}
                  />
                </>
              )}
            />
          </Group>
          <Tabs.Tab value="main">
            <>
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
          </Tabs.Tab>
          <Tabs.Tab value="profile-edit">
            <Suspense >
              <UpdateContactForm
                uuid={uuid}
                initialState={{
                  customName: data?.custom_name ?? '',
                }}
              />
            </Suspense>
          </Tabs.Tab>
        </Tabs>
      )}
    </AppShellAside>
  );
};
