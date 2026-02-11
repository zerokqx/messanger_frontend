import { useMe } from '@/entities/user/model/me.query';
import { ProfileForCurrentUser, SkeletonProfile } from '@/entities/user';
import { SideBarTaber } from '@/widgets/side-bar/model/tab';
import { ActionIcon, Box, Center, Group, Loader, Space } from '@mantine/core';
import { SquarePen } from 'lucide-react';
import { useLogger } from '@mantine/hooks';

export const ProfileTab = () => {
  const { data: user, isLoading, isFetching, isError } = useMe();
  useLogger('ProfileTab', [user, isLoading]);

  if (isLoading || !user) {
    return <SkeletonProfile />;
  }
  return <>{user && <ProfileForCurrentUser profile={user} />}</>;
};
