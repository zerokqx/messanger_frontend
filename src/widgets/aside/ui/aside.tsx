import { AppShellAside, CloseButton, Group, Stack } from '@mantine/core';
import { lazy, Suspense } from 'react';
import { SkeletonProfile, useGetUserById } from '@/entities/user';
import { useGetUuidFromRouter } from '@/shared/lib/use-get-uuid-from-router';
import { ContactControllPanel, ContactMenu } from '@/features/contact';
import { Tabs } from '@/shared/ui/query-tabs';
import { ArrowLeft } from 'lucide-react';
import { notify } from '@/shared/lib/notifications';
import { SkeletonLayout } from '@/shared/ui/skeletons';

const ProfileForGetUserById = lazy(() =>
  import('@/entities/user').then((m) => ({
    default: m.ProfileForGetUserById,
  }))
);

const UpdateContactForm = lazy(() =>
  import('@/features/contact').then((m) => ({
    default: m.UpdateContactForm,
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
        <Tabs animationVariant="scale" key={uuid}>
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
                    {!data.relationship
                      .is_current_user_in_blacklist_of_target &&
                      !data.relationship
                        .is_target_user_blocked_by_current_user && (
                        <ContactControllPanel
                          onUpdate={invalidateUser}
                          userId={uuid}
                          user={data}
                        />
                      )}
                  </Stack>
                )}
              </Suspense>
            </>
          </Tabs.Tab>
          {data?.relationship.is_target_in_contacts_of_current_user && (
            <Tabs.Tab value="profile-edit">
              <Suspense fallback={<SkeletonLayout />}>
                <UpdateContactForm
                  uuid={uuid}
                  onSuccessUpdate={() => {
                    invalidateUser();
                    notify.success();
                  }}
                  initialState={{
                    customName: data.custom_name ?? '',
                  }}
                />
              </Suspense>
            </Tabs.Tab>
          )}
        </Tabs>
      )}
    </AppShellAside>
  );
};
