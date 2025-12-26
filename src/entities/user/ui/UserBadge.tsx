import { useResponsive } from '@/shared/lib/hooks/useResponsive';
import { Flex, Text } from '@mantine/core';
import { useUserStore } from '../model/userStore';
import { UserAvatar } from './UserAvatar';

export const UserBadge = () => {
  const login = useUserStore((s) => s.data.login);
  const { mobile } = useResponsive();
  return (
    <Flex
      p={'sm'}
      gap={'md'}
      align={'start'}
      justify={'start'}
      direction={'column'}
      {...(mobile && {
        direction: 'row',
        align: 'center',
      })}
    >
      <UserAvatar />
      <Text fw={700}>{login}</Text>
    </Flex>
  );
};
