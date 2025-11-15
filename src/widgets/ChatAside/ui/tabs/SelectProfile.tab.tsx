import { ProfileDataDisplay } from '@/entities/user';
import type { components, paths } from '@/shared/types/v1';
import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AppShellTaber } from '../../lib/tab';
import { Container } from '@mantine/core';

export const SelectProfileTab = () => {
  const path: keyof paths = '/user/search' as const;
  const { uuid, query } = useSearch({});
  const users = useQueryClient().getQueryData<
    components['schemas']['UserSearchResponse']
  >([
    'get',
    path,
    {
      params: {
        query: { query },
      },
    },
  ]);
  const profile = users?.data.users.find((user) => {
    return user.user_id === uuid;
  })?.profile as components['schemas']['ProfileByUserIdData'] | null;
  console.log(profile);
  const bio = profile?.bio ?? '';
  const full_name = profile?.full_name ?? '';
  const login = profile?.login ?? 'Anonymous';
  const rating = profile?.rating.rating ?? 0;
  return (
    <AppShellTaber.Panel keepMounetd={false} value="profile">
      <ProfileDataDisplay {...{ bio, login, fullName: full_name, rating }} />
    </AppShellTaber.Panel>
  );
};
