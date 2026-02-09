import { useMe } from '@/entities/user/model/me.query';
import { ProfileForCurrentUser, SkeletonProfile } from '@/entities/user';
import { SideBarTaber } from '@/widgets/side-bar/model/tab';
import { ActionIcon, Box, Center, Group, Loader, Space } from '@mantine/core';
import { SquarePen } from 'lucide-react';

export const ProfileTab = () => {
  const { data: user, isLoading, isFetching, isError } = useMe();

  return (
    user && (
      <Box>
        <ProfileForCurrentUser profile={user} />
        <Space h="1rem" />
        <Group w="100%" justify="end">
          <ActionIcon size="input-xl" bdrs="1000px">
            <SquarePen />
          </ActionIcon>
        </Group>
      </Box>
    )
  );
};
