import { Avatar, Flex, Text } from '@mantine/core';
import { useUserStore } from '../model/userStore';

export const UserBadge = () => {
  const { login } = useUserStore();
  return (
    <Flex
      p={'sm'}
      gap={'md'}
      align={'start'}
      justify={'start'}
      direction={'column'}
    >
      <Avatar
        variant="white"
        color="indigo"
        alt={login + ' avatar'}
        name={login}
      />
      <Text c="white" fw={700}>
        {login}
      </Text>
    </Flex>
  );
};
